import { apiClient } from "../apiClient";
import { TUser } from "@/types/user.type";

export const getAllUser = async (): Promise<TUser[]> => {
  return apiClient<TUser[]>("/users", {
    next: {
      revalidate: 60,
    },
  });
};
