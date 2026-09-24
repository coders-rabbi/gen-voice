"use client";

import React, { useEffect, useState } from "react";
import { TReactionCounts, TReactionType } from "@/types/reaction.type";
import {
  getMyReaction,
  getReactionCounts,
  toggleReaction,
} from "@/services/reaction";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import Swal from "sweetalert2";

interface newsIdProps {
  newsId: string;
}

const reactionConfig: {
  type: TReactionType;
  emoji: string;
  label: string;
  color: string;
}[] = [
  {
    type: "like",
    emoji: "👍",
    label: "Like",
    color: "#2078f4",
  },
  {
    type: "love",
    emoji: "❤️",
    label: "Love",
    color: "#f33e58",
  },
  {
    type: "wow",
    emoji: "😲",
    label: "Wow",
    color: "#f7b125",
  },
  {
    type: "sad",
    emoji: "😢",
    label: "Sad",
    color: "#8a8a8a",
  },
  {
    type: "angry",
    emoji: "😡",
    label: "Angry",
    color: "#e9710f",
  },
];

const emptyCounts: TReactionCounts = {
  like: 0,
  love: 0,
  wow: 0,
  sad: 0,
  angry: 0,
};

const Reaction = ({ newsId }: newsIdProps) => {
  const [counts, setCounts] = useState<TReactionCounts>(emptyCounts);
  const [myReaction, setMyReaction] = useState<TReactionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = getFromLocalStorage(authkey);

  useEffect(() => {
    const fetchInitialData = async () => {
      const countsRes = await getReactionCounts(newsId);
      if (countsRes?.data) {
        setCounts(countsRes.data);
      }

      try {
        const myReactionRes = await getMyReaction(newsId);
        setMyReaction(myReactionRes?.data ?? null);
      } catch {
        setMyReaction(null);
      }
    };

    fetchInitialData();
  }, [newsId, token]);

  const handleReaction = async (type: TReactionType) => {
    if (isLoading) return;
    setIsLoading(true);

    const prevCounts = { ...counts };
    const prevReaction = myReaction;

    if (myReaction === type) {
      setCounts((prev) => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));
      setMyReaction(null);
    } else if (myReaction) {
      setCounts((prev) => ({
        ...prev,
        [myReaction]: Math.max(prev[myReaction] - 1, 0),
        [type]: prev[type] + 1,
      }));
      setMyReaction(type);
    } else {
      setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      setMyReaction(type);
    }

    try {
      await toggleReaction(token as string, newsId, { type });
    } catch (error) {
      setCounts(prevCounts);
      setMyReaction(prevReaction);
      Swal.fire({
        icon: "error",
        title: "অক্ষম",
        text: "রিয়েকশন দিতে হতে লগইন করতে হবে",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <p>Rate: </p>
      <div className="flex items-center gap-4">
        {reactionConfig.map(({ type, emoji, label, color }) => (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            disabled={isLoading}
            title={label}
            className="flex flex-col items-center gap-0.5 disabled:opacity-60 transition-transform hover:scale-125"
          >
            <span
              className={`text-2xl transition-all ${
                myReaction === type ? "" : "grayscale opacity-40"
              }`}
            >
              {emoji}
            </span>
            <span
              className="text-xs"
              style={{ color: myReaction === type ? color : "#9ca3af" }}
            >
              {counts[type]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reaction;
