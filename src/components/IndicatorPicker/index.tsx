import { View, Text, Input, ScrollView } from "@tarojs/components";
import { useState } from "react";
import { searchIndicators, StandardIndicator } from "../../services/labtest-standards";
import "./index.css";

interface IndicatorPickerProps {
  visible: boolean;
  onSelect: (indicator: StandardIndicator) => void;
  onClose: () => void;
}

export default function IndicatorPicker({ visible, onSelect, onClose }: IndicatorPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StandardIndicator[]>([]);

  if (!visible) return null;

  const handleInput = (e: { detail: { value: string } }) => {
    const value = e.detail.value;
    setQuery(value);
    setResults(searchIndicators(value));
  };

  const handleSelect = (indicator: StandardIndicator) => {
    onSelect(indicator);
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  return (
    <View className="indicator-picker-mask" onClick={handleClose}>
      <View className="indicator-picker" onClick={(e) => e.stopPropagation()}>
        <View className="indicator-picker-header">
          <Text className="indicator-picker-title">选择指标</Text>
          <Text className="indicator-picker-close" onClick={handleClose}>
            关闭
          </Text>
        </View>

        <View className="indicator-picker-search">
          <Input
            className="indicator-search-input"
            placeholder="搜索指标名称或缩写"
            value={query}
            onInput={handleInput}
            focus={visible}
          />
        </View>

        <ScrollView className="indicator-picker-list" scrollY>
          {query === "" ? (
            <View className="indicator-picker-hint">
              <Text>输入指标名称或缩写进行搜索{"\n"}如：白细胞、WBC、CRP</Text>
            </View>
          ) : results.length === 0 ? (
            <View className="indicator-picker-empty">
              <Text>未找到匹配的指标</Text>
            </View>
          ) : (
            results.map((indicator) => (
              <View
                key={`${indicator.specimen}-${indicator.nameZh}`}
                className="indicator-item"
                onClick={() => handleSelect(indicator)}
              >
                <Text className="indicator-name">
                  {indicator.nameZh} ({indicator.abbr})
                </Text>
                <Text className="indicator-meta">
                  {indicator.specimen} · {indicator.category}
                  {indicator.unit ? ` · ${indicator.unit}` : ""}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}
