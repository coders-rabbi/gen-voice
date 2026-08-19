"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Visitors donut chart";

const chartData = [
  {
    type: "nonRegistered",
    visitors: 20000,
    fill: "var(--color-nonRegistered)",
  },
  { type: "registered", visitors: 80000, fill: "var(--color-registered)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  nonRegistered: {
    label: "Non-Registered",
    color: "#155dfc",
  },
  registered: {
    label: "Registered",
    color: "#a855f7",
  },
} satisfies ChartConfig;

function formatValue(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return `${value}`;
}

export function VisitorsChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-muted-foreground text-base font-normal">
          Visitors
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="type"
              innerRadius={75}
              outerRadius={110}
              cornerRadius={4}
              paddingAngle={3}
              strokeWidth={0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="mt-2 flex items-center justify-center gap-6 border-t px-6 py-4 text-sm">
        {chartData.map((item) => (
          <div key={item.type} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  chartConfig[item.type as keyof typeof chartConfig] &&
                  "color" in chartConfig[item.type as keyof typeof chartConfig]
                    ? (
                        chartConfig[item.type as keyof typeof chartConfig] as {
                          color: string;
                        }
                      ).color
                    : undefined,
              }}
            />
            <span className="text-muted-foreground">
              {chartConfig[item.type as keyof typeof chartConfig]?.label}
            </span>
            <span className="font-semibold text-foreground">
              {formatValue(item.visitors)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
