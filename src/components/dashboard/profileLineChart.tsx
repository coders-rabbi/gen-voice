"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getMonthlyPostCount } from "@/services/news/news.service";

export const description = "Reporter monthly post count";

const chartConfig = {
  count: {
    label: "Posts",
    color: "#FCC54C",
  },
} satisfies ChartConfig;

type ProfileChartProps = {
  reporterId: string;
  year?: number;
};

export function ProfileChart({ reporterId, year }: ProfileChartProps) {
  const [chartData, setChartData] = useState<
    { month: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getMonthlyPostCount(reporterId, year);
        setChartData(res.data?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch monthly post count:", error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (reporterId) {
      fetchData();
    }
  }, [reporterId, year]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-75 items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading chart...</p>
        </CardContent>
      </Card>
    );
  }

  if (!chartData.length) {
    return (
      <Card>
        <CardContent className="flex h-75 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No post data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <ChartContainer
          className="h-112.5 w-full max-h-75"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-count)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
