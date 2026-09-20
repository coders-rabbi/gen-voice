"use client";

import { useEffect, useMemo, useState } from "react";
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
import useSWR from "swr";
import { getPolls } from "@/services/poll";
import PollsSkeleton from "./components/pollSkeleton";

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

type PollStats = {
  allPolls: number;
  activePolls: number;
  totalVotes: number;
  avgCompletion: number;
};

const page = () => {
  const { data: res, error, isLoading, mutate } = useSWR("polls", getPolls);
  const polls = res?.data;

  const stats: PollStats = useMemo(() => {
    if (!polls || polls.length === 0) {
      return { allPolls: 0, activePolls: 0, totalVotes: 0, avgCompletion: 0 };
    }

    const now = new Date();
    const allPolls = polls.length;

    const activePolls = polls.filter((p) => {
      if (!p?.startDate || !p?.endDate) return false;

      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      end.setHours(23, 59, 59, 999); 

      return start <= now && end >= now;
    }).length;

    const totalVotes = polls.reduce((sum, p) => sum + (p.votes ?? 0), 0);
    const avgCompletion =
      polls.reduce((sum, p) => sum + (p.completionRate ?? 0), 0) / allPolls;

    return { allPolls, activePolls, totalVotes, avgCompletion };
  }, [polls]);


  if (isLoading) return <PollsSkeleton />;

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
              value: isLoading ? "--" : (stats?.[config.key] ?? 0),
            }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {polls?.map((item) => (
          <Polls key={item?._id} polls={item} />
        ))}
      </div>
    </div>
  );
};

export default page;
