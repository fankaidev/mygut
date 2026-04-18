import { View, Text } from "@tarojs/components";
import LineChart, { LineChartData } from "../../../components/LineChart";
import type { ChartEvent } from "../../../types";

interface WeightChartViewProps {
  chartData: LineChartData[];
  loading: boolean;
  events: ChartEvent[];
  onEventTap: (event: ChartEvent) => void;
  onAddEvent: () => void;
  dateRangeSelector: React.ReactNode;
}

export default function WeightChartView({
  chartData,
  loading,
  events,
  onEventTap,
  onAddEvent,
  dateRangeSelector,
}: WeightChartViewProps) {
  return (
    <View className="stats-view">
      <View className="stats-header">
        <View className="stats-header-row">
          <View className="stats-title">
            <Text>体重趋势</Text>
          </View>
          <View className="add-event-btn" onClick={onAddEvent}>
            <Text>+ 事件</Text>
          </View>
        </View>
        {dateRangeSelector}
      </View>
      <View className="stats-chart-container">
        {loading ? (
          <View className="stats-loading">
            <Text>加载中...</Text>
          </View>
        ) : chartData.length === 0 ? (
          <View className="stats-empty">
            <Text>暂无数据</Text>
          </View>
        ) : (
          <LineChart
            data={chartData}
            unit="kg"
            events={events}
            onEventTap={onEventTap}
            startFromZero={false}
          />
        )}
      </View>
      {chartData.length > 0 && (
        <View className="stats-data-list">
          {[...chartData].reverse().map((item, index) => (
            <View key={index} className="stats-data-item">
              <Text className="stats-data-date">{item.date}</Text>
              <Text className="stats-data-value">{item.value} kg</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
