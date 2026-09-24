"use client";

import Link from "next/link";
import useSWR from "swr";
import { MdArrowForwardIos } from "react-icons/md";
import { getPolls } from "@/services/poll";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import PollVoteCard from "./pollVorteCard";

// ---------- লিস্ট কম্পোনেন্ট ----------

const VoteOpinion = () => {
  const { data: res, isLoading } = useSWR("polls", getPolls);
  const polls = res?.data;

  const token = getFromLocalStorage(authkey);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-[14px] font-semibold text-[#3E3232]">
            Vote Your Opinion
          </h2>
        </div>

        <Link
          href="/polls"
          className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
        >
          View All
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && <p className="text-xs text-[#6D757F]">Loading...</p>}
        {!isLoading &&
          polls
            ?.slice(0, 2)
            .map((item) => (
              <PollVoteCard key={item._id} poll={item} token={token} />
            ))}
      </div>
    </div>
  );
};

export default VoteOpinion;
