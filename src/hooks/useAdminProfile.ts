// src/hooks/useAdminProfile.ts
"use client";

import useSWR from "swr";
import { getUserInfo } from "@/services/actions/auth.service"; // path তোমার প্রজেক্ট অনুযায়ী ঠিক করে নাও
import { authkey } from "@/constants/authkey";
import { getSingleAdminUser } from "@/services/adminUser/admin.user";
import { TAdmin } from "@/types/admin.type";
import { getFromLocalStorage } from "../../utils/localStorage";

export const adminProfileKey = (id?: string) =>
  id ? (["admin-profile", id] as const) : null;

export const useAdminProfile = () => {
  const decodedData = getUserInfo();
  const token = getFromLocalStorage(authkey);
  const id = decodedData?._id as string | undefined;

  const { data, error, isLoading, mutate } = useSWR<TAdmin>(
    token ? adminProfileKey(id) : null,
    ([, adminId]: readonly [string, string]) =>
      getSingleAdminUser(adminId, token as string),
  );

  return { adminData: data, error, isLoading, mutate, adminId: id };
};