import {
  TCreatePollPayload,
  TCreatePollResult,
  TGetPollsResult,
  TPoll,
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

export const getPolls = async (
  token: string,
): Promise<ApiResponse<TGetPollsResult>> => {
  return apiClientRaw<TGetPollsResult>(`/polls`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPollById = async (
  token: string,
  pollId: string,
): Promise<ApiResponse<TPoll>> => {
  return apiClientRaw<TPoll>(`/polls/${pollId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
