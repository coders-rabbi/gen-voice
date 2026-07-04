import logo from "@/assets/logo/logo.png";
import img01 from "@/assets/login/bg.png";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const page = () => {
  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mb-6 md:mb-0">
        <Image
          src={logo}
          alt="Logo"
          className="w-32 md:w-auto h-auto object-contain"
        />
      </div>
      <div className="flex justify-center items-center">
        <div>
          <h3 className="text-xl font-semibold px-4">Sign In</h3>
          <form className="fieldset bg-base-200  rounded-box w-xs p-4">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input validator"
                placeholder="Email"
                required
              />
              <p className="validator-hint hidden">Required</p>
            </fieldset>

            <label className="fieldset">
              <span className="label">Password</span>
              <input
                type="password"
                className="input validator"
                placeholder="Password"
                required
              />
              <span className="validator-hint hidden">Required</span>
            </label>

            <button
              className="btn btn-primary bg-[#3385FF] border-0 rounded-xs mt-4"
              type="submit"
            >
              Login <FaArrowRight className="ml-2" />
            </button>
            <Link href="register"
              className="btn btn-neutral bg-black text-white mt-1"
              type="reset"
            >
              CREATE NEW ACCOUNT
            </Link>
          </form>
        </div>
        <div>
          <Image
            src={img01}
            alt="Background"
            className="w-full h-full object-cover hidden lg:block"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Link href="/register" className="link link-hover">
          Terms and conditions
        </Link>

        <Link href="/register" className="link link-hover flex items-center gap-1">
          <GoDotFill /> Privacy policy
        </Link>
      </div>
    </div>
  );
};

export default page;
