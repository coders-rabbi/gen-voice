import { IWriter } from "@/types/wrtiers";
import { apiClient } from "./apiClient";

export const getAllWriers = async (): Promise<IWriter[]> => {
  return apiClient<IWriter[]>("/writers", {
    next: {
      revalidate: 30,
    },
  });
};
