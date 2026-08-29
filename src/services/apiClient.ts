const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const json = await apiClientRaw<T>(endpoint, options);
  return json.data;
};

export const apiClientRaw = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  let json: ApiResponse<T> | null = null;
  try {
    json = await response.json();
  } catch {}

  if (!response.ok) {
    const message =
      json?.message || `API Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (!json) {
    throw new Error("Invalid response from server");
  }

  return json;
};
