import { IWebFooter, IWebFooterPayload } from "@/types/footer.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const createWebFooterInfo = async (
  token: string,
  payload: IWebFooterPayload,
): Promise<ApiResponse<IWebFooter>> => {
  return apiClientRaw<IWebFooter>("/web-footer/create-web-footer-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const getWebFooterInfo = (): Promise<ApiResponse<IWebFooter | null>> => {
  return apiClientRaw<IWebFooter | null>("/web-footer", {
    method: "GET",
  });
};

export const updateWebFooterInfo = async (
  token: string,
  payload: Partial<IWebFooterPayload>,
): Promise<ApiResponse<IWebFooter>> => {
  return apiClientRaw<IWebFooter>("/web-footer/update-web-footer-info", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
