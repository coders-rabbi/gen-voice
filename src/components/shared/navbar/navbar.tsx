import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";

const Navber = () => {
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
      {/* ডেক্সটপে DaisyUI এর অনুভূমিক ড্রপডাউন সাবমেনু */}
      <li>
        <details>
          <summary className="text-black hover:bg-[#3385ff7d] hover:border-[#3385FF] rounded">
            Categories
          </summary>
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
        </details>
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
          <Link
            href="/"
            className="btn bg-[#3385FF] hover:bg-[#3385FF] hidden sm:inline-flex items-center p-4 gap-2 border-0 rounded-[8px] text-white font-medium transition-all"
          >
            <span className="text-[16px] capitalize">Sign In</span>
          </Link>

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
                <Link
                  href="/"
                  className="btn btn-sm w-full text-center bg-[#3385FF] hover:bg-[#3385FF] border-0 rounded-xl text-white"
                >
                  Sign In
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
