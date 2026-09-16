import { TFollow } from "@/types/follow.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const followReporter = async (
  reporterId: string,
  token: string,
): Promise<ApiResponse<TFollow>> => {
  return apiClientRaw<TFollow>("/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reporter: reporterId }),
  });
};

export const unfollowReporter = async (
  reporterId: string,
  token: string,
): Promise<ApiResponse<null>> => {
  return apiClientRaw<null>(`/follow/${reporterId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReporterFollowers = async (
  reporterId: string,
): Promise<ApiResponse<any[]>> => {
  return apiClientRaw<any[]>(`/follow/followers/${reporterId}`, {
    method: "GET",
  });
};

export const getFollowerCount = async (
  reporterId: string,
): Promise<ApiResponse<{ count: number }>> => {
  return apiClientRaw<{ count: number }>(`/follow/count/${reporterId}`, {
    method: "GET",
  });
};

export const checkIsFollowing = async (
  reporterId: string,
  token: string,
): Promise<ApiResponse<{ isFollowing: boolean }>> => {
  return apiClientRaw<{ isFollowing: boolean }>(
    `/follow/is-following/${reporterId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
