"use client";

import logo from "@/assets/logo/logo.svg";
import bg from "@/assets/signup/bg.png";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { useForm } from "react-hook-form";
import { createReporter } from "@/services/reporter/reporterService";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type SignupFormValues = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  facebook: string;
};

const page = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset, // eta already thakle ekhan theke use korben
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    const { email, password, ...reporterData } = data;

    const userData = { email, password };
    const payload = { userData, reporterData };
    try {
      setLoading(true);
      const res = await createReporter(payload);
      if (res.success) {
        reset(); // form clear
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "account create successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error || "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      <div className="md:col-span-8 p-6 md:p-10 flex flex-col justify-between">
        <div className="mb-6 md:mb-0">
          <Image src={logo} alt="Logo" className="w-32 h-auto object-contain" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <form className="fieldset w-md p-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name: First / Middle / Last */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  First Name
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("name.firstName", { required: true })}
                  />
                </div>
                {errors.name?.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    First name is required
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Middle Name
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("name.middleName")}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Last Name
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("name.lastName", { required: true })}
                  />
                </div>
                {errors.name?.lastName && (
                  <p className="text-xs text-red-500 mt-1">
                    Last name is required
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Email
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="email"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 text-sm"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Password
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="password"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 text-sm"
                  {...register("password", { required: true, minLength: 6 })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Gender / Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Gender
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <select
                    className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("gender")}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Date of Birth
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="date"
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("dateOfBirth")}
                  />
                </div>
              </div>
            </div>

            {/* Blood Group / Contact No */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Blood Group
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <select
                    className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("bloodGroup")}
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Contact No
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="+880"
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("contactNo", { required: true })}
                  />
                </div>
                {errors.contactNo && (
                  <p className="text-xs text-red-500 mt-1">
                    Contact number is required
                  </p>
                )}
              </div>
            </div>

            {/* Present Address */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Present Address
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="text"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                  {...register("presentAddress")}
                />
              </div>
            </div>

            {/* Permanent Address */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Permanent Address
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="text"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                  {...register("permanentAddress")}
                />
              </div>
            </div>

            {/* Designation / Facebook */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Designation
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("designation")}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Facebook
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="https://facebook.com/username"
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                    {...register("facebook")}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary bg-[#3385FF] border-0 rounded-xs mt-4"
              type="submit"
            >
              {isLoading ? "Creating..." : "SIGN UP"}
              {!isLoading && <FaArrowRight className="text-sm" />}
            </button>
            <Link
              href="/login"
              className="btn btn-neutral border-0 rounded-xs bg-black text-white mt-1"
            >
              BACK TO LOGIN
            </Link>
          </form>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/register" className="link link-hover">
            Terms and conditions
          </Link>

          <Link
            href="/register"
            className="link link-hover flex items-center gap-1"
          >
            <GoDotFill /> Privacy policy
          </Link>
        </div>
      </div>

      <div className="hidden md:block md:col-span-4 h-screen sticky top-0">
        <Image
          src={bg}
          alt="Background"
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default page;
