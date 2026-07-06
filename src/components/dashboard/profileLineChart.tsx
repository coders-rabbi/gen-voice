"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 314, mobile: 140 },
  { month: "August", desktop: 114, mobile: 140 },
  { month: "Septembar", desktop: 454, mobile: 140 },
  { month: "Octobor", desktop: 413, mobile: 140 },
  { month: "Ovembar", desktop: 298, mobile: 140 },
  { month: "Decembar", desktop: 274, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FCC54C",
  },
  mobile: {
    label: "Mobile",
    color: "#FCC54C",
  },
} satisfies ChartConfig;

export function ProfileChart() {
  return (
    <Card>
      <CardContent>
        <ChartContainer className="h-[450px] w-full max-h-[300px]" config={chartConfig}>
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
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
