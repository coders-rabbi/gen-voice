"use client";

import { useMemo } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TPollAnalytics, TResponseSummary } from "@/types/poll.type";

// একটা fixed color palette, option-এর সংখ্যা যতই হোক, cycle করে ব্যবহার হবে
const PALETTE = [
  "#4F6EF7",
  "#1DD3B0",
  "#FFB020",
  "#F3F4F6",
  "#EF4444",
  "#8B5CF6",
];

type ChartSlice = {
  key: string;
  name: string;
  value: number; // শতাংশ
  count: number; // আসল কাউন্ট
  fill: string;
};

type PollDonutCardProps = {
  title: string;
  optionCounts: Record<string, number>;
};

// optionCounts (raw count) থেকে শতাংশসহ chart-friendly ডেটা বানানো
const buildChartData = (optionCounts: Record<string, number>): ChartSlice[] => {
  const entries = Object.entries(optionCounts);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (total === 0) return [];

  return entries.map(([name, count], idx) => ({
    key: name,
    name,
    value: Math.round((count / total) * 100),
    count,
    fill: PALETTE[idx % PALETTE.length],
  }));
};

interface PollResponseDonutChartsProps {
  analytics: TPollAnalytics | undefined;
  questionId?: string;
}

function PollDonutCard({ title, optionCounts }: PollDonutCardProps) {
  const chartData = useMemo(() => buildChartData(optionCounts), [optionCounts]);
  const filterId = `shadow-${title.replace(/\s+/g, "-")}`;

  if (chartData.length === 0) {
    return (
      <Card className="rounded-2xl border border-gray-100 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-[#0B63E5] text-base font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-gray-400 py-10">
            এখনো কোনো উত্তর জমা পড়েনি।
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-[#0B63E5] text-base font-semibold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative mx-auto h-[220px] w-full max-w-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter
                  id={filterId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="6"
                    floodColor="#000000"
                    floodOpacity="0.12"
                  />
                </filter>
              </defs>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                cornerRadius={8}
                stroke="none"
                filter={`url(#${filterId})`}
                label={({
                  cx = 0,
                  cy = 0,
                  midAngle = 0,
                  innerRadius = 0,
                  outerRadius = 0,
                  value = 0,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.55;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-[#1F2937] text-[13px] font-medium"
                    >
                      {value}%
                    </text>
                  );
                }}
                labelLine={false}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.key} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {chartData.map((item) => (
            <div key={item.key} className="flex items-center gap-1">
              <span
                className="h-2.5 w-2.5 rounded-full border"
                style={{ backgroundColor: item.fill, borderColor: item.fill }}
              />
              <span className="text-[10px] text-gray-500">
                {item.name} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// একটা response array থেকে নির্দিষ্ট questionId এর optionCounts বের করা (registered/guest এর জন্য)
const tallyOptionCounts = (
  responses: TResponseSummary[],
  questionId: string,
): Record<string, number> => {
  const counts: Record<string, number> = {};

  responses.forEach((r) => {
    const ans = r.answers.find((a) => a.questionId === questionId);
    if (!ans) return;

    const values = Array.isArray(ans.answer) ? ans.answer : [ans.answer];
    values.forEach((v) => {
      const label = v || "Other";
      counts[label] = (counts[label] ?? 0) + 1;
    });
  });

  return counts;
};

interface PollResponseDonutChartsProps {
  analytics: TPollAnalytics | undefined;
  questionId?: string; // ডিফল্টে প্রথম প্রশ্ন ধরা হচ্ছে
}

export default function PollResponseDonutCharts({
  analytics,
  questionId = "0",
}: PollResponseDonutChartsProps) {
  const allOptionCounts =
    analytics?.questionStats.find((q) => q.questionId === questionId)
      ?.optionCounts ?? {};

  const registeredOptionCounts = useMemo(
    () => tallyOptionCounts(analytics?.registeredResponses ?? [], questionId),
    [analytics, questionId],
  );

  const guestOptionCounts = useMemo(
    () => tallyOptionCounts(analytics?.guestResponses ?? [], questionId),
    [analytics, questionId],
  );

  return (
    <div className="mt-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PollDonutCard title="All Responses" optionCounts={allOptionCounts} />
        <PollDonutCard
          title="Registered User's Responses"
          optionCounts={registeredOptionCounts}
        />
        <PollDonutCard
          title="Unregistered User's Responses"
          optionCounts={guestOptionCounts}
        />
      </div>
    </div>
  );
}
