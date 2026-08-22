"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type FeatureKey =
  | "categories"
  | "registeredUsers"
  | "allPosts"
  | "allPolls"
  | "usersAndRoll"
  | "websiteConfiguration"
  | "settings";

const initialPermissions: Record<FeatureKey, boolean> = {
  categories: true,
  registeredUsers: false,
  allPosts: false,
  allPolls: true,
  usersAndRoll: true,
  websiteConfiguration: false,
  settings: true,
};

const permissionColumns: { key: FeatureKey; label: string }[][] = [
  [
    { key: "categories", label: "Categories" },
    { key: "registeredUsers", label: "Registered Users" },
    { key: "allPosts", label: "All Posts" },
  ],
  [
    { key: "allPolls", label: "All Polls" },
    { key: "usersAndRoll", label: "Users & Roll" },
    { key: "websiteConfiguration", label: "Website Configuration" },
  ],
  [{ key: "settings", label: "Settings" }],
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

export default function CreateRoleForm() {
  const [roleName, setRoleName] = useState("Super Admin");
  const [sectionOpen, setSectionOpen] = useState(true);
  const [permissions, setPermissions] =
    useState<Record<FeatureKey, boolean>>(initialPermissions);

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
    console.log("Form reset");
  };

  const handleCreateRole = () => {
    const payload = {
      roleName,
      permissions,
    };
    console.log("Create Role payload:", payload);
  };

  return (
    <div className="w-full">
      {/* Role Name */}
      <div className="mb-8">
        <label
          htmlFor="roleName"
          className="block text-sm font-medium text-[#717680] mb-2"
        >
          Role Name<span className="text-[#FF383C]">*</span>
        </label>
        <input
          id="roleName"
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter role name"
          className="w-full max-w-sm rounded-lg border border-[#D5D7DA] px-4 py-2.5 text-[#181D27] placeholder:text-[#A4A7AE] focus:outline-none focus:ring-2 focus:ring-[#155EEF]/30 focus:border-[#155EEF]"
        />
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
          onClick={handleCreateRole}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#155EEF] py-3 text-white font-medium hover:bg-[#0E4FD1] transition-colors"
        >
          <FaPlus size={12} />
          Create Role
        </button>
      </div>
    </div>
  );
}
