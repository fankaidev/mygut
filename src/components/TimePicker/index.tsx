import { View, Text, PickerView, PickerViewColumn } from "@tarojs/components";
import { useState, useEffect } from "react";
import "./index.css";

interface TimePickerProps {
  value: string; // HH:mm
  onChange: (time: string) => void;
  minuteStep?: number;
}

// 生成小时列表 (00-23)
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

// 生成分钟列表，根据步长
function generateMinutes(step: number): string[] {
  const minutes: string[] = [];
  for (let i = 0; i < 60; i += step) {
    minutes.push(String(i).padStart(2, "0"));
  }
  return minutes;
}

// 将时间四舍五入到最近的步长
function roundToStep(minute: number, step: number): number {
  return (Math.round(minute / step) * step) % 60;
}

export default function TimePicker({ value, onChange, minuteStep = 5 }: TimePickerProps) {
  const MINUTES = generateMinutes(minuteStep);

  const [visible, setVisible] = useState(false);
  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);

  // 解析 value 并设置选中状态
  useEffect(() => {
    const [hourStr, minuteStr] = value.split(":");
    const hour = parseInt(hourStr) || 0;
    const minute = parseInt(minuteStr) || 0;

    setHourIndex(hour);
    const roundedMinute = roundToStep(minute, minuteStep);
    const idx = MINUTES.indexOf(String(roundedMinute).padStart(2, "0"));
    setMinuteIndex(idx >= 0 ? idx : 0);
  }, [value, minuteStep, MINUTES]);

  const handlePickerChange = (e: { detail: { value: number[] } }) => {
    const [newHourIndex, newMinuteIndex] = e.detail.value;
    setHourIndex(newHourIndex);
    setMinuteIndex(newMinuteIndex);
  };

  const handleConfirm = () => {
    onChange(`${HOURS[hourIndex]}:${MINUTES[minuteIndex]}`);
    setVisible(false);
  };

  const handleCancel = () => {
    // 重置为原值
    const [hourStr, minuteStr] = value.split(":");
    const hour = parseInt(hourStr) || 0;
    const minute = parseInt(minuteStr) || 0;

    setHourIndex(hour);
    const roundedMinute = roundToStep(minute, minuteStep);
    const idx = MINUTES.indexOf(String(roundedMinute).padStart(2, "0"));
    setMinuteIndex(idx >= 0 ? idx : 0);

    setVisible(false);
  };

  return (
    <>
      <View className="picker-value" onClick={() => setVisible(true)}>
        {value}
      </View>

      {visible && (
        <View className="time-picker-mask" onClick={handleCancel}>
          <View className="time-picker-popup" onClick={(e) => e.stopPropagation()}>
            <View className="time-picker-header">
              <Text className="time-picker-btn" onClick={handleCancel}>
                取消
              </Text>
              <Text className="time-picker-btn confirm" onClick={handleConfirm}>
                确定
              </Text>
            </View>
            <PickerView
              className="time-picker-view"
              value={[hourIndex, minuteIndex]}
              onChange={handlePickerChange}
              indicatorClass="time-picker-indicator"
            >
              <PickerViewColumn>
                {HOURS.map((hour) => (
                  <View key={hour} className="time-picker-item">
                    {hour}时
                  </View>
                ))}
              </PickerViewColumn>
              <PickerViewColumn>
                {MINUTES.map((minute) => (
                  <View key={minute} className="time-picker-item">
                    {minute}分
                  </View>
                ))}
              </PickerViewColumn>
            </PickerView>
          </View>
        </View>
      )}
    </>
  );
}
