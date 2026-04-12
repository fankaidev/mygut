import { View, Text } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import { labTestService } from "../../../services/labtest";
import { formatDisplayDate } from "../../../utils/date";
import type { LabTestRecord } from "../../../types";
import "./index.css";

export default function LabTestIndex() {
  const [records, setRecords] = useState<LabTestRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useDidShow(() => {
    loadRecords();
  });

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await labTestService.getRecent(50);
      setRecords(data);
    } catch (error) {
      console.error("加载记录失败:", error);
      Taro.showToast({ title: "加载失败", icon: "none" });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    Taro.navigateTo({ url: "/pages/labtest/add/index" });
  };

  const handleEdit = (id: string) => {
    Taro.navigateTo({ url: `/pages/labtest/add/index?id=${id}` });
  };

  return (
    <View className="health-page">
      <View className="header">
        <Text className="title">化验记录</Text>
        <View className="add-btn" onClick={handleAdd}>
          + 添加
        </View>
      </View>

      {loading ? (
        <View className="loading">加载中...</View>
      ) : records.length === 0 ? (
        <View className="empty">
          <Text className="empty-text">暂无记录</Text>
          <Text className="empty-hint">点击右上角添加记录</Text>
        </View>
      ) : (
        <View className="record-list">
          {records.map((record) => (
            <View
              key={record._id}
              className="record-item"
              onClick={() => handleEdit(record._id!)}
            >
              <View className="record-main">
                <View className="record-header">
                  <Text className="record-date">
                    {formatDisplayDate(record.date)}
                    {record.time && ` ${record.time}`}
                  </Text>
                </View>

                <View className="record-stats">
                  <View className="stat-badge">
                    <Text className="stat-icon">🖼️</Text>
                    <Text className="stat-text">{record.imageFileIds.length}张图片</Text>
                  </View>
                  {record.indicators.length > 0 && (
                    <View className="stat-badge">
                      <Text className="stat-icon">📊</Text>
                      <Text className="stat-text">{record.indicators.length}项指标</Text>
                    </View>
                  )}
                </View>

                {record.note && <Text className="record-note">{record.note}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
