import { TAdmin, TAdminPayload } from "@/types/admin.type";
import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";

export const adminUserCreate = async (
  token: string,
  payload: TAdminPayload,
): Promise<ApiResponse<TAdminPayload>> => {
  return apiClientRaw<TAdminPayload>(`/admin/create-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const getAllAdmin = async (token: string): Promise<TAdmin[]> => {
  return apiClient<TAdmin[]>("/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};