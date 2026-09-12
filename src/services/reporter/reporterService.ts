import { TReporter, TReporterQueryParams } from "@/types/reporter";
import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";

export const createReporter = async (payload: any) => {
  return apiClientRaw<TReporter>("/users/create-reporter", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getAllReporter = async (
  query: TReporterQueryParams = {},
): Promise<TReporter[]> => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `/reporters?${queryString}` : "/reporters";

  return apiClient<TReporter[]>(url, {
    cache: "no-cache",
  });
};

export const getSingleReporterUsingUserId = async (
  userId: string,
): Promise<ApiResponse<TReporter>> => {
  return apiClientRaw<TReporter>(`/reporters/user-id/${userId}`, {
    method: "GET",
  });
};

export const getSingleReporterByReporterId = async (
  repId: string,
): Promise<ApiResponse<TReporter>> => {
  return apiClientRaw<TReporter>(`/reporters/${repId}`, {
    method: "GET",
  });
};
