"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Calendar,
  Eye,
  X,
  Plus,
  GripVertical,
  Type,
  ListChecks,
  CheckSquare,
  Star,
  Link2,
  Smile,
} from "lucide-react";
import { getPollById, updatePoll } from "@/services/poll";
import { getFromLocalStorage } from "../../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { Category, TPoll, Visibility } from "@/types/poll.type";
import Swal from "sweetalert2";
import useSWR from "swr";
import { useParams } from "next/navigation";
import PollsSkeleton from "../../components/pollSkeleton";
import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

type QuestionType =
  | "RADIO"
  | "TEXT"
  | "CHECKBOX"
  | "RATING"
  | "YESNO"
  | "EMOJI";

type Question = {
  id: string;
  type: QuestionType;
  label: string;
  options: string[];
  required: boolean;
};

type PollPayload = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  visibility: Visibility;
  category: Category;
  questions: Question[];
};

const questionTypeMeta: Record<
  QuestionType,
  { label: string; icon: React.ElementType }
> = {
  TEXT: { label: "Text Input", icon: Type },
  RADIO: { label: "Radio", icon: ListChecks },
  CHECKBOX: { label: "Checkbox", icon: CheckSquare },
  RATING: { label: "Rating", icon: Star },
  YESNO: { label: "Yes/No", icon: Link2 },
  EMOJI: { label: "Emoji", icon: Smile },
};

const addQuestionButtons: QuestionType[] = [
  "TEXT",
  "RADIO",
  "CHECKBOX",
  "RATING",
  "YESNO",
  "EMOJI",
];

const TitleDetails = {
  title: "Poll Update",
  subtitle: "Design an interactive poll with multiple question types.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Polls", href: "/dashboard/all-poll" },
    { label: "Update" },
  ],
};

let idCounter = 1;
const nextId = () => `q-${idCounter++}`;

export default function CreatePollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("Public");
  const [category, setCategory] = useState<Category>("Politics");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: nextId(),
      type: "RADIO",
      label: "What is your preferred choice?",
      options: ["Option A", "Option B", "Option C", "New Option"],
      required: true,
    },
  ]);

  const token = getFromLocalStorage(authkey);

  // FIX 1: useParams() ফাংশন হিসেবে call করতে হবে, আর id string না array হতে পারে
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const {
    data: res,
    error,
    isLoading,
  } = useSWR(id ? ["poll", id] : null, () => getPollById(id as string));

  const data = res?.data;

  console.log(id, data);

  // FIX 3: fetch হওয়া poll data দিয়ে form state populate করা
  useEffect(() => {
    if (!data) return;

    setTitle(data.title ?? "");
    setDescription(data.description ?? "");
    setStartDate(data.startDate ? data.startDate.slice(0, 10) : "");
    setEndDate(data.endDate ? data.endDate.slice(0, 10) : "");
    setVisibility((data.visibility as Visibility) ?? "Public");
    setCategory((data.category as Category) ?? "Politics");

    if (Array.isArray(data.questions) && data.questions.length > 0) {
      setQuestions(
        data.questions.map((q: any) => ({
          id: q.id ?? nextId(),
          type: q.type,
          label: q.label,
          options: q.options ?? [],
          required: !!q.required,
        })),
      );
    }
  }, [data]);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current as
      | (HTMLInputElement & { showPicker?: () => void })
      | null;

    if (!el) return;

    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      el.focus();
    }
  };

  const addQuestion = (type: QuestionType) => {
    const needsOptions = type === "RADIO" || type === "CHECKBOX";
    setQuestions((prev) => [
      ...prev,
      {
        id: nextId(),
        type,
        label: "Untitled question",
        options: needsOptions ? ["Option A", "Option B"] : [],
        required: false,
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    );
  };

  const addOption = (qId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: [...q.options, "New Option"] } : q,
      ),
    );
  };

  const updateOption = (qId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt)),
            }
          : q,
      ),
    );
  };

  const removeOption = (qId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q,
      ),
    );
  };

  // FIX 4: এটা edit/update form, তাই createPoll না, updatePoll কল হবে
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const payload: PollPayload = {
      title,
      description,
      startDate,
      endDate,
      visibility,
      category,
      questions,
    };

    try {
      const res = await updatePoll(token as string, id, payload);

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message ?? "Poll updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message ?? "Poll update করা যায়নি।",
        });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Poll update করার সময় সমস্যা হয়েছে।";

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: message,
      });
    }
  };

  // FIX 5: loading/error state হ্যান্ডেল করা
  if (isLoading) {
    return <PollsSkeleton />;
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-sm text-red-500">
        Poll load করা যায়নি। আবার চেষ্টা করুন।
      </div>
    );
  }

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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start mt-10">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Poll Details */}
            <section className="border rounded-2xl p-6 bg-white">
              <h2 className="font-semibold text-lg mb-5">Poll Details</h2>

              <div className="flex flex-col gap-5">
                {/* Title */}
                <div>
                  <label className="block text-sm text-[#525252] mb-1.5">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Public Sentiment on Economic Policy"
                    className="w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#005CE8]"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm text-[#525252] mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the poll...."
                    rows={3}
                    className="w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none resize-none placeholder:text-gray-400 focus:border-[#005CE8]"
                  />
                </div>

                {/* Start / End date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#525252] mb-1.5">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        ref={startDateRef}
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={endDate || undefined}
                        className="w-full border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-[#005CE8] [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <button
                        type="button"
                        onClick={() => openDatePicker(startDateRef)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005CE8]"
                        aria-label="Open start date picker"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1.5">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        ref={endDateRef}
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || undefined}
                        className="w-full border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none focus:border-[#005CE8] [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <button
                        type="button"
                        onClick={() => openDatePicker(endDateRef)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005CE8]"
                        aria-label="Open end date picker"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visibility / Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#525252] mb-1.5">
                      Visibility
                    </label>
                    <div className="relative">
                      <select
                        value={visibility}
                        onChange={(e) =>
                          setVisibility(e.target.value as Visibility)
                        }
                        className="w-full appearance-none border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none bg-white focus:border-[#005CE8]"
                      >
                        <option>Public</option>
                        <option>Private</option>
                        <option>Unlisted</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#525252] mb-1.5">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value as Category)
                        }
                        className="w-full appearance-none border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none bg-white focus:border-[#005CE8]"
                      >
                        <option>Politics</option>
                        <option>Business</option>
                        <option>Technology</option>
                        <option>Culture</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Questions */}
            <section className="border rounded-2xl p-6 bg-white">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-lg">Questions</h2>
                  <p className="text-sm text-[#525252]">
                    {questions.length} question{questions.length !== 1 && "s"}
                  </p>
                </div>
                {/* <button
                  type="button"
                  className="flex items-center gap-1.5 border rounded-full px-4 py-1.5 text-sm hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button> */}
              </div>

              <div className="flex flex-col gap-6">
                {questions.map((q, qIndex) => (
                  <div key={q.id} className="border rounded-2xl p-5">
                    {/* Question header */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center text-gray-400 pt-0.5 select-none">
                        <GripVertical className="w-4 h-4" />
                        <span className="text-xs mt-0.5">{qIndex + 1}</span>
                      </div>

                      <span className="text-xs font-semibold text-[#005CE8] bg-[#F0F6FF] rounded-full px-2.5 py-1 mt-0.5">
                        {q.type}
                      </span>

                      <input
                        value={q.label}
                        onChange={(e) =>
                          updateQuestion(q.id, { label: e.target.value })
                        }
                        className="flex-1 text-lg outline-none border-b border-transparent focus:border-gray-300 pb-0.5"
                      />

                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="text-[#FF3B30] hover:opacity-70 mt-1"
                        aria-label="Remove question"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Options (radio / checkbox types) */}
                    {(q.type === "RADIO" || q.type === "CHECKBOX") && (
                      <div className="mt-4 flex flex-col gap-3 pl-11">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span
                              className={`w-4 h-4 border border-gray-300 shrink-0 ${
                                q.type === "RADIO" ? "rounded-full" : "rounded"
                              }`}
                            />
                            <input
                              value={opt}
                              onChange={(e) =>
                                updateOption(q.id, i, e.target.value)
                              }
                              className="flex-1 border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-[#005CE8]"
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(q.id, i)}
                              className="text-gray-500 hover:text-black"
                              aria-label="Remove option"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addOption(q.id)}
                          className="flex items-center gap-1.5 text-sm border rounded-lg px-3.5 py-2 w-fit hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                          Add Option
                        </button>
                      </div>
                    )}

                    {/* Required toggle */}
                    <div className="flex items-center justify-between border-t mt-5 pt-4">
                      <span className="text-sm text-[#525252]">Required</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuestion(q.id, { required: !q.required })
                        }
                        className={`w-11 h-6 rounded-full relative transition-colors ${
                          q.required ? "bg-[#005CE8]" : "bg-gray-300"
                        }`}
                        aria-pressed={q.required}
                        aria-label="Toggle required"
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            q.required
                              ? "translate-x-[22px]"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-[#005CE8] text-white rounded-full px-6 py-2.5 text-sm font-medium hover:opacity-90"
                >
                  Update Poll
                </button>
              </div>
            </section>
          </div>

          {/* Right column: Add Question panel */}
          <section className="border rounded-2xl p-6 bg-white">
            <h2 className="font-semibold text-lg">Add Question</h2>
            <p className="text-sm text-[#525252] mb-4">Click a type to add</p>

            <div className="grid grid-cols-2 gap-3">
              {addQuestionButtons.map((type) => {
                const meta = questionTypeMeta[type];
                const Icon = meta.icon;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addQuestion(type)}
                    className="flex flex-col items-center justify-center gap-2 border rounded-xl py-5 hover:border-[#005CE8] hover:bg-[#F0F6FF] transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#005CE8]" />
                    <span className="text-sm">{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
