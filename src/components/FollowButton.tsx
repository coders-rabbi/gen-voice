"use client";

import { useState } from "react";
import useSWR from "swr";
import { Loader2, UserPlus, UserCheck } from "lucide-react";
import {
  checkIsFollowing,
  followReporter,
  unfollowReporter,
  getFollowerCount,
} from "@/services/follow";
import Swal from "sweetalert2";

interface FollowButtonProps {
  reporterId: string;
  token: string | null;
}

const FollowButton = ({ reporterId, token }: FollowButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: followStatus, mutate: mutateStatus } = useSWR(
    token ? ["is-following", reporterId, token] : null,
    () => checkIsFollowing(reporterId, token as string),
  );

  const { data: followerCount, mutate: mutateCount } = useSWR(
    ["follower-count", reporterId],
    () => getFollowerCount(reporterId),
  );

  const isFollowing = followStatus?.data?.isFollowing ?? false;
  const count = followerCount?.data?.count ?? 0;

  const handleToggleFollow = async () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "লগইন করুন",
        text: "ফলো করতে হলে লগইন করতে হবে",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = isFollowing
        ? await unfollowReporter(reporterId, token as string)
        : await followReporter(reporterId, token as string);

      if (!res.success) {
        throw new Error(res?.message || "Something went wrong");
      }

      mutateStatus();
      mutateCount();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ",
        text: "ফলো/আনফলো করা যায়নি",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggleFollow}
        disabled={isSubmitting}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
          isFollowing
            ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <UserCheck className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {isFollowing ? "Following" : "Follow"}
      </button>
      <span className="text-sm text-gray-500">{count} followers</span>
    </div>
  );
};

export default FollowButton;
