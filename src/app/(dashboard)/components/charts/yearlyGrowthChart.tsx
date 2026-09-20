"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TNews } from "@/types/news";

export const description = "Yearly posts bar chart";

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

function formatYAxis(value: number) {
  if (value === 0) return "0";
  if (value >= 1000000) return `${value / 1000000}M`;
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

interface newsProps {
  newsData: TNews[];
}

export function YearlyPostsChart({ newsData }: newsProps) {
  const publishedNews = newsData.filter(
    (item) => item?.status === "published",
  ).length;
  const pendingNews = newsData.filter(
    (item) => item?.status === "pending",
  ).length;
  const rejectNews = newsData.filter(
    (item) => item?.status === "rejected",
  ).length;
  const archivedNews = newsData.filter(
    (item) => item?.status === "archived",
  ).length;

  // real counts দিয়ে single data point বানানো হচ্ছে
  const chartData = [
    {
      category: "Total Posts",
      archived: archivedNews,
      rejected: rejectNews,
      published: publishedNews,
      pending: pendingNews,
    },
  ];

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
              style={{ backgroundColor: chartConfig.pending.color }}
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
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-75 w-full">
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
              dataKey="archived"
              fill="var(--color-archived)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="rejected"
              fill="var(--color-rejected)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="published"
              fill="var(--color-published)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              fill="var(--color-pending)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}