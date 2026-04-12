import { View, Text, Picker } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState, useCallback } from "react";
import { getSymptomRecordsByDate } from "../../services/symptom";
import { getMealRecordsByDate } from "../../services/meal";
import { getStoolRecordsByDate } from "../../services/stool";
import { getMedicationRecordsByDate } from "../../services/medication";
import { formatDate, getPrevDate, getNextDate, getWeekday } from "../../utils/date";
import type { SymptomRecord, MealRecord, StoolRecord, MedicationRecord } from "../../types";
import "./index.css";

const FEELING_MAP: Record<number, { emoji: string; label: string }> = {
  1: { emoji: "😫", label: "很差" },
  2: { emoji: "😟", label: "较差" },
  3: { emoji: "😐", label: "一般" },
  4: { emoji: "😊", label: "良好" },
  5: { emoji: "😄", label: "很好" },
};

export default function Index() {
  const [currentDate, setCurrentDate] = useState(formatDate());
  const [loading, setLoading] = useState(true);
  const [symptomRecords, setSymptomRecords] = useState<SymptomRecord[]>([]);
  const [mealRecords, setMealRecords] = useState<MealRecord[]>([]);
  const [stoolRecords, setStoolRecords] = useState<StoolRecord[]>([]);
  const [medicationRecords, setMedicationRecords] = useState<MedicationRecord[]>([]);

  const loadData = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const [symptoms, meals, stools, medications] = await Promise.all([
        getSymptomRecordsByDate(date),
        getMealRecordsByDate(date),
        getStoolRecordsByDate(date),
        getMedicationRecordsByDate(date),
      ]);
      setSymptomRecords(symptoms);
      setMealRecords(meals);
      setStoolRecords(stools);
      setMedicationRecords(medications);
    } catch (error) {
      console.error("加载数据失败:", error);
      Taro.showToast({ title: "加载失败", icon: "none" });
    } finally {
      setLoading(false);
    }
  }, []);

  useDidShow(() => {
    loadData(currentDate);
  });

  const handlePrevDate = () => {
    const newDate = getPrevDate(currentDate);
    setCurrentDate(newDate);
    loadData(newDate);
  };

  const handleNextDate = () => {
    const newDate = getNextDate(currentDate);
    setCurrentDate(newDate);
    loadData(newDate);
  };

  const handleDateChange = (e: { detail: { value: string } }) => {
    const newDate = e.detail.value;
    setCurrentDate(newDate);
    loadData(newDate);
  };

  const handleNavigate = (path: string) => {
    Taro.navigateTo({ url: path });
  };

  // 获取整体感受（取最新一条症状记录）
  const overallFeeling = symptomRecords.length > 0 ? symptomRecords[0].overallFeeling : null;
  const feelingInfo = overallFeeling ? FEELING_MAP[overallFeeling] : null;

  return (
    <View className="overview-page">
      {/* 日期选择器 */}
      <View className="date-header">
        <Text className="date-arrow" onClick={handlePrevDate}>
          ◀
        </Text>
        <Picker mode="date" value={currentDate} onChange={handleDateChange}>
          <Text className="date-text">
            {currentDate} {getWeekday(currentDate)}
          </Text>
        </Picker>
        <Text className="date-arrow" onClick={handleNextDate}>
          ▶
        </Text>
      </View>

      {/* 整体感受 */}
      <View className="feeling-card">
        <Text className="feeling-label">整体感受</Text>
        {feelingInfo ? (
          <View className="feeling-value">
            <Text className="feeling-emoji">{feelingInfo.emoji}</Text>
            <Text className="feeling-text">{feelingInfo.label}</Text>
          </View>
        ) : (
          <Text className="feeling-empty">--</Text>
        )}
      </View>

      {loading ? (
        <View className="loading">加载中...</View>
      ) : (
        <View className="records-container">
          {/* 身体状态 */}
          <View className="record-card">
            <View className="card-header">
              <View className="card-title-row">
                <Text className="card-icon">🩺</Text>
                <Text className="card-title">身体状态</Text>
                <Text className="card-count">[{symptomRecords.length}条]</Text>
              </View>
              <Text
                className="card-add-btn"
                onClick={() => handleNavigate("/pages/symptom/add/index")}
              >
                ＋
              </Text>
            </View>
            <View
              className="card-content"
              onClick={() => handleNavigate("/pages/symptom/index/index")}
            >
              {symptomRecords.length === 0 ? (
                <Text className="empty-hint">暂无记录</Text>
              ) : (
                symptomRecords.slice(0, 3).map((record) => (
                  <View key={record._id} className="record-item">
                    <Text className="record-time">{record.time || "--:--"}</Text>
                    <Text className="record-desc">
                      {record.symptoms.map((s) => s.type).join("、") || "无症状"}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* 饮食记录 */}
          <View className="record-card">
            <View className="card-header">
              <View className="card-title-row">
                <Text className="card-icon">🍚</Text>
                <Text className="card-title">饮食</Text>
                <Text className="card-count">[{mealRecords.length}条]</Text>
              </View>
              <Text
                className="card-add-btn"
                onClick={() => handleNavigate("/pages/meal/add/index")}
              >
                ＋
              </Text>
            </View>
            <View
              className="card-content"
              onClick={() => handleNavigate("/pages/meal/index/index")}
            >
              {mealRecords.length === 0 ? (
                <Text className="empty-hint">暂无记录</Text>
              ) : (
                mealRecords.slice(0, 3).map((record) => (
                  <View key={record._id} className="record-item">
                    <Text className="record-time">{record.time}</Text>
                    <Text className="record-desc">{record.foods.join("、")}</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* 排便记录 */}
          <View className="record-card">
            <View className="card-header">
              <View className="card-title-row">
                <Text className="card-icon">🚽</Text>
                <Text className="card-title">排便</Text>
                <Text className="card-count">[{stoolRecords.length}条]</Text>
              </View>
              <Text
                className="card-add-btn"
                onClick={() => handleNavigate("/pages/stool/add/index")}
              >
                ＋
              </Text>
            </View>
            <View
              className="card-content"
              onClick={() => handleNavigate("/pages/stool/index/index")}
            >
              {stoolRecords.length === 0 ? (
                <Text className="empty-hint">暂无记录</Text>
              ) : (
                stoolRecords.slice(0, 3).map((record) => (
                  <View key={record._id} className="record-item">
                    <Text className="record-time">{record.time}</Text>
                    <Text className="record-desc">类型{record.type}</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* 用药记录 */}
          <View className="record-card">
            <View className="card-header">
              <View className="card-title-row">
                <Text className="card-icon">💊</Text>
                <Text className="card-title">用药</Text>
                <Text className="card-count">[{medicationRecords.length}条]</Text>
              </View>
              <Text
                className="card-add-btn"
                onClick={() => handleNavigate("/pages/medication/add/index")}
              >
                ＋
              </Text>
            </View>
            <View
              className="card-content"
              onClick={() => handleNavigate("/pages/medication/index/index")}
            >
              {medicationRecords.length === 0 ? (
                <Text className="empty-hint">暂无记录</Text>
              ) : (
                medicationRecords.slice(0, 3).map((record) => (
                  <View key={record._id} className="record-item">
                    <Text className="record-time">{record.time}</Text>
                    <Text className="record-desc">
                      {record.name}
                      {record.dosage ? ` ${record.dosage}` : ""}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
