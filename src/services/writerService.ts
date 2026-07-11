import { IWriter } from "@/types/wrtiers";
import { apiClient } from "./apiClient";

export const getAllWriters = async (): Promise<IWriter[]> => {
  return apiClient<IWriter[]>("/writers", {
    next: {
      revalidate: 30,
    },
  });
};
