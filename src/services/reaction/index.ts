import {
  TReactionCounts,
  TReactionPayload,
  TReactionType,
  TToggleReactionResult,
} from "@/types/reaction.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

// Reaction দেওয়া / পরিবর্তন করা / সরানো (toggle)
export const toggleReaction = async (
  token: string,
  newsId: string,
  payload: TReactionPayload,
): Promise<ApiResponse<TToggleReactionResult>> => {
  return apiClientRaw<TToggleReactionResult>(`/reactions/${newsId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

// একটা নিউজের সব reaction-এর count আনা (public, auth লাগে না)
export const getReactionCounts = async (
  newsId: string,
): Promise<ApiResponse<TReactionCounts>> => {
  return apiClientRaw<TReactionCounts>(`/reactions/counts/${newsId}`, {
    method: "GET",
  });
};

// বর্তমান লগইন করা ইউজারের reaction আনা
export const getMyReaction = async (
  newsId: string,
): Promise<ApiResponse<TReactionType | null>> => {
  return apiClientRaw<TReactionType | null>(
    `/reactions/my-reaction/${newsId}`,
    {
      method: "GET",
    },
  );
};
