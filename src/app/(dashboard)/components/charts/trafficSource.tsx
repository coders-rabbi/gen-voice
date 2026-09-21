"use client";

import { Legend, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TTrafficStats } from "@/services/traffic";

export const description = "Traffic sources semi-circle chart";

// শুধু এই source গুলোই দেখানো হবে, ক্রম অনুযায়ী
const SOURCE_META: Record<string, { label: string; color: string }> = {
  facebook: { label: "Facebook", color: "#3b82f6" },
  instagram: { label: "Instagram", color: "#ec4899" },
  twitter: { label: "Twitter", color: "#0ea5e9" },
  google: { label: "Google", color: "#a855f7" },
  email: { label: "Email", color: "#f97316" },
  direct: { label: "Direct", color: "#22c55e" },
};

interface trafficProps {
  traffic: TTrafficStats;
}

export function TrafficSources({ traffic }: trafficProps) {
  const bySource = (traffic?.bySource || {}) as Record<string, number>;

  const chartData = Object.entries(SOURCE_META).map(([source, meta]) => ({
    source,
    visitors: bySource[source] || 0,
    fill: `var(--color-${source})`,
  }));

  const hasData = chartData.some((item) => item.visitors > 0);

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    ...Object.entries(SOURCE_META).reduce(
      (acc, [source, meta]) => {
        acc[source] = { label: meta.label, color: meta.color };
        return acc;
      },
      {} as Record<string, { label: string; color: string }>,
    ),
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-muted-foreground text-base font-normal">
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        {!hasData ? (
          <p className="text-muted-foreground w-full py-10 text-center text-sm">
            No traffic data yet
          </p>
        ) : (
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
                data={chartData.filter((item) => item.visitors > 0)}
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
        )}
      </CardContent>
    </Card>
  );
}
