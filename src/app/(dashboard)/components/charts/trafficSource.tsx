"use client";

import { Label, Legend, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Traffic sources semi-circle chart";

const chartData = [
  { source: "search", visitors: 320, fill: "var(--color-search)" },
  { source: "social", visitors: 210, fill: "var(--color-social)" },
  { source: "direct", visitors: 260, fill: "var(--color-direct)" },
  { source: "email", visitors: 110, fill: "var(--color-email)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  search: {
    label: "Search",
    color: "#a855f7",
  },
  social: {
    label: "Social",
    color: "#3b82f6",
  },
  direct: {
    label: "Direct",
    color: "#22c55e",
  },
  email: {
    label: "Email",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function TrafficSources() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-muted-foreground text-base font-normal">
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[2/1] w-full max-w-[320px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="source"
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={110}
              cornerRadius={8}
              paddingAngle={3}
              strokeWidth={0}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-muted-foreground text-sm">
                  {chartConfig[value as keyof typeof chartConfig]?.label ??
                    value}
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
