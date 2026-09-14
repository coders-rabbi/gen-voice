"use client";

import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { getFromLocalStorage } from "../../../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import {
  getSingleAdminUser,
  updateAdminInfo,
} from "@/services/adminUser/admin.user";
import Swal from "sweetalert2";
import useSWR from "swr";

type TFormData = {
  adminName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const TitleDetails = {
  title: "Update User",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll", href: "/user-roll" },
    { label: "User Management", hfer: "/dashboard/user-roll/user-management" },
    { label: "Update User" },
  ],
};

const UpdateUserForm = () => {
  const [formData, setFormData] = useState<TFormData>({
    adminName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = getFromLocalStorage(authkey);

  const params = useParams();
  const userId = params?.id as string;

  const {
    data: userData,
    error: fetchError,
    isLoading: isFetching,
    mutate,
  } = useSWR(userId && token ? [userId, token] : null, ([id, token]) =>
    getSingleAdminUser(id, token as string),
  );

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        adminName: userData.adminName ?? "",
        email: userData.email ?? "",
        role: userData.role ?? "",
        password: "",
        confirmPassword: "",
      }));
    }
  }, [userData]);

  console.log(userData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if (userData) {
      setFormData({
        adminName: userData?.adminName ?? "",
        email: userData?.email ?? "",
        role: userData?.role ?? "",
        password: "",
        confirmPassword: "",
      });
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // password change চাইলে (optional) - fill korle match hote hobe
    if (
      (formData.password || formData.confirmPassword) &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Password and Confirm Password do not match");
      return;
    }

    const { confirmPassword, password, ...rest } = formData;
    const payload = password ? { ...rest, password } : rest;

    setLoading(true);

    try {
      if (!token) {
        throw new Error("Your are not authorized!");
      }
      const response = await updateAdminInfo(userId, token as string, payload);
      if (response?.success) {
        // mutate();
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: `"${payload?.role}" account successfully updated.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${formData?.role} account failed to update`,
      });
    } finally {
      setLoading(false);
    }
  };

  // if (fetchError) {
  //   console.error("fetchError:", fetchError);
  //   return <p>Error loading user: {fetchError?.message}</p>;
  // }

  // if (isFetching) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <Link
          href="/dashboard/user-role/user-management"
          className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Name
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Write here..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Write here..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-gray-50 cursor-not-allowed"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 cursor-pointer text-gray-700"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">admin</option>
                <option value="editor">editor</option>
                <option value="modarator">modarator</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div> */}
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            // onClick={handleReset}
            className="flex-1 bg-white border border-gray-200 rounded-xl py-3 font-medium text-red-500 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaPlus className="rotate-45" />
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#005CE8] text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                Updating...
              </>
            ) : (
              <>
                <FaPlus />
                Update
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
