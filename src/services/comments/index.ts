import { TCommentPyaload, TComments } from "@/types/comment.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const createComment = async (
  payload: TCommentPyaload,
): Promise<ApiResponse<TComments>> => {
  return apiClientRaw<TComments>("/comments/create-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const getCommentsByNewsId = async (
  newsId: string,
): Promise<ApiResponse<TComments[]>> => {
  return apiClientRaw<TComments[]>(`/comments/${newsId}`, {
    method: "GET",
  });
};
