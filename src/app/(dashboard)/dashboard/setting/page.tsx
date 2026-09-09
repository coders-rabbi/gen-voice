"use client";

import PageTitle from "../../components/page-Title";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Image from "next/image";
import userImage from "@/assets/dashboard/user.jpg";
import { useForm } from "react-hook-form";
import { getUserInfo } from "@/services/actions/auth.service";
import { useSingleReporter } from "@/hooks/useSingleReporter";
import { updateAdminInfo } from "@/services/adminUser/admin.user";
import { getFromLocalStorage } from "../../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import Swal from "sweetalert2";

const TitleDetails = {
  title: "Website Configuration",
  subtitle: "Manage user roles and configure granular permissions for each.",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Website Configuration" },
  ],
};

type TAdminForm = {
  adminName: string;
  email: string;
};

const Page = () => {
  const token = getFromLocalStorage(authkey);
  const userInfo = getUserInfo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TAdminForm>({
    defaultValues: {
      adminName: "",
      email: userInfo?.email ?? "",
    },
  });

  const onSubmit = async (payload: TAdminForm) => {
    try {
      const response = await updateAdminInfo(
        userInfo?._id as string,
        token as string,
        { adminName: payload.adminName },
      );
      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your Information update successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "failed",
        text: "Your information failed to update",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleReset = () => {
    reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder={userInfo?.adminName}
              {...register("adminName")}
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
              value={userInfo?.role}
              readOnly
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
              placeholder="Write here..."
              {...register("email")}
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
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-[#005CE8] text-white rounded-lg py-3 font-medium hover:bg-[#0049ba] transition disabled:opacity-60"
            >
              <span className="bg-white/20 rounded p-1 flex items-center justify-center">
                <FaPlus size={10} />
              </span>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
