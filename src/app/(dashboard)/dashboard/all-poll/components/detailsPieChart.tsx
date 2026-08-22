import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = {
  answer1: "#4F6EF7",
  answer2: "#1DD3B0",
  answer3: "#FFB020",
  other: "#F3F4F6",
};

type PollAnswerKey = keyof typeof COLORS;
type PollDonutData = Record<PollAnswerKey, number>;

type PollDonutCardProps = {
  title: string;
  data: PollDonutData;
};

const LEGEND_ITEMS: Array<{
  key: PollAnswerKey;
  label: string;
  color: string;
}> = [
  { key: "answer1", label: "Answer 1", color: COLORS.answer1 },
  { key: "answer2", label: "Answer 2", color: COLORS.answer2 },
  { key: "answer3", label: "Answer 3", color: COLORS.answer3 },
  { key: "other", label: "Other", color: COLORS.other },
];

function PollDonutCard({ title, data }: PollDonutCardProps) {
  const chartData: Array<{
    key: PollAnswerKey;
    name: string;
    value: number;
    fill: string;
  }> = [
    {
      key: "answer2",
      name: "Answer 2",
      value: data.answer2,
      fill: COLORS.answer2,
    },
    { key: "other", name: "Other", value: data.other, fill: COLORS.other },
    {
      key: "answer3",
      name: "Answer 3",
      value: data.answer3,
      fill: COLORS.answer3,
    },
    {
      key: "answer1",
      name: "Answer 1",
      value: data.answer1,
      fill: COLORS.answer1,
    },
  ];

  const filterId = `shadow-${title.replace(/\s+/g, "-")}`;

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
                  <Cell
                    key={entry.key}
                    fill={entry.fill}
                    stroke={entry.key === "other" ? "#E5E7EB" : "none"}
                    strokeWidth={entry.key === "other" ? 1 : 0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {LEGEND_ITEMS.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-0.5 justify-center"
            >
              <span
                className="h-2.5 w-2.5 rounded-full border"
                style={{
                  backgroundColor: item.color,
                  borderColor: item.key === "other" ? "#D1D5DB" : item.color,
                }}
              />
              <span className="text-[10px] text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PollResponseDonutCharts() {
  const allResponses: PollDonutData = {
    answer1: 25,
    answer2: 30,
    answer3: 20,
    other: 25,
  };
  const registeredResponses: PollDonutData = {
    answer1: 25,
    answer2: 30,
    answer3: 20,
    other: 25,
  };
  const unregisteredResponses: PollDonutData = {
    answer1: 25,
    answer2: 30,
    answer3: 20,
    other: 25,
  };

  return (
    <div className="mt-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <PollDonutCard title="All Responses" data={allResponses} />
        <PollDonutCard
          title="Registered User's Responses"
          data={registeredResponses}
        />
        <PollDonutCard
          title="Unregistered User's Responses"
          data={unregisteredResponses}
        />
      </div>
    </div>
  );
}
