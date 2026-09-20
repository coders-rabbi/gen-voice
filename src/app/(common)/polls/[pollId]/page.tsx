"use client";

import { use } from "react";
import useSWR from "swr";
import { getPollById } from "@/services/poll";
import { PollVoteCard } from "../page";
import PollCardSkeleton from "../components/pollCardSkeleton";
import Advertisement from "@/components/advertisement";

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

  return (
    <div className="mt-5 max-w-4xl mx-auto h-[100vh]">
      <PollVoteCard poll={poll} />
      <Advertisement/>
    </div>
  );
};

export default SinglePollPage;
