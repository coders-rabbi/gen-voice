"use client";

import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { useMemo } from "react";
import { FaArrowLeft, FaEye, FaUsers } from "react-icons/fa6";
import PollInfoCards from "../components/pollInfoCards";
import { IconType } from "react-icons";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import PollResponseDonutCharts from "../components/detailsPieChart";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getPollAnalytics, getPollById } from "@/services/poll";

const TitleDetails = {
  title: "Poll Details",
  subtitle: "Design an interactive poll with multiple question types.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Polls", href: "/dashboard/all-poll" },
    { label: "Poll Details" },
  ],
};

// UI-related config (icon, color) — backend থেকে আসবে না, static থাকবে
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

type PollStats = {
  totalVotes: number | string;
  visibility: string;
  status: string;
  daysLeft: number | string;
};

const page = () => {
  const { pollDetails: pollId } = useParams();
  console.log("ID", pollId);

  const {
    data: res,
    error,
    isLoading,
  } = useSWR(pollId ? ["poll", pollId] : null, () =>
    getPollById(pollId as string),
  );

  const poll = res?.data;
  console.log("Poll Data", poll);

  const { data: resAnalytics } = useSWR(
    pollId ? ["Analytics", pollId] : null,
    () => getPollAnalytics(pollId as string),
  );

  const analytics = resAnalytics?.data;
  console.log("resAnalytics:", resAnalytics); // 👈 পুরো response
  console.log("analytics:", analytics); // 👈 শুধু data অংশ

  const stats: PollStats | null = useMemo(() => {
    if (!poll) return null;

    const now = new Date();
    const start = poll.startDate ? new Date(poll.startDate) : null;
    const end = poll.endDate ? new Date(poll.endDate) : null;

    console.log("poll:", poll);
    console.log("start:", start, "end:", end);

    let status = "Inactive";
    let daysLeft: number | string = 0;

    if (start && end) {
      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);

      const isActive = start <= now && endOfDay >= now;
      status = isActive ? "Active" : "Inactive";

      // বাকি দিন হিসাব (শুধু active/upcoming হলে অর্থবহ)
      const diffMs = endOfDay.getTime() - now.getTime();
      daysLeft = diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;
    }

    console.log("computed stats:", {
      totalVotes: poll.votes,
      visibility: poll.visibility,
      status,
      daysLeft,
    });

    return {
      totalVotes: poll.votes ?? 0,
      visibility: poll.visibility ?? "N/A",
      status,
      daysLeft,
    };
  }, [poll]);

  const loading = isLoading;

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

      {error && (
        <p className="text-sm text-red-500 mt-4">Poll লোড করা যায়নি।</p>
      )}

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
      <PollResponseDonutCharts analytics={analytics} />
    </div>
  );
};

export default page;
