"use client";

import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaUsers } from "react-icons/fa6";
import PollInfoCards from "../components/pollInfoCards";
import { IconType } from "react-icons";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import PollResponseDonutCharts from "../components/detailsPieChart";

const TitleDetails = {
  title: "Poll Details",
  subtitle: "Design an interactive poll with multiple question types.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Polls", href: "/dashboard/all-poll" },
    { label: "Poll Details" },
  ],
};

// ১) UI-related config (icon, color) — এগুলো backend থেকে আসবে না, তাই static থাকবে
type CardConfig = {
  key: "totalVotes" | "visibility" | "status" | "daysLeft";
  name: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
};

const cardConfig: CardConfig[] = [
  {
    key: "totalVotes",
    name: "Total Votes",
    icon: FaUsers,
    iconColor: "text-[#FB00FF]",
    iconBg: "bg-[#FED5FF]",
  },
  {
    key: "visibility",
    name: "Visibility",
    icon: FaEye,
    iconColor: "text-[#22C55E]",
    iconBg: "bg-[#DCFCE7]",
  },
  {
    key: "status",
    name: "Status",
    icon: FaRegCheckCircle,
    iconColor: "text-[#0088FF]",
    iconBg: "bg-[#DFECFF]",
  },
  {
    key: "daysLeft",
    name: "Days Left",
    icon: IoMdTime,
    iconColor: "text-[#FF8200]",
    iconBg: "bg-[#FFEBD6]",
  },
];

// ২) API থেকে আসা raw response shape
// 🔽 এখানে তোমার backend যা যা field নামে পাঠায় সেভাবে বসাও
type PollStatsResponse = {
  totalVotes: number | string;
  isPublic: boolean; // true হলে "Public", false হলে "Private" — visibility card-এর জন্য
  pollStatus: string; // যেমন: "active" | "closed" | "draft" — status card-এর জন্য
  daysLeft: number | string;
};

// ৩) UI card গুলোর key অনুযায়ী normalize করা shape
type PollStats = {
  totalVotes: number | string;
  visibility: string;
  status: string;
  daysLeft: number | string;
};

const page = () => {
  const [stats, setStats] = useState<PollStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 🔽 তোমার আসল API endpoint দিয়ে বদলে দাও
        const res = await fetch("/api/polls/stats");
        const data: PollStatsResponse = await res.json();

        // raw API response কে card-friendly shape এ map করা হচ্ছে
        setStats({
          totalVotes: data.totalVotes ?? 0,
          visibility: data.isPublic ? "Public" : "Private",
          status: data.pollStatus ?? "N/A",
          daysLeft: data.daysLeft ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch poll stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5 mt-5 lg:mt-0">
          <Link
            href="/dashboard/all-poll"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardConfig.map((config) => (
          <PollInfoCards
            key={config.key}
            item={{
              name: config.name,
              icon: config.icon,
              iconColor: config.iconColor,
              iconBg: config.iconBg,
              value: loading ? "--" : (stats?.[config.key] ?? 0),
            }}
          />
        ))}
      </div>
      <PollResponseDonutCharts />
      {/* <DailyResponsesChart /> */}

    </div>
  );
};

export default page;
