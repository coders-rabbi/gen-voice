"use client";

import { use } from "react";
import useSWR from "swr";
import { getPollById } from "@/services/poll";
import PollCardSkeleton from "../components/pollCardSkeleton";
import Advertisement from "@/components/advertisement";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import PollVoteCard from "@/components/ui/home/components/pollVorteCard";

const SinglePollPage = ({
  params,
}: {
  params: Promise<{ pollId: string }>;
}) => {
  const { pollId } = use(params);
  const { data: res, isLoading } = useSWR(`poll-${pollId}`, () =>
    getPollById(pollId),
  );
  const poll = res?.data;

  if (isLoading) return <PollCardSkeleton />;
  if (!poll)
    return <p className="text-xs text-[#6D757F]">Poll পাওয়া যায়নি</p>;

  const token = getFromLocalStorage(authkey);

  return (
    <div className="mt-5 max-w-4xl mx-auto h-[100vh] my-10">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">মতামত দিন</h1>
        <p>
          আপনার মতামত আমাদের কাছে তত্যন্ত গুরুত্বপূর্ণ। সকলের মতামত আমরা
          গুরুত্বের সাথে গ্রহন করি।
        </p>
      </div>
      <PollVoteCard poll={poll} token={token} />
      <Advertisement />
    </div>
  );
};

export default SinglePollPage;
