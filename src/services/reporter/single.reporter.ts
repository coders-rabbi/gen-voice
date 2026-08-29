import { apiClient } from "../apiClient";
import type { TReporter } from "@/types/reporter";

export const getSingleReporterUsingUserId = async (
  userId: string,
): Promise<TReporter> => {
  return apiClient<TReporter>(`/reporters/user-id/${userId}`);
};
