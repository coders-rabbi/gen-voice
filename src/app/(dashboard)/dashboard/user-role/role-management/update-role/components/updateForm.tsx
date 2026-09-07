"use client";

import { authkey } from "@/constants/authkey";
import {
  createRole,
  getSingleRole,
  updateRole,
} from "@/services/role/role.service";
import { TPermission, TRolePayload } from "@/types/role";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import useSWR from "swr";
import RoleFormSkeleton from "./updateFormSkeleton";

type FeatureKey =
  | "categories"
  | "register-user"
  | "all-news"
  | "all-poll"
  | "user-role"
  | "web-config"
  | "setting";

// Available role name options for the select field.
// Update this list as needed to match the roles you want to support.
const roleNameOptions = ["Admin", "Editor", "Moderator"];

const initialPermissions: Record<FeatureKey, boolean> = {
  categories: true,
  "register-user": false,
  "all-news": false,
  "all-poll": true,
  "user-role": true,
  "web-config": false,
  setting: true,
};

const permissionColumns: { key: FeatureKey; label: string }[][] = [
  [
    { key: "categories", label: "Categories" },
    { key: "register-user", label: "Registered Users" },
    { key: "all-news", label: "All News" },
  ],
  [
    { key: "all-poll", label: "All Polls" },
    { key: "user-role", label: "Users & Roll" },
    { key: "web-config", label: "Website Configuration" },
  ],
  [{ key: "setting", label: "Settings" }],
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
          checked ? "bg-white border-[#155EEF]" : "bg-white border-[#D5D7DA]"
        }`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 h-4.5 w-4.5 rounded-full transition-all ${
            checked ? "right-1 bg-[#155EEF]" : "left-1 bg-[#D5D7DA]"
          }`}
          style={{ height: "18px", width: "18px" }}
        />
      </button>
      <span
        className={`text-[15px] ${
          checked ? "text-[#181D27] font-medium" : "text-[#A4A7AE]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default function UpdateRoleForm() {
  const [roleName, setRoleName] = useState("");
  const [sectionOpen, setSectionOpen] = useState(true);
  const [permissions, setPermissions] =
    useState<Record<FeatureKey, boolean>>(initialPermissions);
  const token = localStorage.getItem(authkey);

  const roleId = useParams();

  const {
    data: roleData,
    error,
    isLoading,
    mutate,
  } = useSWR(roleId?.id ? [roleId.id, token] : null, ([id, token]) =>
    getSingleRole(id as string, token as string),
  );

  useEffect(() => {
    if (roleData?.data?.permissions) {
      const permissionsArray = roleData.data.permissions as TPermission[];
      const permissionsRecord = permissionsArray.reduce(
        (acc, curr) => {
          acc[curr.feature as FeatureKey] = curr.isGranted;
          return acc;
        },
        {} as Record<FeatureKey, boolean>,
      );
      setPermissions(permissionsRecord);
      setRoleName(roleData?.data?.roleName);
    }
  }, [roleData]);

  if (isLoading) return <RoleFormSkeleton />;
  if (error) return <p>Error loading data</p>;

  const togglePermission = (key: FeatureKey) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setRoleName("");
    setPermissions(
      Object.fromEntries(
        Object.keys(initialPermissions).map((key) => [key, false]),
      ) as Record<FeatureKey, boolean>,
    );
  };

  const handleUpdateRole = async () => {
    if (!roleName) {
      Swal.fire({
        icon: "warning",
        title: "Role name required",
        text: "Please select a role name before submitting.",
      });
      return;
    }
    if (
      !permissions ||
      Object.values(permissions).filter(Boolean).length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Permissions required",
        text: "Please select at least one permission before submitting.",
      });
      return;
    }

    // Record<FeatureKey, boolean> -> TPermission[] e convert kora
    const permissionsArray: TPermission[] = Object.entries(permissions).map(
      ([feature, isGranted]) => ({
        feature: feature as FeatureKey,
        isGranted,
      }),
    );

    const payload: TRolePayload = {
      roleName,
      permissions: permissionsArray,
    };

    try {
      const result = await updateRole(
        roleId.id as string,
        payload,
        token as string,
      );

      mutate(result, { revalidate: false });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `"${roleName}" role successfully updated.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };
  return (
    <div className="w-full">
      <div className="mb-8">
        <label
          htmlFor="roleName"
          className="block text-sm font-medium text-[#717680] mb-2"
        >
          Role Name<span className="text-[#FF383C]">*</span>
        </label>
        <div className="relative w-full max-w-sm">
          <select
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#D5D7DA] px-4 py-2.5 pr-10 text-[#181D27] focus:outline-none focus:ring-2 focus:ring-[#155EEF]/30 focus:border-[#155EEF] bg-white"
          >
            <option value="" disabled>
              Select a role
            </option>
            {roleNameOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717680]"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Feature Permission */}
      <div>
        <h3 className="text-lg font-semibold text-[#181D27] mb-4">
          Feature Permission
        </h3>

        <button
          type="button"
          onClick={() => setSectionOpen((prev) => !prev)}
          className="flex items-center gap-2 mb-3"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded border border-[#155EEF] text-[#155EEF]">
            {sectionOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
          </span>
          <span className="font-semibold text-[#181D27]">Users & Roll</span>
        </button>

        {sectionOpen && (
          <div className="border-t border-[#E9EAEB] pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
              {permissionColumns.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {column.map(({ key, label }) => (
                    <Toggle
                      key={key}
                      checked={permissions[key]}
                      onChange={() => togglePermission(key)}
                      label={label}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E9EAEB]">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#FDA29B] py-3 text-[#FF383C] font-medium hover:bg-[#FEF3F2] transition-colors"
        >
          <FaPlus size={12} />
          Reset
        </button>
        <button
          type="button"
          onClick={handleUpdateRole}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#155EEF] py-3 text-white font-medium hover:bg-[#0E4FD1] transition-colors"
        >
          <FaPlus size={12} />
          Update Role
        </button>
      </div>
    </div>
  );
}
