"use client";

import { useEffect } from "react";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import RepoterSkeleton from "./components/reporterSkeleton";

const ReporterLayout = ({ children }: { children: React.ReactNode }) => {
  const { isChecking, isAuthenticated } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      router.push("/admin-login");
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RepoterSkeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // redirect হচ্ছে, ততক্ষণ কিছুই render করো না
  }

  return (
    <div className="container mx-auto min-h-screen">
      <Navbar />
      <div className="pt-24">{children}</div>
    </div>
  );
};

export default ReporterLayout;
