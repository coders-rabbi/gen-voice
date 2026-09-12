export type TReactionType = "like" | "love" | "wow" | "sad" | "angry";

export type TReaction = {
  _id: string;
  newsId: string;
  userId: string;
  type: TReactionType;
  createdAt: string;
  updatedAt: string;
};

export type TReactionCounts = Record<TReactionType, number>;

export type TReactionPayload = {
  type: TReactionType;
};

export type TToggleReactionResult = {
  action: "created" | "updated" | "removed";
  data?: TReaction;
};
