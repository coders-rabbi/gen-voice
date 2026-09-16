import { TSiteContact, TSiteContactPayload } from "@/types/site-contact";
import { apiClientRaw, ApiResponse } from "../apiClient";

export const createSiteContact = async (payload: TSiteContactPayload) => {
  return apiClientRaw<TSiteContact>("/web-contact/create-web-contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getSiteContact = async (
): Promise<ApiResponse<TSiteContact>> => {
  return apiClientRaw<TSiteContact>("/web-contact", {
    method: "GET",
  });
};

export const updateSiteContact = async (
  payload: Partial<TSiteContact>,
): Promise<ApiResponse<TSiteContact>> => {
  return apiClientRaw<TSiteContact>("/web-contact/update-web-contact", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
