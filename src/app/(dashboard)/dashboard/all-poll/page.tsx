"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "../../components/page-Title";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckToSlot,
  FaPlus,
  FaChartLine,
  FaUserGroup,
  FaGaugeHigh,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import PollInfoCards from "./components/pollInfoCards";
import Polls from "./components/polls";

const TitleDetails = {
  title: "All Polls",
  subtitle: "Create and manage interactive polls for your audience.",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Polls" }],
};

// ১) UI-related config (icon, color) — এগুলো backend থেকে আসবে না, তাই static থাকবে
type CardConfig = {
  key: "allPolls" | "activePolls" | "totalVotes" | "avgCompletion";
  name: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
};

const cardConfig: CardConfig[] = [
  {
    key: "allPolls",
    name: "All Polls",
    icon: FaCheckToSlot,
    iconColor: "text-[#FB00FF]",
    iconBg: "bg-[#FED5FF]",
  },
  {
    key: "activePolls",
    name: "Active Polls",
    icon: FaChartLine,
    iconColor: "text-[#22C55E]",
    iconBg: "bg-[#DCFCE7]",
  },
  {
    key: "totalVotes",
    name: "Total Votes",
    icon: FaUserGroup,
    iconColor: "text-[#0088FF]",
    iconBg: "bg-[#DFECFF]",
  },
  {
    key: "avgCompletion",
    name: "Avg Completion",
    icon: FaGaugeHigh,
    iconColor: "text-[#FF8200]",
    iconBg: "bg-[#FFEBD6]",
  },
];

// ২) API থেকে আসা dynamic value-র shape
type PollStats = {
  allPolls: number;
  activePolls: number;
  totalVotes: number;
  avgCompletion: number;
};

const page = () => {
  const [stats, setStats] = useState<PollStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 🔽 তোমার আসল API endpoint দিয়ে বদলে দাও
        const res = await fetch("/api/polls/stats");
        const data = await res.json();
        setStats(data);
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
      <div className="flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5">
          <Link
            href="/dashboard"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
          <Link
            href="all-poll/create-poll"
            className="bg-[#005CE8] text-white border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#F0F6FF] w-fit "
          >
            <FaPlus />
            Create Poll
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
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <Polls key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
