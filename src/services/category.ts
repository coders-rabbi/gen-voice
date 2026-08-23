import { TCategory, TCreateCategoryPayload } from "@/types/category";
import { apiClient, apiClientRaw, ApiResponse } from "./apiClient";

export const createNewsCategory = async (
  payload: TCreateCategoryPayload,
): Promise<ApiResponse<TCategory>> => {
  return apiClientRaw<TCategory>("/categories/create_category", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getAllNewsCategories = async (): Promise<TCategory[]> => {
  return apiClient<TCategory[]>("/categories", {
    next: {
      revalidate: 60,
    },
  });
};

export const updateNewsCategory = async (
  categoryId: string,
  payload: Partial<TCategory>,
): Promise<ApiResponse<TCategory>> => {
  return apiClientRaw<TCategory>(`/categories/update_category/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

export const deleteNewsCategory = async (
  categoryId: string,
): Promise<ApiResponse<TCategory>> => {
  return apiClientRaw<TCategory>(`/categories/delete_category/${categoryId}`, {
    method: "PATCH",
  });
};
