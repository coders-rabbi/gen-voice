"use client";

import PageTitle from "@/app/(dashboard)/components/page-Title";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { getFromLocalStorage } from "../../../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { adminUserCreate } from "@/services/adminUser/admin.user";
import Swal from "sweetalert2";

type TFormData = {
  adminName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const TitleDetails = {
  title: "Add User",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Users & Roll", href: "/user-roll" },
    { label: "User Management", hfer: "/dashboard/user-roll/user-management" },
    { label: "Add User" },
  ],
};

const CreateUserForm = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      adminName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    const { confirmPassword, ...payload } = formData;
    setLoading(true);

    try {
      if (!token) {
        throw new Error("Your are not authorized!");
      }
      const response = await adminUserCreate(token as string, payload);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Created",
          text: `"${payload?.role}" acount successfully created.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      handleReset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `${payload?.role} account faild to create`,
      });
    } finally {
      setLoading(false);
    }
  };

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
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
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

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**********"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
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
                Creating...
              </>
            ) : (
              <>
                <FaPlus />
                Create
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
