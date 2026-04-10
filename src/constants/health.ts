// 常见症状预设
export const SYMPTOM_TYPES = [
  { value: "abdominal_pain", label: "腹痛" },
  { value: "bloating", label: "腹胀" },
  { value: "nausea", label: "恶心" },
  { value: "vomiting", label: "呕吐" },
  { value: "heartburn", label: "胃灼热" },
  { value: "acid_reflux", label: "反酸" },
  { value: "fatigue", label: "疲劳" },
  { value: "loss_of_appetite", label: "食欲不振" },
  { value: "diarrhea_urge", label: "腹泻感" },
  { value: "frequent_bowel", label: "便意频繁" },
  { value: "constipation", label: "便秘感" },
  { value: "gas", label: "胀气" },
] as const;

// 严重程度
export const SEVERITY_OPTIONS = [
  { value: 1, label: "轻度", color: "#52c41a" },
  { value: 2, label: "中度", color: "#faad14" },
  { value: 3, label: "重度", color: "#f5222d" },
] as const;

// 整体感受
export const FEELING_OPTIONS = [
  { value: 1, label: "很差", emoji: "😫" },
  { value: 2, label: "较差", emoji: "😟" },
  { value: 3, label: "一般", emoji: "😐" },
  { value: 4, label: "良好", emoji: "😊" },
  { value: 5, label: "很好", emoji: "😄" },
] as const;

// 症状部位
export const SYMPTOM_LOCATIONS = [
  { value: "upper_abdomen", label: "上腹部" },
  { value: "lower_abdomen", label: "下腹部" },
  { value: "left_abdomen", label: "左腹部" },
  { value: "right_abdomen", label: "右腹部" },
  { value: "navel", label: "肚脐周围" },
  { value: "stomach", label: "胃部" },
  { value: "whole_abdomen", label: "全腹部" },
] as const;
