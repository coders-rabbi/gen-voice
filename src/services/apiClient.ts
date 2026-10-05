import { authkey } from "@/constants/authkey";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://gen-voice-backend.onrender.com/api/v1";

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

// এই রুটগুলোতে ৪০১ পেলে রিফ্রেশ চেষ্টা হবে না
const SKIP_REFRESH = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/logout",
];

// একসাথে অনেক রিকোয়েস্ট ৪০১ পেলেও রিফ্রেশ কল হবে একবারই
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include", // ব্রাউজার রিফ্রেশ টোকেন কুকি পাঠাবে
        });
        if (!res.ok) return null;

        const json = await res.json();
        const newToken =
          typeof json.data === "string" ? json.data : json.data?.accessToken;
        if (!newToken) return null;

        localStorage.setItem(authkey, newToken);
        return newToken as string;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
};

const buildHeaders = (options?: RequestInit, newToken?: string) => {
  const headers = new Headers(options?.headers);

  // FormData (ফাইল আপলোড) হলে Content-Type ব্রাউজারকে বসাতে দাও
  if (!headers.has("Content-Type") && !(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  // রিট্রাইয়ের সময় পুরনো টোকেন বদলে নতুনটা বসবে
  if (newToken) headers.set("Authorization", `Bearer ${newToken}`);

  return headers;
};

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const json = await apiClientRaw<T>(endpoint, options);
  return json.data;
};

const PUBLIC_PATHS = [
  "/",
  "/news",
  "/login",
  "/register",
  "/categories",
  "/recent_news",
  "/popular_news",
];

const isPublicPath = (path: string) =>
  PUBLIC_PATHS.some((r) => path === r || (r !== "/" && path.startsWith(r)));

export const apiClientRaw = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;

  const send = (newToken?: string) =>
    fetch(url, {
      ...options,
      credentials: "include", // headers এর বাইরে
      headers: buildHeaders(options, newToken),
    });

  let response = await send();

  // শুধু আসল টোকেনসহ পাঠানো রিকোয়েস্ট ৪০১ পেলে রিফ্রেশ হবে
  // ("Bearer null" / "Bearer undefined" ধরা হবে না)
  const authHeader = new Headers(options?.headers).get("Authorization") || "";
  const hadAuth =
    authHeader.trim() !== "" && !/(null|undefined)$/i.test(authHeader.trim());

  // ---- ডিবাগ লগ (সমস্যা মিটলে মুছে দিন) ----
  if (response.status === 401 && typeof window !== "undefined") {
    console.log("401 from:", endpoint);
    console.log("Authorization:", authHeader);
    console.log("localStorage token:", localStorage.getItem(authkey));
    console.log("page:", window.location.pathname);
  }
  // -------------------------------------------

  if (
    response.status === 401 &&
    hadAuth &&
    !SKIP_REFRESH.includes(endpoint) &&
    typeof window !== "undefined"
  ) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      response = await send(newToken);
    } else {
      // রিফ্রেশ টোকেনও expire/invalid, তাই লগআউট
      localStorage.removeItem(authkey);
      console.log("REDIRECT check from endpoint:", endpoint);

      // শুধু প্রাইভেট পেজে থাকলে লগইনে পাঠান; পাবলিক পেজে গেস্ট হয়ে থাকুক
      if (!isPublicPath(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
  }

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
