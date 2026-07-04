import logo from "@/assets/logo/logo.png";
import bg from "@/assets/signup/bg.png";
import Image from "next/image";
import Link from "next/link";
import { FaCamera } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      <div className="md:col-span-8 p-6 md:p-10 flex flex-col justify-between">
        <div className="mb-6 md:mb-0">
          <Image
            src={logo}
            alt="Logo"
            className="w-32 md:w-auto h-auto object-contain"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <form className="fieldset  w-md p-4">
            {/* Full Name */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Full Name
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="text"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xstext-sm"
                />
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
                />
              </div>
            </div>
            {/* Address */}
            <div className="relative mt-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                Address
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-xs  text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                <input
                  type="text"
                  placeholder="Write here..."
                  className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Country
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <select className="select select-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm">
                    <option>Bangladesh</option>
                    <option>India</option>
                    <option>USA</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Mobile Number
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <input
                    type="text"
                    placeholder="+880"
                    className="input input-bordered w-full bg-white text-gray-800 focus:outline-none border-gray-300 rounded-xs text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              {/* Upload NID Front */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Upload NID Front
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs p-3 text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <span>Open Camera</span>
                  <FaCamera className="text-gray-500 text-base" />
                </div>
              </div>

              {/* Upload NID Back */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 z-10">
                  Upload NID Back
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-xs p-3 text-sm text-gray-400 bg-white cursor-pointer hover:border-gray-400">
                  <span>Open Camera</span>
                  <FaCamera className="text-gray-500 text-base" />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary bg-[#3385FF] border-0 rounded-xs mt-4"
              type="submit"
            >
              SIGN UP
            </button>
            <button
              className="btn btn-neutral border-0 rounded-xs bg-black text-white mt-1"
              type="reset"
            >
              BACK TO LOGIN
            </button>
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
