"use client";

import React, { useEffect, useState } from "react";
import {
  BsEmojiExpressionlessFill,
  BsEmojiGrin,
  BsEmojiHeartEyesFill,
  BsFillEmojiKissFill,
} from "react-icons/bs";
import { FaAngry } from "react-icons/fa";
import { TReactionCounts, TReactionType } from "@/types/reaction.type";
import {
  getMyReaction,
  getReactionCounts,
  toggleReaction,
} from "@/services/reaction";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

interface newsIdProps {
  newsId: string;
}

const reactionConfig: {
  type: TReactionType;
  icon: React.ElementType;
  activeColor: string;
  inactiveColor: string;
}[] = [
  {
    type: "angry",
    icon: FaAngry,
    activeColor: "text-red-500",
    inactiveColor: "text-gray-300",
  },
  {
    type: "sad",
    icon: BsEmojiExpressionlessFill,
    activeColor: "text-gray-500",
    inactiveColor: "text-gray-300",
  },
  {
    type: "like",
    icon: BsEmojiGrin,
    activeColor: "text-yellow-400",
    inactiveColor: "text-gray-300",
  },
  {
    type: "love",
    icon: BsEmojiHeartEyesFill,
    activeColor: "text-pink-400",
    inactiveColor: "text-gray-300",
  },
  {
    type: "wow",
    icon: BsFillEmojiKissFill,
    activeColor: "text-pink-500",
    inactiveColor: "text-gray-300",
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

    // Optimistic update
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
      // ব্যর্থ হলে আগের অবস্থায় ফিরিয়ে নেওয়া
      setCounts(prevCounts);
      setMyReaction(prevReaction);
      console.error("Reaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <p>Rate: </p>
      <div className="flex items-center gap-4">
        {reactionConfig.map(
          ({ type, icon: Icon, activeColor, inactiveColor }) => (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              disabled={isLoading}
              className="flex flex-col items-center gap-0.5 disabled:opacity-60"
            >
              <Icon
                className={`text-xl ${
                  myReaction === type ? activeColor : inactiveColor
                }`}
              />
              <span className="text-xs text-gray-500">{counts[type]}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Reaction;
