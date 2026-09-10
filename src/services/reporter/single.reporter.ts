import { apiClientRaw, ApiResponse } from "../apiClient";
import type { TReporter } from "@/types/reporter";

export const getSingleReporterUsingUserId = async (
  userId: string,
): Promise<ApiResponse<TReporter[]>> => {
  return apiClientRaw<TReporter[]>(`/reporters/user-id/${userId}`, {
    method: "GET",
  });
};
