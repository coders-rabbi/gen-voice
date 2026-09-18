import { IAbout, IAboutPayload } from "@/types/about.type";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const createWebAboutInfo = async (
  payload: IAboutPayload,
): Promise<ApiResponse<IAbout>> => {
  return apiClientRaw<IAbout>("/web-about-info/create-web-about", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const getWebAboutInfo = (
): Promise<ApiResponse<IAbout>> => {
  return apiClientRaw<IAbout>("/web-about-info", {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer $}`,
    // },
  });
};
