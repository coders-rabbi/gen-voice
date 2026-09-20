export type QuestionType =
  | "RADIO"
  | "TEXT"
  | "CHECKBOX"
  | "RATING"
  | "YESNO"
  | "EMOJI";

export type Visibility = "Public" | "Private" | "Unlisted";

export type Category = "Politics" | "Business" | "Technology" | "Culture";

export type TQuestion = {
  type: QuestionType;
  label: string;
  options: string[];
  required: boolean;
};

// Payload sent when creating a poll
export type TCreatePollPayload = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  visibility: Visibility;
  category: Category;
  questions: TQuestion[];
};

// Full poll shape as returned by the API
export type TPoll = TCreatePollPayload & {
  _id: string;
  votes: number;
  completionRate: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreatePollResult = TPoll;

export type TGetPollsResult = TPoll[];

export type TAnswerPayload = {
  questionId?: string;
  questionLabel: string;
  answer: string | string[];
};

export type TPollResponse = {
  _id: string;
  pollId: string;
  answers: TAnswerPayload[];
  respondentId?: string;
  createdAt: string;
  updatedAt: string;
};

export type TQuestionStat = {
  questionId: string;
  questionLabel: string;
  optionCounts: Record<string, number>;
};

// analytics-এ registered/guest ভাগ করা raw response
export type TResponseSummary = {
  _id: string;
  answers: TAnswerPayload[];
  respondentId?: string;
  createdAt: string;
};

export type TPollAnalytics = {
  totalResponses: number;
  registeredCount: number;
  guestCount: number;
  questionStats: TQuestionStat[];
  registeredResponses: TResponseSummary[];
  guestResponses: TResponseSummary[];
};
