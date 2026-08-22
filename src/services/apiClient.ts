const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (process.env.NEXT_PHASE === "phase-production-build") {
        return [] as T;
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return [] as T;
    }

    throw error;
  }
};