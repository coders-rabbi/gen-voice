import { apiClientRaw, ApiResponse } from "../apiClient";

export type TTrafficStats = {
  totalVisits: number;
  registeredVisits: number;
  guestVisits: number;
  bySource: Record<string, number>; // এটা নিশ্চিত করো
};

export const trackVisit = async (
  path: string,
  token: string | null,
): Promise<ApiResponse<unknown>> => {
  return apiClientRaw(`/traffic/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      path, // 👈 passed parameter ব্যবহার করো
      referrer: document.referrer || "direct",
    }),
  });
};

export const getTrafficStats = async (): Promise<
  ApiResponse<TTrafficStats>
> => {
  return apiClientRaw<TTrafficStats>(`/traffic/stats`, {
    method: "GET",
  });
};
