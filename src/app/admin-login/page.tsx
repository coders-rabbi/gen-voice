"use client";

import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";
import logojpg from "@/assets/logo/logo.jpg";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { adminLogin } from "@/services/actions/admin.login";
import { storeUserInfo } from "@/services/actions/auth.service";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type LoginPayload = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await adminLogin({
        email: data.email,
        password: data.password,
      });

      if (res.success) {
        storeUserInfo(res.data);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin login successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/dashboard");
      } else {
        setApiError(res.message || "Login failed");
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 md:h-[640px]">
        {/* Left panel */}
        <div className="h-full flex flex-col justify-start">
          <div className="h-full border-2 rounded-lg p-10 flex flex-col">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 mb-14">
              <Image src={logo} alt="gen voice logo" />
            </Link>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back!
            </h1>
            <p className="text-sm text-gray-400 mb-8">
              Welcome Back! Please, Enter Your Details
            </p>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label className="block text-sm text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2.5 bg-white">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 outline-none text-sm text-gray-900 placeholder:text-gray-300 bg-transparent"
                    {...register("email")}
                  />
                  <Mail size={16} className="text-blue-500" />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2.5 bg-white">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className="flex-1 outline-none text-sm text-gray-900 placeholder:text-gray-300 bg-transparent"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="text-blue-500"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {apiError && (
                <p className="text-xs text-red-500 mb-4">{apiError}</p>
              )}

              <div className="text-right mb-6">
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-medium tracking-wide transition-colors disabled:opacity-60"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>
            </form>

            <div className="flex-1 min-h-[24px]" />

            <p className="text-[11px] text-gray-400 text-center">
              © 2026{" "}
              <span className="font-semibold text-gray-500">GenVoice</span> |
              All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Right panel — same height as left, image cropped to fill */}
        <div className="hidden md:block relative h-full rounded-lg overflow-hidden">
          <Image
            src={logojpg}
            alt="bg"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
