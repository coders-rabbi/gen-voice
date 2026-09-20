"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import useSWR from "swr";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getHomePageCategoryNews } from "@/services/news/news.service";

export const description = "Post growth bar chart";

const chartConfig = {
  technology: {
    label: "Technology",
    color: "#a855f7",
  },
  sports: {
    label: "Sports",
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

function formatYAxis(value: number) {
  if (value === 0) return "0";
  if (value >= 1000000) return `${value / 1000000}M`;
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

export function PostGrowthChart() {
  const {
    data: res,
    error,
    isLoading,
  } = useSWR("category-wise-news", getHomePageCategoryNews);

  const business = res?.Business;
  const technology = res?.Technology;
  const sports = res?.Sports;
  const politics = res?.Politics;

  const chartData = [
    {
      category: "Total Posts",
      technology: technology?.length ?? 0,
      sports: sports?.length ?? 0,
      business: business?.length ?? 0,
      politics: politics?.length ?? 0,
    },
  ];

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col">
        <CardContent className="pt-6">
          <p className="text-sm text-red-500">ডেটা লোড করা যায়নি।</p>
        </CardContent>
      </Card>
    );
  }

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
              <span className="text-muted-foreground text-[10px]">
                {cfg.label}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} barCategoryGap="30%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDataOverflow
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="technology"
              fill="var(--color-technology)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="sports"
              fill="var(--color-sports)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="business"
              fill="var(--color-business)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="politics"
              fill="var(--color-politics)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}