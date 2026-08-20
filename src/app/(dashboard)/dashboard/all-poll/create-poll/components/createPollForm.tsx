"use client";

import { useState } from "react";
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

let idCounter = 1;
const nextId = () => `q-${idCounter++}`;

export default function CreatePollForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [category, setCategory] = useState("Politics");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: nextId(),
      type: "RADIO",
      label: "What is your preferred choice?",
      options: ["Option A", "Option B", "Option C", "New Option"],
      required: true,
    },
  ]);

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

  return (
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
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    className="w-full border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none placeholder:text-gray-400 focus:border-[#005CE8]"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#525252] mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    className="w-full border rounded-lg px-3.5 py-2.5 pr-9 text-sm outline-none placeholder:text-gray-400 focus:border-[#005CE8]"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    onChange={(e) => setVisibility(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
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
            <button
              type="button"
              className="flex items-center gap-1.5 border rounded-full px-4 py-1.5 text-sm hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
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
                        q.required ? "translate-x-[22px]" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
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
  );
}
