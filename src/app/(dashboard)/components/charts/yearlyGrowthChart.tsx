"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Yearly posts stacked bar chart";

const chartData = [
  {
    month: "Jan",
    archived: 90000,
    rejected: 75000,
    published: 150000,
    pending: 190000,
  },
  {
    month: "Feb",
    archived: 120000,
    rejected: 100000,
    published: 260000,
    pending: 220000,
  },
  {
    month: "Mar",
    archived: 100000,
    rejected: 100000,
    published: 220000,
    pending: 190000,
  },
  {
    month: "Apr",
    archived: 85000,
    rejected: 65000,
    published: 130000,
    pending: 80000,
  },
  {
    month: "May",
    archived: 65000,
    rejected: 35000,
    published: 55000,
    pending: 40000,
  },
  {
    month: "Jun",
    archived: 35000,
    rejected: 20000,
    published: 15000,
    pending: 10000,
  },
];

const chartConfig = {
  archived: {
    label: "Archived",
    color: "#a855f7",
  },
  rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
  published: {
    label: "Published",
    color: "#84cc16",
  },
  pending: {
    label: "Pending",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const yTicks = [0, 50000, 100000, 200000, 500000, 1000000];

function formatYAxis(value: number) {
  if (value === 0) return "0";
  if (value >= 1000000) return `${value / 1000000}M`;
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

export function YearlyPostsChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-muted-foreground text-[10px] font-normal">
          Yearly Posts
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: chartConfig.published.color }}
            />
            <span className="font-medium">Published</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#f97316" }}
            />
            <span className="font-medium">Pending</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: chartConfig.rejected.color }}
            />
            <span className="font-medium">Rejected</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: chartConfig.archived.color }}
            />
            <span className="font-medium">Archived</span>
          </div>
          <button className="rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
            2026 ▾
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-75 w-full">
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="archived"
              stackId="a"
              fill="var(--color-archived)"
              radius={[0, 0, 6, 6]}
            />
            <Bar dataKey="rejected" stackId="a" fill="var(--color-rejected)" />
            <Bar
              dataKey="published"
              stackId="a"
              fill="var(--color-published)"
            />
            <Bar
              dataKey="pending"
              stackId="a"
              fill="var(--color-pending)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
