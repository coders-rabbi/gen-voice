import { apiClientRaw, ApiResponse } from "../apiClient";

export const forgatePassword = async (
  email: string,
): Promise<ApiResponse<string>> => {
  return apiClientRaw<string>("/auth/forgate-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
