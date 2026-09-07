import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TFeature, TPermission } from "@/types/permissions";
import { getFromLocalStorage } from "../../utils/localStorage";
import {
  getRoles,
  getSingleRole,
  getSingleRoleByName,
} from "@/services/role/role.service";
import { getUserInfo } from "@/services/actions/auth.service";
import { authkey } from "@/constants/authkey";

type TPermissionContext = {
  isChecking: boolean;
  isSuperAdmin: boolean;
  permissions: TPermission[];
  hasPermission: (feature: TFeature) => boolean;
};

const PermissionContext = createContext<TPermissionContext | undefined>(
  undefined,
);

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [permissions, setPermissions] = useState<TPermission[]>([]);

  const token = getFromLocalStorage(authkey);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const adminInfo = getUserInfo();
        if (!adminInfo) {
          setIsChecking(false);
          return;
        }
        if (adminInfo.role === "super_admin") {
          setIsSuperAdmin(true);
          setIsChecking(false);
          return;
        }

        const res = await getSingleRoleByName(adminInfo.role as string);
        if (res?.data?.permissions) {
          setPermissions(res.data.permissions);
        }
      } catch (err) {
        console.error("Permission fetch failed:", err);
      } finally {
        setIsChecking(false);
      }
    };

    fetchPermissions();
  }, []);

  const hasPermission = (feature: TFeature) => {
    if (isSuperAdmin) return true;
    const found = permissions.find((p) => p.feature === feature);
    return found?.isGranted ?? false;
  };

  return (
    <PermissionContext.Provider
      value={{ isChecking, isSuperAdmin, permissions, hasPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within PermissionProvider");
  }
  return context;
};
