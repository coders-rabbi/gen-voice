"use client";

import useSWR from "swr";
import { getUserInfo } from "@/services/actions/auth.service";
import { authkey } from "@/constants/authkey";
import { getSingleReporterByUserId } from "@/services/reporter/reporterService";
import { TReporter } from "@/types/reporter";
import { getFromLocalStorage } from "../../utils/localStorage";

export const userProfileKey = (id?: string) =>
  id ? (["user-profile", id] as const) : null;

export const useUserProfile = () => {
  const userInfo = getUserInfo();
  const token = getFromLocalStorage(authkey);
  const id = userInfo?._id as string | undefined;

  const { data, error, isLoading, mutate } = useSWR<TReporter>(
    token ? userProfileKey(id) : null,
    async ([, userId]: readonly [string, string]) => {
      const res = await getSingleReporterByUserId(userId);
      return res.data;
    },
  );

  return { userData: data, error, isLoading, mutate, userId: id };
};
