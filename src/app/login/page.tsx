"use client";
import logo from "@/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/services/actions/user.login";
import { storeUserInfo } from "@/services/actions/auth.service";
import Swal from "sweetalert2";

type FormValues = {
  email: string;
  password: string;
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setApiError(null);

    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (res.success) {
        storeUserInfo(res.data);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/reporter");
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
    <div className="relative min-h-screen overflow-hidden bg-[#F7F8FA]">
      {/* Ambient accent glow — signature background element */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#3385FF]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#3385FF]/10 blur-3xl"
      />

      {/* Logo */}
      <div className="relative z-10 p-6 md:p-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-32 md:w-auto h-auto object-contain"
        />
      </div>

      {/* Centered card */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-16 pt-4 md:pt-8">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-[#0F172A]">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Sign in to continue to your account
            </p>
          </div>

          <form
            className="rounded-2xl border border-[#E5E8EE] bg-white p-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] sm:p-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition focus:border-[#3385FF] focus:ring-2 focus:ring-[#3385FF]/20"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-1">
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition focus:border-[#3385FF] focus:ring-2 focus:ring-[#3385FF]/20"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {apiError && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {apiError}
              </p>
            )}

            <button
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3385FF] py-2.5 font-medium text-white transition hover:bg-[#2872e6] disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <FaArrowRight className="text-sm" />}
            </button>

            <Link
              href="register"
              className="mt-2.5 flex w-full items-center justify-center rounded-lg border border-[#0F172A] bg-white py-2.5 font-medium text-[#0F172A] transition hover:bg-[#0F172A] hover:text-white"
            >
              Create new account
            </Link>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[#64748B]">
            <Link href="/register" className="hover:text-[#0F172A]">
              Terms and conditions
            </Link>
            <span className="flex items-center gap-1 hover:text-[#0F172A]">
              <GoDotFill className="text-xs" />
              <Link href="/register">Privacy policy</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
