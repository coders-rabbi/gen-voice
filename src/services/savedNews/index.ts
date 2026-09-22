import { TNews } from "@/types/news";
import { apiClientRaw, ApiResponse } from "../apiClient";

export type TSavedNews = {
  _id: string;
  userId: string;
  newsId: TNews;
  reporterId?: string;
  createdAt: string;
};

export type ToggleSaveResponse = {
  saved: boolean;
};

// save/unsave toggle — already saved thakle unsave hobe, na thakle save hobe
export const toggleSaveNews = async (
  newsId: string,
  reporterId: string | undefined,
  token: string,
): Promise<ApiResponse<ToggleSaveResponse>> => {
  return apiClientRaw<ToggleSaveResponse>("/saved-news/toggle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ explicitly dilam, jate apiClientRaw-er
      // overwrite behavior-e eita lost na hoy
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newsId, reporterId }),
  });
};

// current news ta already save kora ache kina check
export const checkNewsSaved = async (
  newsId: string,
  token: string,
): Promise<ApiResponse<{ isSaved: boolean }>> => {
  return apiClientRaw<{ isSaved: boolean }>(`/saved-news/check/${newsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// logged-in user-er shob saved news list
export const getMySavedNews = async (
  token: string,
): Promise<ApiResponse<TSavedNews[]>> => {
  return apiClientRaw<TSavedNews[]>("/saved-news/my-saved", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};