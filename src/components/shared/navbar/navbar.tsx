"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";
import {
  getUserInfo,
  isLoggedIn,
  removeUser,
} from "@/services/actions/auth.service";
import userImg from "@/assets/home/man.jpg";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AuthPayload } from "../../../../utils/jwt";

const Navbar = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<AuthPayload | undefined | null>(
    null,
  );
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setUserInfo(getUserInfo());
    setUserLoggedIn(Boolean(isLoggedIn()));
  }, []);

  const handleSingOut = () => {
    removeUser();
    setUserInfo(null);
    setUserLoggedIn(false);
    router.refresh();
    router.push("/login");
  };
  const DesktopNavItems = (
    <>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/" className="block px-4 py-2">
          Home
        </Link>
      </li>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/recent_news" className="block px-4 py-2">
          Recent News
        </Link>
      </li>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/popular_news" className="block px-4 py-2">
          Popular News
        </Link>
      </li>
      {/* ডেক্সটপে DaisyUI এর হোভার-ভিত্তিক ড্রপডাউন সাবমেনু */}
      <li className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-1 text-black hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded px-4 py-2"
        >
          Categories
          <svg
            className="h-3 w-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.1 1.02l-4.24 4.53a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 bg-white text-black w-40 z-50 shadow-md rounded-box"
        >
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/food" className="block px-4 py-2">
              Food
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/politics" className="block px-4 py-2">
              Politics
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/business" className="block px-4 py-2">
              Business
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/sport" className="block px-4 py-2">
              Sport
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/music" className="block px-4 py-2">
              Music
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/technology" className="block px-4 py-2">
              Techonolgy
            </Link>
          </li>
        </ul>
      </li>
    </>
  );

  const MobileNavItems = (
    <>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/" className="block px-4 py-2">
          Home
        </Link>
      </li>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/recent_news" className="block px-4 py-2">
          Recent News
        </Link>
      </li>
      <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all text-black">
        <Link href="/popular_news" className="block px-4 py-2">
          Popular News
        </Link>
      </li>
      <li className="text-black">
        <span className="font-semibold px-4 py-2">Categories</span>
        <ul className="p-2 bg-white text-black w-40 z-50 shadow-md">
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/food" className="block px-4 py-2">
              Food
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/politics" className="block px-4 py-2">
              Politics
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/business" className="block px-4 py-2">
              Business
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/sport" className="block px-4 py-2">
              Sport
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/music" className="block px-4 py-2">
              Music
            </Link>
          </li>
          <li className="border border-transparent hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded transition-all">
            <Link href="/categories/technology" className="block px-4 py-2">
              Techonolgy
            </Link>
          </li>
        </ul>
      </li>
    </>
  );

  return (
    <div className="container flex justify-center">
      <div className="navbar lg:w-fit bg-white px-4 z-50 rounded-xl gap-20 fixed">
        <div className="-mt-2">
          <Link href="/">
            <Image
              src={logo}
              alt="Gennoice Logo"
              style={{
                width: "150px",
                height: "50px",
              }}
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{DesktopNavItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          <label className="input hidden sm:inline-flex outline-none bg-[#EAF3FF] border-0 rounded-xl w-[60%]">
            <svg
              className="h-[1em] opacity-50 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search Anything" />
          </label>
          {userLoggedIn ? (
            <>
              <div className="flex gap-2 items-center bg-[#3385FF] px-2 py-1 rounded-md">
                <Image
                  src={userImg}
                  alt="user logo"
                  height={20}
                  width={30}
                  className="rounded-2xl"
                />
                <IoMdExit
                  className="text-2xl text-white hover:text-red-400 cursor-pointer"
                  onClick={handleSingOut}
                  title="Logout"
                />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="btn btn-sm  text-center bg-[#3385FF] hover:bg-[#3385FF] border-0 rounded-xl text-white w-fit"
            >
              Sign In
            </Link>
          )}

          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-gray-100"
            >
              {MobileNavItems}
              <div className="pt-2 mt-2 border-t border-gray-100 sm:hidden">
                <label className="input input-sm flex items-center gap-2 outline-none bg-[#EAF3FF] border-0 rounded-xl px-3 w-full text-black mb-2">
                  <svg
                    className="h-4 w-4 opacity-50 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    placeholder="Search Anything"
                    className="bg-transparent outline-none w-full placeholder-gray-500 text-sm"
                  />
                </label>
                {userLoggedIn ? (
                  <>
                    <div>
                      <Image
                        src={userImg}
                        alt="user logo"
                        height={40}
                        width={40}
                        className="rounded-2xl"
                      />
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="btn btn-sm w-full text-center bg-[#3385FF] hover:bg-[#3385FF] border-0 rounded-xl text-white"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
