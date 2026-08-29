// services/auth.ts
import { apiClientRaw, ApiResponse } from "../apiClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export const adminLogin = async (
  payload: LoginPayload,
): Promise<ApiResponse<string>> => {
  return apiClientRaw<string>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
