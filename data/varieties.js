/**
 * Meus Microverdes
 * Catálogo de variedades
 *
 * Formato:
 * - objeto JS puro, sem funções, Date ou classes
 * - serializável para IndexedDB
 * - pode ser importado diretamente no frontend
 *
 * Fonte de verdade dos dados: varieties.json
 * Se editar este arquivo manualmente, mantenha ambos sincronizados.
 */

export const varietiesSchemaVersion = 1;
export const varietiesDataVersion = "1.0.0";

export const varieties = [
  {
    "id": "rabanete",
    "name": "Rabanete",
    "scientificName": "Raphanus sativus",
    "englishName": "Radish",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "rapido",
      "picante",
      "brassicaceae"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 2,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 3,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 7,
        "max": 10,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "uneven_germination",
      "leggy_growth",
      "excess_moisture",
      "mold"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "brocolis",
    "name": "Brócolis",
    "scientificName": "Brassica oleracea var. italica",
    "englishName": "Broccoli",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "rapido",
      "brassicaceae"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 2,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 8,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "uneven_germination",
      "high_density",
      "leggy_growth",
      "excess_moisture",
      "mold"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "girassol",
    "name": "Girassol",
    "scientificName": "Helianthus annuus",
    "englishName": "Sunflower",
    "family": "Asteraceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "semente_grande",
      "sabor_nutty",
      "folhas_carnudas"
    ],
    "seed": {
      "size": "large",
      "mucilaginous": false,
      "preSoak": {
        "recommended": true,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 9,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "cotyledons_open",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "seed_hulls_attached",
      "uneven_germination",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "ervilha",
    "name": "Ervilha",
    "scientificName": "Pisum sativum",
    "englishName": "Pea",
    "family": "Fabaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "semente_grande",
      "leguminosa",
      "brotos"
    ],
    "seed": {
      "size": "large",
      "mucilaginous": false,
      "preSoak": {
        "recommended": true,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 8,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "excess_moisture",
      "mold",
      "leggy_growth",
      "uneven_germination"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "rucula",
    "name": "Rúcula",
    "scientificName": "Eruca vesicaria",
    "englishName": "Arugula",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "muito_rapido",
      "picante",
      "brassicaceae"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 3,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 1,
        "max": 3,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 7,
        "max": 10,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "leggy_growth",
      "excess_moisture",
      "mold",
      "uneven_germination"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "mostarda",
    "name": "Mostarda",
    "scientificName": "Brassica juncea",
    "englishName": "Mustard",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "rapido",
      "picante",
      "brassicaceae"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 3,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 3,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 7,
        "max": 10,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "leggy_growth",
      "excess_moisture",
      "mold",
      "high_density"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "couve",
    "name": "Couve",
    "scientificName": "Brassica oleracea var. acephala",
    "englishName": "Kale",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "brassicaceae",
      "facil"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 3,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 1,
        "max": 2,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 8,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "high_density",
      "leggy_growth",
      "excess_moisture",
      "mold"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "agriao",
    "name": "Agrião",
    "scientificName": "Lepidium sativum",
    "englishName": "Garden cress",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "muito_rapido",
      "picante"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": true,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 2,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 1,
        "max": 2,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 5,
        "max": 8,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "no_deterioration"
      ]
    },
    "problems": [
      "surface_clumping",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "coentro",
    "name": "Coentro",
    "scientificName": "Coriandrum sativum",
    "englishName": "Cilantro",
    "family": "Apiaceae",
    "difficulty": "intermediate",
    "beginnerRecommended": true,
    "tags": [
      "ciclo_longo",
      "aromatico"
    ],
    "seed": {
      "size": "medium",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 3,
        "max": 7,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 3,
        "max": 7,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 21,
        "max": 28,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "slow_germination",
      "uneven_germination",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "manjericao",
    "name": "Manjericão",
    "scientificName": "Ocimum basilicum",
    "englishName": "Basil",
    "family": "Lamiaceae",
    "difficulty": "intermediate",
    "beginnerRecommended": true,
    "tags": [
      "aromatico",
      "mucilaginoso"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": true,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 5,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 4,
        "max": 7,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 12,
        "max": 16,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate_to_warm",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "surface_clumping",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "alfafa",
    "name": "Alfafa",
    "scientificName": "Medicago sativa",
    "englishName": "Alfalfa",
    "family": "Fabaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "leguminosa",
      "semente_pequena"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 7,
        "max": 10,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "high_density",
      "uneven_germination",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "feno_grego",
    "name": "Feno-grego",
    "scientificName": "Trigonella foenum-graecum",
    "englishName": "Fenugreek",
    "family": "Fabaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "leguminosa",
      "aromatico",
      "semente_media"
    ],
    "seed": {
      "size": "medium",
      "mucilaginous": false,
      "preSoak": {
        "recommended": true,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 8,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "uneven_germination",
      "seed_displacement",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "cebola",
    "name": "Cebola",
    "scientificName": "Allium cepa",
    "englishName": "Onion",
    "family": "Amaryllidaceae",
    "difficulty": "intermediate",
    "beginnerRecommended": true,
    "tags": [
      "ciclo_longo",
      "folhas_finas"
    ],
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 4,
        "max": 8,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 3,
        "max": 5,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 12,
        "max": 20,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_leaves",
        "good_color",
        "desired_height",
        "firm_leaves",
        "no_deterioration"
      ]
    },
    "problems": [
      "slow_germination",
      "leggy_growth",
      "yellowing",
      "excess_moisture",
      "mold"
    ],
    "confidence": {
      "timing": "low"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "amaranto",
    "name": "Amaranto",
    "scientificName": "Amaranthus spp.",
    "englishName": "Amaranth",
    "family": "Amaranthaceae",
    "difficulty": "intermediate",
    "beginnerRecommended": true,
    "tags": [
      "colorido",
      "semente_muito_pequena"
    ],
    "seed": {
      "size": "very_small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 8,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate_to_warm",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "cultivar_typical_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "seed_displacement",
      "high_density",
      "excess_moisture",
      "mold",
      "leggy_growth"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  },
  {
    "id": "repolho",
    "name": "Repolho",
    "scientificName": "Brassica oleracea var. capitata",
    "englishName": "Cabbage",
    "family": "Brassicaceae",
    "difficulty": "easy",
    "beginnerRecommended": true,
    "tags": [
      "rapido",
      "brassicaceae"
    ],
    "botanicalGroup": {
      "species": "Brassica oleracea",
      "relatedVarieties": [
        "brocolis",
        "couve"
      ]
    },
    "seed": {
      "size": "small",
      "mucilaginous": false,
      "preSoak": {
        "recommended": false,
        "required": false
      }
    },
    "timing": {
      "germinationDays": {
        "min": 1,
        "max": 3,
        "type": "estimate"
      },
      "blackoutDays": {
        "min": 2,
        "max": 4,
        "type": "estimate"
      },
      "lightStart": {
        "rule": "after_established_germination"
      },
      "harvestDays": {
        "min": 7,
        "max": 12,
        "type": "estimate"
      }
    },
    "environment": {
      "humidity": {
        "germination": "consistent",
        "growth": "moderate",
        "rule": "moist_not_saturated"
      },
      "ventilation": "good",
      "temperature": "moderate",
      "bottomWatering": {
        "recommended": true
      }
    },
    "harvest": {
      "signals": [
        "healthy_growth",
        "developed_cotyledons",
        "good_color",
        "desired_height",
        "firm_stems",
        "no_deterioration"
      ]
    },
    "problems": [
      "uneven_germination",
      "high_density",
      "leggy_growth",
      "yellowing",
      "excess_moisture",
      "mold"
    ],
    "confidence": {
      "timing": "medium"
    },
    "status": "active",
    "dailyEngine": {
      "phaseStrategy": "based_on_observation_and_day",
      "phases": {
        "germination": {
          "startDay": 0,
          "endDay": 2,
          "actions": [
            "check_emergence",
            "monitor_humidity",
            "keep_cover_if_needed"
          ]
        },
        "transition": {
          "startDay": 2,
          "endDay": 4,
          "actions": [
            "check_emergence",
            "start_light_when_established",
            "increase_airflow"
          ]
        },
        "growth": {
          "startDay": 4,
          "endDay": 7,
          "actions": [
            "provide_light",
            "control_humidity",
            "maintain_airflow",
            "check_for_mold",
            "check_for_leggy_growth"
          ]
        },
        "harvest": {
          "startDay": 7,
          "endDay": 12,
          "actions": [
            "evaluate_harvest_signals",
            "record_harvest_if_ready"
          ]
        }
      },
      "lateHarvestAction": "evaluate_before_consumption"
    },
    "safety": {
      "foodSafety": [
        "use_clean_equipment",
        "use_seeds_intended_for_sprouting_or_microgreens_when_possible",
        "do_not_consume_if_mold_or_suspected_contamination"
      ],
      "disclaimer": "Timing is an estimate; actual development varies with seed lot, temperature, light, moisture, substrate and cultivation method."
    },
    "sources": [],
    "sourcePolicy": {
      "requiredForPublication": true,
      "note": "Populate with verified sources before publishing technical claims as authoritative."
    }
  }
];

export function getVarietyById(id) {
  return varieties.find((variety) => variety.id === id) ?? null;
}

export function getVarietiesByDifficulty(difficulty) {
  return varieties.filter((variety) => variety.difficulty === difficulty);
}

export function getVarietiesByTag(tag) {
  return varieties.filter((variety) => variety.tags?.includes(tag));
}
