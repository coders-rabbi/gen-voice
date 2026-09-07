import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";
import { TUser } from "@/types/user.type";

export const getAllUser = async (token: string): Promise<TUser[]> => {
  return apiClient<TUser[]>("/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserStatus = async (
  token: string,
  id: string,
  status: string,
): Promise<ApiResponse<TUser>> => {
  return apiClientRaw<TUser>(`/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
};
