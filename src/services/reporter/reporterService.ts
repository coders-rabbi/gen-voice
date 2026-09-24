import { TReporter, TReporterQueryParams } from "@/types/reporter";
import { apiClient, apiClientRaw, ApiResponse } from "../apiClient";

export type TReporterMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TReporterListResponse = {
  meta: TReporterMeta;
  result: TReporter[];
};

export const createReporter = async (payload: any) => {
  return apiClientRaw<TReporter>("/users/create-reporter", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
export const getAllReporter = async (
  query: TReporterQueryParams = {},
): Promise<TReporterListResponse> => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString ? `/reporters?${queryString}` : "/reporters";

  return apiClient<TReporterListResponse>(url, {
    cache: "no-cache",
  });
};

export const getSingleReporterByReporterId = async (
  repId: string,
): Promise<ApiResponse<TReporter>> => {
  return apiClientRaw<TReporter>(`/reporters/${repId}`, {
    method: "GET",
  });
};

export const getSingleReporterByUserId = async (
  repId: string,
): Promise<ApiResponse<TReporter>> => {
  return apiClientRaw<TReporter>(`/reporters/user-id/${repId}`, {
    method: "GET",
  });
};

export const updateReporterById = async (
  repId: string,
  payload: Partial<TReporter>,
): Promise<ApiResponse<TReporter>> => {
  return apiClientRaw<TReporter>(`/reporters/${repId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
