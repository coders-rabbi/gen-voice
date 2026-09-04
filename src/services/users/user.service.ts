import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";
import { TUser } from "@/types/user.type";

export const getAllUser = async (): Promise<TUser[]> => {
  return apiClient<TUser[]>("/users", {
    next: {
      revalidate: 60,
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
