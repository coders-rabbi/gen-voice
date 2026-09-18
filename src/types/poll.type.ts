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
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreatePollResult = TPoll;

export type TGetPollsResult = TPoll[];
