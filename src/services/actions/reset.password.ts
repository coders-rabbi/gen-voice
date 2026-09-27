import { apiClientRaw, ApiResponse } from "../apiClient";

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
  token: string,
): Promise<ApiResponse<string>> => {
  return apiClientRaw<string>("/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
