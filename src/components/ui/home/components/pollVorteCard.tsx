"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { CiCalendar } from "react-icons/ci";
import vote from "@/assets/home/vote.png";
import { submitPollResponse } from "@/services/poll";
import { TAnswerPayload, TPoll } from "@/types/poll.type";

type PollVoteCardProps = {
  poll: TPoll;
  token: string | null;
};

// TEXT/RADIO/YESNO/RATING/EMOJI → string, CHECKBOX → string[]
type AnswerValue = string | string[];

const isAnswered = (value?: AnswerValue) =>
  Array.isArray(value) ? value.length > 0 : !!value?.trim();

const normalizeAnswer = (value?: AnswerValue) =>
  Array.isArray(value) ? value.join(", ") : (value ?? "").trim();

// ---------- একটা single poll card, নিজস্ব answer state সহ ----------

const PollVoteCard = ({ poll, token }: PollVoteCardProps) => {
  // key: questionIndex → উত্তর
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [submitting, setSubmitting] = useState(false);
  // এখন কোন প্রশ্নটা দেখানো হচ্ছে
  const [step, setStep] = useState(0);

  const total = poll.questions.length;
  const q = poll.questions[step];
  const isLast = step === total - 1;

  if (!q) return null;

  const currentAnswer = answers[step];

  // RADIO / YESNO / RATING / EMOJI / TEXT — একটাই মান
  const setSingleAnswer = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  // CHECKBOX — একাধিক অপশন টগল
  const toggleOption = (questionIndex: number, option: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionIndex])
        ? (prev[questionIndex] as string[])
        : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [questionIndex]: next };
    });
  };

  const handleNext = () => {
    // বর্তমান প্রশ্ন required হলে উত্তর ছাড়া পরের প্রশ্নে যাওয়া যাবে না
    if (q.required && !isAnswered(currentAnswer)) {
      Swal.fire({
        icon: "warning",
        title: "উত্তর অসম্পূর্ণ",
        text: "এই প্রশ্নের উত্তর দেওয়া বাধ্যতামূলক।",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // শেষ প্রশ্নে না পৌঁছালে সাবমিট হবে না (যেমন Enter চাপলে)
    if (!isLast) return;

    // required প্রশ্ন সব উত্তর দেওয়া হয়েছে কিনা চেক
    const missingIndex = poll.questions.findIndex(
      (question, idx) => question.required && !isAnswered(answers[idx]),
    );

    if (missingIndex !== -1) {
      // যে প্রশ্নের উত্তর বাকি, সেখানে নিয়ে যাও
      setStep(missingIndex);
      Swal.fire({
        icon: "warning",
        title: "উত্তর অসম্পূর্ণ",
        text: `"${poll.questions[missingIndex].label}" প্রশ্নের উত্তর দেওয়া বাধ্যতামূলক।`,
      });
      return;
    }

    // শুধু যেসব প্রশ্নের উত্তর দেওয়া হয়েছে সেগুলো পাঠানো হবে
    const payload: TAnswerPayload[] = poll.questions
      .map((question, idx) => ({
        questionId: String(idx),
        questionLabel: question.label,
        answer: normalizeAnswer(answers[idx]),
      }))
      .filter((item) => item.answer !== "");

    if (payload.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "উত্তর অসম্পূর্ণ",
        text: "কমপক্ষে একটি প্রশ্নের উত্তর দিন।",
      });
      return;
    }

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
      setStep(0);
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

      <form className="space-y-4 pl-4 pr-2" onSubmit={handleSubmit}>
        {/* শুধু বর্তমান প্রশ্নটা দেখানো হচ্ছে */}
        <div className="space-y-2">
          {total > 1 && (
            <p className="text-[10px] font-semibold text-[#6D757F]">
              Question {step + 1} of {total}
            </p>
          )}

          <p className="text-[11px] font-semibold text-[#1E3A5F]">{q.label}</p>

          {/* TEXT: ইনপুট বক্স */}
          {q.type === "TEXT" && (
            <textarea
              value={typeof currentAnswer === "string" ? currentAnswer : ""}
              onChange={(e) => setSingleAnswer(step, e.target.value)}
              placeholder="আপনার উত্তর লিখুন..."
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-[11px] text-[#1E3A5F] outline-none resize-none placeholder:text-gray-400 focus:border-blue-600"
            />
          )}

          {/* CHECKBOX: একাধিক অপশন সিলেক্ট */}
          {q.type === "CHECKBOX" &&
            q.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={opt}
                  checked={
                    Array.isArray(currentAnswer) && currentAnswer.includes(opt)
                  }
                  onChange={() => toggleOption(step, opt)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                  {opt}
                </span>
              </label>
            ))}

          {/* RADIO / YESNO / RATING / EMOJI: একটা অপশন সিলেক্ট */}
          {q.type !== "TEXT" &&
            q.type !== "CHECKBOX" &&
            q.options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={`poll-${poll._id}-q${step}`}
                  value={opt}
                  checked={currentAnswer === opt}
                  onChange={() => setSingleAnswer(step, opt)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className="text-[10px] font-bold text-[#1E3A5F] group-hover:text-blue-600 transition-colors">
                  {opt}
                </span>
              </label>
            ))}
        </div>

        <div className="pt-2 flex items-center gap-2">
          {step > 0 && (
            <button
              key="back"
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200 text-[10px]"
            >
              Back
            </button>
          )}

          {!isLast ? (
            <button
              key="next"
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-[10px]"
            >
              Next
            </button>
          ) : (
            <button
              key="submit"
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-[10px] disabled:opacity-50"
            >
              {submitting ? "জমা হচ্ছে..." : "Submit Vote"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PollVoteCard;