// src/components/dashboard/RouteGuard.tsx
"use client";

import { usePermission } from "@/context/PermissionContext";
import { TFeature } from "@/types/permissions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RouteGuard = ({
  feature,
  children,
}: {
  feature: TFeature;
  children: React.ReactNode;
}) => {
  const { isSuperAdmin, hasPermission, isChecking } = usePermission();
  const router = useRouter();

  const isAllowed = isSuperAdmin || hasPermission(feature);

  useEffect(() => {
    if (!isChecking && !isAllowed) {
      router.push("/dashboard"); // অথবা /unauthorized
    }
  }, [isChecking, isAllowed, router]);

  if (isChecking) return null;
  if (!isAllowed) return null;

  return <>{children}</>;
};

export default RouteGuard;
