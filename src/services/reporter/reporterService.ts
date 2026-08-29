import { TReporter } from "@/types/reporter";
import { apiClient } from "../apiClient";

export const getAllReporter = async (): Promise<TReporter[]> => {
  return apiClient<TReporter[]>("/reporters", {
    next: {
      revalidate: 30,
    },
  });
};
