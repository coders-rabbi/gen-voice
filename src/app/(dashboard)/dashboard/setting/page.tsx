"use client";

import PageTitle from "../../components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Image from "next/image";
import userImage from "@/assets/dashboard/user.jpg";
import { useState } from "react";

const TitleDetails = {
  title: "Website Configuration",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Website Configuration" },
  ],
};

const initialFormState = {
  name: "Raisul R.",
  role: "Super Admin",
  email: "raisulr@gmail.com",
};

const Page = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    console.log("Form Reset");
  };

  return (
    <div>
      <div className="lg:flex justify-between items-center">
        <PageTitle TitleDetails={TitleDetails} />
        <div className="flex gap-1.5 mt-5 lg:mt-0">
          <Link
            href="/dashboard"
            className="bg-[#F0F6FF] text-[#005CE8] border px-4 py-1 flex items-center gap-2 rounded-2xl border-[#005CE8] w-fit "
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>
      </div>

      <div className="mt-10 border rounded-2xl p-5">
        <Image
          src={userImage}
          alt="user image"
          width={100}
          height={100}
          className="rounded-full object-cover w-[100px] h-[100px]"
        />

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Write here..."
              className="border border-gray-200 p-3 rounded-lg outline-0 focus:border-[#005CE8] placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-5">
            <label htmlFor="role" className="text-sm text-gray-700">
              Role
            </label>
            <input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Write here..."
              className="border border-gray-200 p-3 rounded-lg outline-0 focus:border-[#005CE8] placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-1.5 mt-5">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Write here..."
              className="border border-gray-200 p-3 rounded-lg outline-0 focus:border-[#005CE8] placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 border border-red-300 text-red-500 rounded-lg py-3 font-medium hover:bg-red-50 transition"
            >
              <span className="bg-red-500 text-white rounded p-1 flex items-center justify-center">
                <FaPlus size={10} />
              </span>
              Reset
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#005CE8] text-white rounded-lg py-3 font-medium hover:bg-[#0049ba] transition"
            >
              <span className="bg-white/20 rounded p-1 flex items-center justify-center">
                <FaPlus size={10} />
              </span>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
