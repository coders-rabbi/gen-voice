import { useState, useEffect } from "react";
import type { TReporter } from "@/types/reporter";
import { getSingleReporterUsingUserId } from "@/services/reporter/single.reporter";

interface UseSingleReporterResult {
  data: TReporter | null;
  isLoading: boolean;
  error: string | null;
}

export const useSingleReporter = (userId: string): UseSingleReporterResult => {
  const [data, setData] = useState<TReporter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchReporter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getSingleReporterUsingUserId(userId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReporter();
  }, [userId]);

  return { data, isLoading, error };
};
