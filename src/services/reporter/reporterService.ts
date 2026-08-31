import { TReporter, TReporterQueryParams } from "@/types/reporter";
import { apiClient } from "../apiClient";

// export const getAllReporter = async (): Promise<TReporter[]> => {
//   return apiClient<TReporter[]>("/reporters", {
//     next: {
//       revalidate: 30,
//     },
//   });
// };

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
