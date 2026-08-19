"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Post growth stacked bar chart";

const chartData = [
  { month: "Jan", technology: 1000, culture: 10000, business: 150000, politics: 200000 },
  { month: "Feb", technology: 1000, culture: 10000, business: 150000, politics: 200000 },
  { month: "Mar", technology: 1000, culture: 10000, business: 150000, politics: 200000 },
  { month: "Apr", technology: 1000, culture: 10000, business: 150000, politics: 200000 },
  { month: "May", technology: 1000, culture: 10000, business: 150000, politics: 200000 },
  { month: "Jun", technology: 2000, culture: 20000, business: 250000, politics: 250000 },
];

const chartConfig = {
  technology: {
    label: "Technology",
    color: "#a855f7",
  },
  culture: {
    label: "Culture",
    color: "#ef4444",
  },
  business: {
    label: "Business",
    color: "#84cc16",
  },
  politics: {
    label: "Politics",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const yTicks = [5000, 10000, 20000, 300000, 400000, 5000000];

function formatYAxis(value: number) {
  if (value === 0) return "0";
  if (value >= 1000000) return `${value / 1000000}M`;
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

export function PostGrowthChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-muted-foreground text-xs font-normal">
          Post Growth
        </CardTitle>
        <div className="flex items-center gap-2">
          {Object.entries(chartConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-0.5 text-[10px]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: cfg.color }}
              />
              <span className="text-muted-foreground text-[10px]">{cfg.label}</span>
            </div>
          ))}
          <button className="rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
            2026 ▾
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} barCategoryGap="30%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              scale="log"
              domain={[1, 1000000]}
              ticks={yTicks}
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDataOverflow
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="technology"
              stackId="a"
              fill="var(--color-technology)"
              radius={[0, 0, 6, 6]}
            />
            <Bar
              dataKey="culture"
              stackId="a"
              fill="var(--color-culture)"
            />
            <Bar
              dataKey="business"
              stackId="a"
              fill="var(--color-business)"
            />
            <Bar
              dataKey="politics"
              stackId="a"
              fill="var(--color-politics)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}