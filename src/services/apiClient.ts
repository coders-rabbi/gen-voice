const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

// শুধু data অংশ রিটার্ন করে
export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const json = await apiClientRaw<T>(endpoint, options);
  return json.data;
};

// পুরো response object রিটার্ন করে
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

  // response ok হোক বা না হোক, আগে body parse করার চেষ্টা করুন
  // কারণ backend error হলেও JSON body তে { message, success: false, ... } পাঠাতে পারে
  let json: ApiResponse<T> | null = null;
  try {
    json = await response.json();
  } catch {
    // body খালি বা JSON না হলে ignore করুন
  }

  if (!response.ok) {
    // ✅ backend এর নিজের error message থাকলে সেটা throw করুন, না থাকলে fallback
    const message =
      json?.message || `API Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (!json) {
    throw new Error("Invalid response from server");
  }

  return json;
};
