import { View, Text } from "@tarojs/components";
import Taro, { useDidShow, usePullDownRefresh } from "@tarojs/taro";
import { useState, useCallback } from "react";
import { symptomService } from "../../services/symptom";
import { mealService } from "../../services/meal";
import { stoolService } from "../../services/stool";
import { medicationService } from "../../services/medication";
import { labTestService } from "../../services/labtest";
import { examService } from "../../services/exam";
import { formatDate, getPrevDate, getNextDate, getWeekday } from "../../utils/date";
import RecordItem, { AnyRecord } from "../../components/RecordItem";
import CalendarPopup from "../../components/CalendarPopup";
import type { RecordType } from "../../types";
import { RECORD_TYPE_OPTIONS } from "../../types";
import "./index.css";

interface RecordGroup {
  type: RecordType;
  icon: string;
  title: string;
  addPath: string;
  records: AnyRecord[];
}

export default function Records() {
  const [currentDate, setCurrentDate] = useState(formatDate());
  const [loading, setLoading] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [recordGroups, setRecordGroups] = useState<RecordGroup[]>([]);

  const loadData = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const [symptoms, medications, meals, stools, labTests, exams] = await Promise.all([
        symptomService.getByDate(date),
        medicationService.getByDate(date),
        mealService.getByDate(date),
        stoolService.getByDate(date),
        labTestService.getByDate(date),
        examService.getByDate(date),
      ]);

      const recordsMap: Record<RecordType, AnyRecord[]> = {
        symptom: symptoms.map((r) => ({ ...r, _type: "symptom" as const })),
        medication: medications.map((r) => ({ ...r, _type: "medication" as const })),
        meal: meals.map((r) => ({ ...r, _type: "meal" as const })),
        stool: stools.map((r) => ({ ...r, _type: "stool" as const })),
        labtest: labTests.map((r) => ({ ...r, _type: "labtest" as const })),
        exam: exams.map((r) => ({ ...r, _type: "exam" as const })),
      };

      setRecordGroups(
        RECORD_TYPE_OPTIONS.map((opt) => ({
          type: opt.value,
          icon: opt.icon,
          title: opt.label,
          addPath: opt.addPath,
          records: recordsMap[opt.value],
        })),
      );
    } catch (error) {
      console.error("加载数据失败:", error);
      Taro.showToast({ title: "加载失败", icon: "none" });
    } finally {
      setLoading(false);
    }
  }, []);

  useDidShow(() => {
    // Only load on first visit, not when returning from detail page
    if (recordGroups.length === 0) {
      loadData(currentDate);
    }
  });

  usePullDownRefresh(async () => {
    await loadData(currentDate);
    Taro.stopPullDownRefresh();
  });

  const handlePrevDate = () => {
    const newDate = getPrevDate(currentDate);
    setCurrentDate(newDate);
    loadData(newDate);
  };

  const today = formatDate();
  const isToday = currentDate === today;

  const handleNextDate = () => {
    if (isToday) return;
    const newDate = getNextDate(currentDate);
    setCurrentDate(newDate);
    loadData(newDate);
  };

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
    loadData(newDate);
  };

  return (
    <View className="records-page">
      {/* 日期选择器 */}
      <View className="date-selector">
        <Text className="date-arrow" onClick={handlePrevDate}>
          ◀
        </Text>
        <Text className="date-text" onClick={() => setCalendarVisible(true)}>
          {currentDate} {getWeekday(currentDate)}
        </Text>
        <Text className={`date-arrow ${isToday ? "disabled" : ""}`} onClick={handleNextDate}>
          ▶
        </Text>
      </View>

      <CalendarPopup
        visible={calendarVisible}
        value={currentDate}
        onChange={handleDateChange}
        onClose={() => setCalendarVisible(false)}
      />

      {loading ? (
        <View className="loading">加载中...</View>
      ) : (
        <View className="records-container">
          {recordGroups.map((group) => (
            <View key={group.type} className="record-card">
              <View className="card-header">
                <View className="card-title-row">
                  <Text className="card-icon">{group.icon}</Text>
                  <Text className="card-title">{group.title}</Text>
                  <Text className="card-count">[{group.records.length}条]</Text>
                </View>
                <Text
                  className="card-add-btn"
                  onClick={() => Taro.navigateTo({ url: group.addPath })}
                >
                  ＋
                </Text>
              </View>
              <View className="card-content">
                {group.records.length === 0 ? (
                  <Text className="empty-hint">暂无记录</Text>
                ) : (
                  group.records.map((record) => <RecordItem key={record._id} record={record} />)
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
