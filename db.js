const DB_NAME = "meus-microverdes";
const DB_VERSION = 4;

export const STORES = {
  cultivations: "cultivations",
  dailyLogs: "dailyLogs",
  harvests: "harvests",
  photos: "photos",
  settings: "settings"
};

const ALL_STORES = Object.values(STORES);

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORES.cultivations)) {
        const s = db.createObjectStore(STORES.cultivations, { keyPath: "id" });
        s.createIndex("status", "status", { unique: false });
        s.createIndex("varietyId", "varietyId", { unique: false });
        s.createIndex("startedAt", "startedAt", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.dailyLogs)) {
        const s = db.createObjectStore(STORES.dailyLogs, { keyPath: "id" });
        s.createIndex("cultivationId", "cultivationId", { unique: false });
        s.createIndex("day", "day", { unique: false });
        s.createIndex("date", "date", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.harvests)) {
        const s = db.createObjectStore(STORES.harvests, { keyPath: "id" });
        s.createIndex("cultivationId", "cultivationId", { unique: false });
        s.createIndex("date", "date", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.photos)) {
        const s = db.createObjectStore(STORES.photos, { keyPath: "id" });
        s.createIndex("cultivationId", "cultivationId", { unique: false });
        s.createIndex("dailyLogId", "dailyLogId", { unique: false });
        s.createIndex("date", "date", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.settings)) {
        db.createObjectStore(STORES.settings, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("O banco está bloqueado por outra aba."));
  });
}

export async function add(storeName, value) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName, "readwrite").objectStore(storeName).add(value));
}

export async function put(storeName, value) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName, "readwrite").objectStore(storeName).put(value));
}

export async function get(storeName, key) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName).objectStore(storeName).get(key));
}

export async function getAll(storeName) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName).objectStore(storeName).getAll());
}

export async function remove(storeName, key) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName, "readwrite").objectStore(storeName).delete(key));
}

export async function getByIndex(storeName, indexName, value) {
  validateStore(storeName);
  const db = await openDB();
  return requestToPromise(db.transaction(storeName).objectStore(storeName).index(indexName).getAll(value));
}

export async function exportData() {
  const data = {};
  for (const storeName of ALL_STORES) data[storeName] = await getAll(storeName);

  return {
    format: "meus-microverdes-backup",
    formatVersion: 1,
    app: "Meus Microverdes",
    exportedAt: new Date().toISOString(),
    database: { name: DB_NAME, version: DB_VERSION },
    data
  };
}

export function validateBackup(backup) {
  if (!backup || typeof backup !== "object")
    throw new Error("Arquivo de backup inválido.");

  if (backup.format !== "meus-microverdes-backup")
    throw new Error("Este arquivo não é um backup do Meus Microverdes.");

  if (backup.formatVersion !== 1)
    throw new Error(`Versão de backup não suportada: ${backup.formatVersion}.`);

  if (!backup.data || typeof backup.data !== "object")
    throw new Error("O backup não contém dados.");

  for (const storeName of ALL_STORES) {
    if (!Array.isArray(backup.data[storeName]))
      throw new Error(`Dados inválidos na seção "${storeName}".`);

   for (const record of backup.data[storeName]) {
  if (!record || typeof record !== "object") {
    throw new Error(`Registro inválido em "${storeName}".`);
  }

  if (storeName === STORES.settings) {
    if (typeof record.key !== "string" || !record.key.trim()) {
      throw new Error(`Registro inválido em "${storeName}".`);
    }
  } else {
    if (typeof record.id !== "string" || !record.id.trim()) {
      throw new Error(`Registro inválido em "${storeName}".`);
    }
  }
}
    
  return true;
}

export async function importData(backup) {
  validateBackup(backup);
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(ALL_STORES, "readwrite");

    for (const storeName of ALL_STORES) {
      const store = tx.objectStore(storeName);
      store.clear();
      for (const record of backup.data[storeName]) store.put(record);
    }

    tx.oncomplete = () => resolve({
      importedAt: new Date().toISOString(),
      counts: Object.fromEntries(
        ALL_STORES.map(name => [name, backup.data[name].length])
      )
    });

    tx.onerror = () => reject(tx.error || new Error("Falha ao importar o backup."));
    tx.onabort = () => reject(tx.error || new Error("Importação cancelada."));
  });
}

function validateStore(storeName) {
  if (!ALL_STORES.includes(storeName))
    throw new Error(`Store desconhecida: ${storeName}`);
}
