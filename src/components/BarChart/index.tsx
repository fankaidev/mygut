import { Canvas } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import "./index.css";

export interface BarChartData {
  date: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
}

export default function BarChart({ data, maxValue: propMaxValue }: BarChartProps) {
  const canvasId = useRef(`bar-chart-${Date.now()}`).current;

  useEffect(() => {
    if (data.length === 0) return;

    const query = Taro.createSelectorQuery();
    query
      .select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        const width = res[0].width;
        const height = res[0].height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        drawChart(ctx, width, height, data, propMaxValue);
      });
  }, [data, propMaxValue, canvasId]);

  return <Canvas type="2d" id={canvasId} className="bar-chart-canvas" />;
}

function drawChart(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: BarChartData[],
  propMaxValue?: number,
) {
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  if (data.length === 0) return;

  // Calculate max value
  const maxDataValue = Math.max(...data.map((d) => d.value));
  const maxValue = propMaxValue ?? Math.max(maxDataValue, 5);

  // Draw Y axis
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.stroke();

  // Draw Y axis labels and grid lines
  ctx.fillStyle = "#999";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const y = padding.top + (chartHeight * i) / yTicks;
    const value = Math.round(maxValue - (maxValue * i) / yTicks);

    ctx.fillText(String(value), padding.left - 8, y);

    // Grid line
    ctx.strokeStyle = "#f0f0f0";
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  // Draw X axis
  ctx.strokeStyle = "#e0e0e0";
  ctx.beginPath();
  ctx.moveTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  ctx.stroke();

  // Calculate bar width
  const barGap = 4;
  const barWidth = Math.max(8, (chartWidth - barGap * (data.length - 1)) / data.length);
  const actualBarWidth = Math.min(barWidth, 30);

  // Draw bars
  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight;
    const x = padding.left + index * (actualBarWidth + barGap) + (barWidth - actualBarWidth) / 2;
    const y = height - padding.bottom - barHeight;

    // Bar color based on value (fewer = better for stool)
    let color = "#07c160"; // green: 1-2 times
    if (item.value >= 5) {
      color = "#fa5151"; // red: 5+ times
    } else if (item.value >= 3) {
      color = "#ffc300"; // yellow: 3-4 times
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, actualBarWidth, barHeight);

    // X axis label (show date for first, last, and every 7th)
    if (index === 0 || index === data.length - 1 || index % 7 === 0) {
      ctx.fillStyle = "#999";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const dateLabel = item.date.slice(5); // MM-DD
      ctx.fillText(dateLabel, x + actualBarWidth / 2, height - padding.bottom + 8);
    }
  });
}
