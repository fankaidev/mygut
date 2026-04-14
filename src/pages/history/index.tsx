import { View, Text } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState, useCallback } from "react";
import { symptomService } from "../../services/symptom";
import { mealService } from "../../services/meal";
import { stoolService } from "../../services/stool";
import { medicationService } from "../../services/medication";
import { labTestService } from "../../services/labtest";
import { examService } from "../../services/exam";
import { formatDisplayDate, getWeekday } from "../../utils/date";
import { EXAM_TYPES } from "../../constants/exam";
import { SEVERITY_OPTIONS, FEELING_OPTIONS } from "../../constants/symptom";
import { AMOUNT_OPTIONS } from "../../constants/meal";
import { STOOL_AMOUNTS } from "../../constants/stool";
import BristolIcon from "../../components/BristolIcon";
import type {
  SymptomRecord,
  MealRecord,
  StoolRecord,
  MedicationRecord,
  LabTestRecord,
  ExamRecord,
} from "../../types";
import "./index.css";

type RecordType = "symptom" | "medication" | "meal" | "stool" | "labtest" | "exam";

interface TypeOption {
  value: RecordType;
  label: string;
  icon: string;
}

const TYPE_OPTIONS: TypeOption[] = [
  { value: "symptom", label: "体感", icon: "🌡️" },
  { value: "medication", label: "用药", icon: "💊" },
  { value: "meal", label: "饮食", icon: "🍱" },
  { value: "stool", label: "排便", icon: "💩" },
  { value: "labtest", label: "化验", icon: "🧪" },
  { value: "exam", label: "检查", icon: "🩺" },
];

// 统一的记录类型
type AnyRecord =
  | (SymptomRecord & { _type: "symptom" })
  | (MealRecord & { _type: "meal" })
  | (StoolRecord & { _type: "stool" })
  | (MedicationRecord & { _type: "medication" })
  | (LabTestRecord & { _type: "labtest" })
  | (ExamRecord & { _type: "exam" });

const getFeelingEmoji = (value: number): string => {
  return FEELING_OPTIONS.find((f) => f.value === value)?.emoji || "😐";
};

const formatSymptoms = (symptoms: string[]): string => {
  return symptoms.join("、");
};

const getSeverityInfo = (severity?: 1 | 2 | 3) => {
  if (!severity) return null;
  return SEVERITY_OPTIONS.find((s) => s.value === severity);
};

const getAmountEmoji = (amount: number): string => {
  return AMOUNT_OPTIONS.find((a) => a.value === amount)?.emoji || "🍚";
};

const getStoolAmountLabel = (amount: number): string => {
  return STOOL_AMOUNTS.find((a) => a.value === amount)?.label || "";
};

const getExamTypeInfo = (examType: string) => {
  return EXAM_TYPES.find((t) => t.value === examType) || EXAM_TYPES[EXAM_TYPES.length - 1];
};

export default function History() {
  const [selectedTypes, setSelectedTypes] = useState<RecordType[]>([
    "symptom",
    "medication",
    "meal",
    "stool",
  ]);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AnyRecord[]>([]);

  const loadData = useCallback(async (types: RecordType[]) => {
    setLoading(true);
    try {
      const promises: Promise<AnyRecord[]>[] = [];

      if (types.includes("symptom")) {
        promises.push(
          symptomService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "symptom" as const }))),
        );
      }
      if (types.includes("medication")) {
        promises.push(
          medicationService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "medication" as const }))),
        );
      }
      if (types.includes("meal")) {
        promises.push(
          mealService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "meal" as const }))),
        );
      }
      if (types.includes("stool")) {
        promises.push(
          stoolService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "stool" as const }))),
        );
      }
      if (types.includes("labtest")) {
        promises.push(
          labTestService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "labtest" as const }))),
        );
      }
      if (types.includes("exam")) {
        promises.push(
          examService
            .getRecent(50)
            .then((data) => data.map((r) => ({ ...r, _type: "exam" as const }))),
        );
      }

      const results = await Promise.all(promises);
      const allRecords = results.flat();

      // 按日期+时间倒序排列
      allRecords.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return b.time.localeCompare(a.time);
      });

      setRecords(allRecords);
    } catch (error) {
      console.error("加载数据失败:", error);
      Taro.showToast({ title: "加载失败", icon: "none" });
    } finally {
      setLoading(false);
    }
  }, []);

  useDidShow(() => {
    loadData(selectedTypes);
  });

  const handleTypeToggle = (type: RecordType) => {
    let newTypes: RecordType[];
    if (selectedTypes.includes(type)) {
      // 至少保留一个类型
      if (selectedTypes.length === 1) return;
      newTypes = selectedTypes.filter((t) => t !== type);
    } else {
      newTypes = [...selectedTypes, type];
    }
    setSelectedTypes(newTypes);
    loadData(newTypes);
  };

  const handleNavigate = (path: string) => {
    Taro.navigateTo({ url: path });
  };

  const getTypeInfo = (type: RecordType) => {
    return TYPE_OPTIONS.find((t) => t.value === type)!;
  };

  // 按日期分组记录
  const groupedRecords: { date: string; records: AnyRecord[] }[] = [];
  let currentDate = "";
  records.forEach((record) => {
    if (record.date !== currentDate) {
      currentDate = record.date;
      groupedRecords.push({ date: record.date, records: [] });
    }
    groupedRecords[groupedRecords.length - 1].records.push(record);
  });

  const renderRecord = (record: AnyRecord) => {
    const typeInfo = getTypeInfo(record._type);

    switch (record._type) {
      case "symptom": {
        const severity = getSeverityInfo(record.severity);
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/symptom/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time || "--:--"}</Text>
            <Text className="record-feeling">{getFeelingEmoji(record.overallFeeling)}</Text>
            {severity && (
              <Text className="record-severity" style={{ backgroundColor: severity.color }}>
                {severity.label}
              </Text>
            )}
            {record.symptoms.length > 0 && (
              <Text className="record-desc">{formatSymptoms(record.symptoms)}</Text>
            )}
          </View>
        );
      }
      case "medication":
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/medication/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time}</Text>
            <Text className="record-desc">{record.names.join("、")}</Text>
          </View>
        );
      case "meal":
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/meal/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time}</Text>
            <Text className="record-feeling">{getAmountEmoji(record.amount)}</Text>
            <Text className="record-desc">{record.foods.join("、")}</Text>
          </View>
        );
      case "stool":
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/stool/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time}</Text>
            <View className="record-feeling">
              <BristolIcon type={record.type} size={24} />
            </View>
            <Text className="record-desc">
              {getStoolAmountLabel(record.amount)}
              {record.note && ` · ${record.note}`}
            </Text>
          </View>
        );
      case "labtest":
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/labtest/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time}</Text>
            <Text className="record-desc">
              {record.imageFileIds.length}张图片
              {record.indicators.length > 0 && ` · ${record.indicators.length}项指标`}
            </Text>
          </View>
        );
      case "exam": {
        const examTypeInfo = getExamTypeInfo(record.examType);
        return (
          <View
            key={record._id}
            className="record-item"
            onClick={() => handleNavigate(`/pages/exam/add/index?id=${record._id}`)}
          >
            <Text className="record-type-icon">{typeInfo.icon}</Text>
            <Text className="record-time">{record.time}</Text>
            <Text className="record-feeling">{examTypeInfo.emoji}</Text>
            <Text className="record-desc">
              {examTypeInfo.label}
              {record.imageFileIds.length > 0 && ` · ${record.imageFileIds.length}张图片`}
            </Text>
          </View>
        );
      }
    }
  };

  return (
    <View className="history-page">
      {/* 类型筛选 */}
      <View className="type-filter">
        {TYPE_OPTIONS.map((option) => (
          <View
            key={option.value}
            className={`type-option ${selectedTypes.includes(option.value) ? "active" : ""}`}
            onClick={() => handleTypeToggle(option.value)}
          >
            <Text className="type-icon">{option.icon}</Text>
            <Text className="type-label">{option.label}</Text>
          </View>
        ))}
      </View>

      {loading ? (
        <View className="loading">加载中...</View>
      ) : records.length === 0 ? (
        <View className="empty">
          <Text className="empty-text">暂无记录</Text>
        </View>
      ) : (
        <View className="records-list">
          {groupedRecords.map((group) => (
            <View key={group.date} className="date-group">
              <View className="date-header">
                <Text className="date-text">
                  {formatDisplayDate(group.date)} {getWeekday(group.date)}
                </Text>
              </View>
              <View className="date-records">
                {group.records.map((record) => renderRecord(record))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
