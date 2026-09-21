"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import useSWR from "swr";
import { CiCalendar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import vote from "@/assets/home/vote.png";
import { getPolls, submitPollResponse } from "@/services/poll";
import { TAnswerPayload, TPoll } from "@/types/poll.type";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

// ---------- একটা single poll card, নিজস্ব answer state সহ ----------

const PollVoteCard = ({ poll, token }: { poll: TPoll, token: string | null }) => {
  // key: questionIndex (string) → selected option
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (questionIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // required প্রশ্ন সব উত্তর দেওয়া হয়েছে কিনা চেক
    const missingIndex = poll.questions.findIndex(
      (q, idx) => q.required && !answers[idx],
    );

    if (missingIndex !== -1) {
      Swal.fire({
        icon: "warning",
        title: "উত্তর অসম্পূর্ণ",
        text: `"${poll.questions[missingIndex].label}" প্রশ্নের উত্তর দেওয়া বাধ্যতামূলক।`,
      });
      return;
    }

    const payload: TAnswerPayload[] = poll.questions.map((q, idx) => ({
      questionId: String(idx),
      questionLabel: q.label,
      answer: answers[idx],
    }));

    setSubmitting(true);
    try {
      await submitPollResponse(token, poll._id, payload);
      Swal.fire({
        icon: "success",
        title: "ধন্যবাদ!",
        text: "আপনার ভোট সফলভাবে জমা হয়েছে।",
        timer: 2000,
        showConfirmButton: false,
      });
      setAnswers({});
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "ভোট জমা দেওয়া যায়নি।";
      Swal.fire({ icon: "error", title: "Failed", text: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card py-4 px-1.5 shadow-sm mt-2 border rounded-xl">
      <div className="flex items-center gap-2">
        <Image src={vote} alt="gen voice" className="w-14 h-14" />
        <div>
          <div className="flex justify-between items-center">
            <h4 className="text-[#6D757F] font-semibold text-xs">
              {poll.category?.toUpperCase()}
            </h4>
            <p className="flex items-center gap-1 text-xs text-[#6D757F] font-semibold">
              <CiCalendar /> {poll.startDate.split("T")[0]}
            </p>
          </div>
          <p className="text-xs font-semibold text-[#183354] mt-1">
            {poll.title}
          </p>
        </div>
      </div>

      <form className="space-y-4 pl-4" onSubmit={handleSubmit}>
        {poll.questions.map((q, qIdx) => (
          <div key={qIdx} className="space-y-2">
            {poll.questions.length > 1 && (
              <p className="text-[11px] font-semibold text-[#1E3A5F]">
                {q.label}
              </p>
            )}
            {q.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={`poll-${poll._id}-q${qIdx}`}
                  value={opt}
                  checked={answers[qIdx] === opt}
                  onChange={() => handleSelect(qIdx, opt)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-[10px] disabled:opacity-50"
          >
            {submitting ? "জমা হচ্ছে..." : "Submit Vote"}
          </button>
        </div>
      </form>
    </div>
  );
};

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
            .map((item) => <PollVoteCard key={item._id} poll={item} token={token} />)}
      </div>
    </div>
  );
};

export default VoteOpinion;
