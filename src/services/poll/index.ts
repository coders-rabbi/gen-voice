import {
  TAnswerPayload,
  TCreatePollPayload,
  TCreatePollResult,
  TGetPollsResult,
  TPoll,
  TPollAnalytics,
  TPollResponse,
} from "@/types/poll.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const createPoll = async (
  token: string,
  payload: TCreatePollPayload,
): Promise<ApiResponse<TCreatePollResult>> => {
  return apiClientRaw<TCreatePollResult>(`/polls/create-poll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const getPolls = async (): Promise<ApiResponse<TGetPollsResult>> => {
  return apiClientRaw<TGetPollsResult>(`/polls`, {
    method: "GET",
  });
};

export const getPollById = async (
  pollId: string,
): Promise<ApiResponse<TPoll>> => {
  return apiClientRaw<TPoll>(`/polls/${pollId}`, {
    method: "GET",
  });
};

export const deletePoll = async (
  token: string,
  pollId: string,
): Promise<ApiResponse<TPoll>> => {
  return apiClientRaw<TPoll>(`/polls/${pollId}/delete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// ---------- poll response ----------

export const submitPollResponse = async (
  pollId: string,
  answers: TAnswerPayload[],
): Promise<ApiResponse<TPollResponse>> => {
  return apiClientRaw<TPollResponse>(`/poll-response/${pollId}/responses`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
};

export const getPollAnalytics = async (
  pollId: string,
): Promise<ApiResponse<TPollAnalytics>> => {
  return apiClientRaw<TPollAnalytics>(`/poll-response/${pollId}/analytics`, {
    // ✅
    method: "GET",
  });
};
