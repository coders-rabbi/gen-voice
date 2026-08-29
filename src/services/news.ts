import { THomePageNews, TNews, TNewsPayload } from "@/types/news";
import { apiClient, apiClientRaw, ApiResponse } from "./apiClient";

export const getAllNews = async (): Promise<TNews[]> => {
  return apiClient<TNews[]>("/news", {
    next: {
      revalidate: 60,
    },
  });
};
export const getAllVideoNews = async (): Promise<TNews[]> => {
  return apiClient<TNews[]>("/news/video-news", {
    next: {
      revalidate: 60,
    },
  });
};

export const getHomePageCategoryNews = async (): Promise<THomePageNews> => {
  return apiClient<THomePageNews>("/news/homecategory", {
    next: {
      revalidate: 60,
    },
  });
};

const HARDCODED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvZGVyc3JhYmJpQGdtYWlsLmNvbSIsInJvbGUiOiJyZXBvcnRlciIsImlzRGVsZXRlZCI6ZmFsc2UsImlhdCI6MTc4Nzk0MDIwMiwiZXhwIjoxNzg4MDI2NjAyfQ.kc0vxbf0XWJqck7uR7mi3ngS7h_bhdcTYJqeLIf92UU";

export const createNews = async (
  payload: TNewsPayload,
  token: string,
): Promise<ApiResponse<TNews>> => {
  return apiClientRaw<TNews>("/news/create_news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HARDCODED_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
};
