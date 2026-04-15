// 此文件由 scripts/generate-labtest-indicators.ts 自动生成
// 请勿手动编辑，修改请编辑 src/data/labtest-indicators.csv

import type { StandardIndicator } from "../services/labtest-standards";

export const STANDARD_INDICATORS: StandardIndicator[] = [
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "白细胞计数",
    "abbr": "WBC",
    "unit": "×10⁹/L",
    "refMin": 4,
    "refMax": 10,
    "aliases": [
      "白细胞",
      "白血球"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "红细胞计数",
    "abbr": "RBC",
    "unit": "×10¹²/L",
    "refMin": 3.8,
    "refMax": 5.9,
    "aliases": [
      "红细胞",
      "红血球"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "血红蛋白",
    "abbr": "HGB",
    "unit": "g/L",
    "refMin": 115,
    "refMax": 175,
    "aliases": [
      "血红蛋白测定",
      "Hb"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "红细胞压积",
    "abbr": "HCT",
    "unit": "%",
    "refMin": 35,
    "refMax": 50,
    "aliases": [
      "压积"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "平均红细胞体积",
    "abbr": "MCV",
    "unit": "fL",
    "refMin": 80,
    "refMax": 100
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "平均血红蛋白量",
    "abbr": "MCH",
    "unit": "pg",
    "refMin": 27,
    "refMax": 34,
    "aliases": [
      "平均红细胞血红蛋白含量"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "平均血红蛋白浓度",
    "abbr": "MCHC",
    "unit": "g/L",
    "refMin": 320,
    "refMax": 360,
    "aliases": [
      "平均红细胞血红蛋白浓度"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "血小板计数",
    "abbr": "PLT",
    "unit": "×10⁹/L",
    "refMin": 100,
    "refMax": 300,
    "aliases": [
      "血小板"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "中性粒细胞百分比",
    "abbr": "NEUT%",
    "unit": "%",
    "refMin": 40,
    "refMax": 75,
    "aliases": [
      "中性粒细胞比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "中性粒细胞绝对值",
    "abbr": "NEUT#",
    "unit": "×10⁹/L",
    "refMin": 2,
    "refMax": 7
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "淋巴细胞百分比",
    "abbr": "LYMPH%",
    "unit": "%",
    "refMin": 20,
    "refMax": 50,
    "aliases": [
      "淋巴细胞比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "淋巴细胞绝对值",
    "abbr": "LYMPH#",
    "unit": "×10⁹/L",
    "refMin": 0.8,
    "refMax": 4,
    "aliases": [
      "淋巴细胞计数"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "单核细胞百分比",
    "abbr": "MONO%",
    "unit": "%",
    "refMin": 3,
    "refMax": 10,
    "aliases": [
      "单核细胞比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "单核细胞绝对值",
    "abbr": "MONO#",
    "unit": "×10⁹/L",
    "refMin": 0.12,
    "refMax": 0.8
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "嗜酸性粒细胞百分比",
    "abbr": "EO%",
    "unit": "%",
    "refMin": 0.5,
    "refMax": 5,
    "aliases": [
      "嗜酸性粒细胞比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "嗜酸性粒细胞绝对值",
    "abbr": "EO#",
    "unit": "×10⁹/L",
    "refMin": 0.02,
    "refMax": 0.5
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "嗜碱性粒细胞百分比",
    "abbr": "BASO%",
    "unit": "%",
    "refMax": 1,
    "aliases": [
      "嗜碱性粒细胞比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "嗜碱性粒细胞绝对值",
    "abbr": "BASO#",
    "unit": "×10⁹/L",
    "refMax": 0.1
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "红细胞分布宽度",
    "abbr": "RDW",
    "unit": "%",
    "refMin": 11,
    "refMax": 15,
    "aliases": [
      "红细胞分布宽度变异系数",
      "RDW-CV"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "红细胞分布宽度SD",
    "abbr": "RDW-SD",
    "unit": "fL",
    "refMin": 37,
    "refMax": 51
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "血小板分布宽度",
    "abbr": "PDW",
    "unit": "fL",
    "refMin": 9,
    "refMax": 17
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "血小板平均体积",
    "abbr": "MPV",
    "unit": "fL",
    "refMin": 7,
    "refMax": 11,
    "aliases": [
      "平均血小板体积"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "大型血小板比率",
    "abbr": "P-LCR",
    "unit": "%",
    "refMin": 13,
    "refMax": 43,
    "aliases": [
      "大血小板比率"
    ]
  },
  {
    "specimen": "血液",
    "category": "血常规",
    "nameZh": "血小板压积",
    "abbr": "PCT",
    "unit": "%",
    "refMin": 0.1,
    "refMax": 0.3
  },
  {
    "specimen": "血液",
    "category": "炎症指标",
    "nameZh": "红细胞沉降率",
    "abbr": "ESR",
    "unit": "mm/h",
    "refMax": 20,
    "aliases": [
      "血沉"
    ]
  },
  {
    "specimen": "血液",
    "category": "炎症指标",
    "nameZh": "C反应蛋白",
    "abbr": "CRP",
    "unit": "mg/L",
    "refMax": 10,
    "aliases": [
      "C-反应蛋白"
    ]
  },
  {
    "specimen": "血液",
    "category": "炎症指标",
    "nameZh": "超敏C反应蛋白",
    "abbr": "hs-CRP",
    "unit": "mg/L",
    "refMax": 3,
    "aliases": [
      "C反应蛋白(超敏)"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "丙氨酸氨基转移酶",
    "abbr": "ALT",
    "unit": "U/L",
    "refMin": 7,
    "refMax": 40,
    "aliases": [
      "谷丙转氨酶"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "天门冬氨酸氨基转移酶",
    "abbr": "AST",
    "unit": "U/L",
    "refMin": 13,
    "refMax": 35,
    "aliases": [
      "谷草转氨酶",
      "天冬氨酸氨基转移酶"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "碱性磷酸酶",
    "abbr": "ALP",
    "unit": "U/L",
    "refMin": 40,
    "refMax": 150
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "γ-谷氨酰转移酶",
    "abbr": "GGT",
    "unit": "U/L",
    "refMin": 10,
    "refMax": 60,
    "aliases": [
      "γ-谷氨酰转肽酶",
      "谷氨酰转肽酶"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "总胆红素",
    "abbr": "TBIL",
    "unit": "μmol/L",
    "refMin": 5,
    "refMax": 21,
    "aliases": [
      "总胆红素(重氮法)"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "直接胆红素",
    "abbr": "DBIL",
    "unit": "μmol/L",
    "refMax": 7
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "间接胆红素",
    "abbr": "IBIL",
    "unit": "μmol/L",
    "refMin": 3,
    "refMax": 14
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "总蛋白",
    "abbr": "TP",
    "unit": "g/L",
    "refMin": 60,
    "refMax": 80,
    "aliases": [
      "总蛋白定量"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "白蛋白",
    "abbr": "ALB",
    "unit": "g/L",
    "refMin": 35,
    "refMax": 55,
    "aliases": [
      "白蛋白定量",
      "白蛋白定量(溴甲酚绿)",
      "白蛋白(BCG法)"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "球蛋白",
    "abbr": "GLB",
    "unit": "g/L",
    "refMin": 20,
    "refMax": 35
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "白球比",
    "abbr": "A/G",
    "unit": "",
    "refMin": 1.2,
    "refMax": 2.5,
    "aliases": [
      "白球比值"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "血清总胆汁酸",
    "abbr": "TBA",
    "unit": "μmol/L",
    "refMax": 10,
    "aliases": [
      "总胆汁酸"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "前白蛋白",
    "abbr": "PA",
    "unit": "mg/L",
    "refMin": 200,
    "refMax": 400
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "血尿素氮",
    "abbr": "BUN",
    "unit": "mmol/L",
    "refMin": 2.8,
    "refMax": 7.2,
    "aliases": [
      "尿素氮",
      "尿素氮(酶法)",
      "尿素"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "肌酐",
    "abbr": "CREA",
    "unit": "μmol/L",
    "refMin": 59,
    "refMax": 104,
    "aliases": [
      "肌酐(酶法)",
      "肌酸酐",
      "Cr",
      "肌酐(酶法)"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "尿酸",
    "abbr": "UA",
    "unit": "μmol/L",
    "refMin": 155,
    "refMax": 428
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "估算肾小球滤过率",
    "abbr": "eGFR",
    "unit": "mL/min/1.73m²",
    "refMin": 90
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "β2微球蛋白",
    "abbr": "β2-MG",
    "unit": "mg/L",
    "refMin": 1,
    "refMax": 3
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "胱抑素C",
    "abbr": "CysC",
    "unit": "mg/L",
    "refMin": 0.6,
    "refMax": 1.3,
    "aliases": [
      "胱抑素"
    ]
  },
  {
    "specimen": "血液",
    "category": "肝肾功能",
    "nameZh": "C1q测定",
    "abbr": "C1q",
    "unit": "mg/L",
    "refMin": 159,
    "refMax": 233
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "钾",
    "abbr": "K",
    "unit": "mmol/L",
    "refMin": 3.5,
    "refMax": 5.5,
    "aliases": [
      "血钾"
    ]
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "钠",
    "abbr": "Na",
    "unit": "mmol/L",
    "refMin": 135,
    "refMax": 145,
    "aliases": [
      "血钠"
    ]
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "氯",
    "abbr": "Cl",
    "unit": "mmol/L",
    "refMin": 96,
    "refMax": 111,
    "aliases": [
      "血氯"
    ]
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "钙",
    "abbr": "Ca",
    "unit": "mmol/L",
    "refMin": 2.11,
    "refMax": 2.52,
    "aliases": [
      "血钙"
    ]
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "校正钙",
    "abbr": "cCa",
    "unit": "mmol/L",
    "refMin": 2.11,
    "refMax": 2.52
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "镁",
    "abbr": "Mg",
    "unit": "mmol/L",
    "refMin": 0.7,
    "refMax": 1.1,
    "aliases": [
      "血镁"
    ]
  },
  {
    "specimen": "血液",
    "category": "电解质",
    "nameZh": "总二氧化碳",
    "abbr": "TCO2",
    "unit": "mmol/L",
    "refMin": 20,
    "refMax": 34,
    "aliases": [
      "二氧化碳结合力",
      "CO2CP"
    ]
  },
  {
    "specimen": "血液",
    "category": "血糖",
    "nameZh": "空腹血糖",
    "abbr": "Glu-F",
    "unit": "mmol/L",
    "refMin": 3.9,
    "refMax": 6.1,
    "aliases": [
      "葡萄糖",
      "血糖"
    ]
  },
  {
    "specimen": "血液",
    "category": "血糖",
    "nameZh": "餐后血糖",
    "abbr": "Glu-P",
    "unit": "mmol/L",
    "refMin": 3.9,
    "refMax": 7.8,
    "aliases": [
      "餐后2小时血糖",
      "GLU(p)"
    ]
  },
  {
    "specimen": "血液",
    "category": "心肌标志物",
    "nameZh": "肌酸激酶",
    "abbr": "CK",
    "unit": "U/L",
    "refMin": 24,
    "refMax": 195,
    "aliases": [
      "肌酸激酶",
      "肌酸激酶"
    ]
  },
  {
    "specimen": "血液",
    "category": "心肌标志物",
    "nameZh": "肌酸激酶MB质量",
    "abbr": "CK-MB",
    "unit": "μg/L",
    "refMax": 5,
    "aliases": [
      "肌酸激酶MB",
      "CK-MB质量",
      "肌酸激酶MB质量"
    ]
  },
  {
    "specimen": "血液",
    "category": "心肌标志物",
    "nameZh": "高敏心肌肌钙蛋白I",
    "abbr": "hs-cTnI",
    "unit": "ng/L",
    "refMax": 54,
    "aliases": [
      "心肌肌钙蛋白I",
      "肌钙蛋白I",
      "cTnI",
      "高敏心肌肌钙蛋白I"
    ]
  },
  {
    "specimen": "血液",
    "category": "心肌标志物",
    "nameZh": "肌红蛋白",
    "abbr": "MYO",
    "unit": "μg/L",
    "refMax": 110
  },
  {
    "specimen": "血液",
    "category": "心肌标志物",
    "nameZh": "N末端B型钠尿肽原",
    "abbr": "NT-proBNP",
    "unit": "pg/mL",
    "refMax": 125,
    "aliases": [
      "NT-proBNP",
      "BNP",
      "脑钠肽"
    ]
  },
  {
    "specimen": "血液",
    "category": "凝血功能",
    "nameZh": "凝血酶原时间",
    "abbr": "PT",
    "unit": "s",
    "refMin": 9,
    "refMax": 13
  },
  {
    "specimen": "血液",
    "category": "凝血功能",
    "nameZh": "凝血酶原活动度",
    "abbr": "PTA",
    "unit": "%",
    "refMin": 70,
    "refMax": 130
  },
  {
    "specimen": "血液",
    "category": "凝血功能",
    "nameZh": "国际标准化比值",
    "abbr": "INR",
    "unit": "",
    "refMin": 0.8,
    "refMax": 1.2
  },
  {
    "specimen": "血液",
    "category": "凝血功能",
    "nameZh": "纤维蛋白原",
    "abbr": "FIB",
    "unit": "g/L",
    "refMin": 2,
    "refMax": 4
  },
  {
    "specimen": "血液",
    "category": "凝血功能",
    "nameZh": "活化部分凝血活酶时间",
    "abbr": "APTT",
    "unit": "s",
    "refMin": 20,
    "refMax": 40
  },
  {
    "specimen": "血液",
    "category": "血脂",
    "nameZh": "总胆固醇",
    "abbr": "TC",
    "unit": "mmol/L",
    "refMin": 2.8,
    "refMax": 5.2,
    "aliases": [
      "胆固醇",
      "总胆固醇(酶法)"
    ]
  },
  {
    "specimen": "血液",
    "category": "血脂",
    "nameZh": "甘油三酯",
    "abbr": "TG",
    "unit": "mmol/L",
    "refMin": 0.56,
    "refMax": 1.7,
    "aliases": [
      "甘油三脂",
      "三酰甘油"
    ]
  },
  {
    "specimen": "血液",
    "category": "血脂",
    "nameZh": "高密度脂蛋白胆固醇",
    "abbr": "HDL-C",
    "unit": "mmol/L",
    "refMin": 1,
    "aliases": [
      "高密度脂蛋白",
      "HDL"
    ]
  },
  {
    "specimen": "血液",
    "category": "血脂",
    "nameZh": "低密度脂蛋白胆固醇",
    "abbr": "LDL-C",
    "unit": "mmol/L",
    "refMax": 3.4,
    "aliases": [
      "低密度脂蛋白",
      "LDL"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "比重",
    "abbr": "SG",
    "unit": "",
    "refMin": 1.004,
    "refMax": 1.03,
    "aliases": [
      "尿比重"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "pH值",
    "abbr": "pH",
    "unit": "",
    "refMin": 4.5,
    "refMax": 8,
    "aliases": [
      "酸碱度"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "白细胞",
    "abbr": "LEU",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿白细胞"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "隐血",
    "abbr": "ERY",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿隐血",
      "尿潜血"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "亚硝酸盐",
    "abbr": "NIT",
    "unit": "",
    "refValue": "negative"
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "酮体",
    "abbr": "KET",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿酮体"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "胆红素",
    "abbr": "BIL",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿胆红素"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "尿胆原",
    "abbr": "UBG",
    "unit": "",
    "refValue": "negative"
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "蛋白质",
    "abbr": "PRO",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿蛋白"
    ]
  },
  {
    "specimen": "尿液",
    "category": "尿常规",
    "nameZh": "葡萄糖",
    "abbr": "GLU",
    "unit": "",
    "refValue": "negative",
    "aliases": [
      "尿糖",
      "尿葡萄糖"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "颜色",
    "abbr": "COLOR",
    "refValue": "黄色",
    "aliases": [
      "大便颜色",
      "便色"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "性状",
    "abbr": "FORM",
    "refValue": "软便",
    "aliases": [
      "大便性状",
      "便性状"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "白细胞",
    "abbr": "WBC",
    "unit": "/HPF",
    "refMax": 5,
    "aliases": [
      "粪便白细胞"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "红细胞",
    "abbr": "RBC",
    "unit": "/HPF",
    "refMax": 0,
    "aliases": [
      "粪便红细胞"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "隐血",
    "abbr": "OB",
    "refValue": "negative",
    "aliases": [
      "便隐血",
      "潜血",
      "粪便隐血",
      "大便隐血"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "虫卵",
    "abbr": "PARA",
    "refValue": "negative",
    "aliases": [
      "寄生虫卵"
    ]
  },
  {
    "specimen": "粪便",
    "category": "便常规",
    "nameZh": "脂肪球",
    "abbr": "FAT",
    "unit": "/HPF",
    "refMax": 2,
    "aliases": [
      "脂肪滴"
    ]
  },
  {
    "specimen": "粪便",
    "category": "炎症指标",
    "nameZh": "钙卫蛋白",
    "abbr": "FCP",
    "unit": "μg/g",
    "refMax": 50,
    "aliases": [
      "粪便钙卫蛋白",
      "Calprotectin",
      "FC"
    ]
  }
];
