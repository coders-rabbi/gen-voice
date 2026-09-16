// utils/calculateRating.ts

export type TReactionCounts = {
  like: number;
  love: number;
  wow: number;
  sad: number;
  angry: number;
};

const REACTION_WEIGHTS: Record<keyof TReactionCounts, number> = {
  love: 5,
  wow: 4,
  like: 3,
  sad: 2,
  angry: 1,
};

export const calculateRating = (counts: TReactionCounts): number => {
  const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);

  if (totalCount === 0) return 0; // কোনো reaction না থাকলে 0

  const weightedSum = (Object.keys(counts) as (keyof TReactionCounts)[]).reduce(
    (sum, key) => sum + counts[key] * REACTION_WEIGHTS[key],
    0,
  );

  const rating = weightedSum / totalCount;

  return Math.round(rating * 10) / 10; // এক দশমিক পর্যন্ত round (যেমন 4.3)
};
