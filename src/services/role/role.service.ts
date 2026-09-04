import { apiClientRaw, ApiResponse } from "../apiClient";
import { TRole, TRolePayload } from "@/types/role";

export const createRole = async (
  payload: TRolePayload,
  token: string,
): Promise<ApiResponse<TRole>> => {
  return apiClientRaw<TRole>("/roles/create-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const getRoles = async (
  token: string,
): Promise<ApiResponse<TRole[]>> => {
  return apiClientRaw<TRole[]>("/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleRole = async (
  roleId: string,
  token: string,
): Promise<ApiResponse<TRole>> => {
  return apiClientRaw<TRole>(`/roles/${roleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRole = async (
  roleId: string,
  payload: TRolePayload,
  token: string,
): Promise<ApiResponse<TRole>> => {
  return apiClientRaw<TRole>(`/roles/${roleId}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const deleteRole = async (
  roleId: string,
  token: string,
): Promise<ApiResponse<TRole>> => {
  return apiClientRaw<TRole>(`/roles/${roleId}/delete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
