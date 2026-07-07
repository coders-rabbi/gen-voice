import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import FooterVideoGallery from "./components/footerVideoGallery";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-0 gap-4 mt-12">
      <div className="md:col-span-9">
        <div className="grid md:grid-cols-2">
          <div>
            <Image
              src={logo}
              alt="gen voice"
              className="object-cover w-[220px] h-[50px]"
            />
            <p className="text-sm text-[#3E3232BF] mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque.
            </p>
            <div className="flex items-center gap-2 mb-2.5  mt-12">
              <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
              <h2 className="text-2xl text-[#3E3232] ">News Letter</h2>
            </div>
            <label className="input validator bg-[#EAF3FF] rounded-[10px]">
              <input
                type="email"
                placeholder="Write Your Email..."
                required
                className="text-black"
              />
              <svg
                className="h-[2em] opacity-50 text-[#0066ff]"
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2  ">
                  <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
                  <h2 className="text-xl text-[#3E3232] ">Category</h2>
                </div>
              </div>

              <div className="flex gap-3 items-center w-full mt-2">
                <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <hr className="w-full border-t border-[#3384FE33]" />
                  <hr className="w-full border-t border-[#3384FE33]" />
                </div>
              </div>
              <ul className="flex flex-col gap-2 text-[#3E3232] mt-2">
                <Link href="/">Calture</Link>
                <Link href="/">Fashion</Link>
                <Link href="/">Featured</Link>
                <Link href="/">Food</Link>
                <Link href="/">Healthy Link ving</Link>
                <Link href="/">Technology</Link>
              </ul>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2  ">
                  <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
                  <h2 className="text-xl text-[#3E3232] ">Follow Us On</h2>
                </div>
              </div>

              <div className="flex gap-3 items-center w-full mt-2">
                <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <hr className="w-full border-t border-[#3384FE33]" />
                  <hr className="w-full border-t border-[#3384FE33]" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 text-white rounded-xl bg-gradient-to-r from-[#F45C9F] to-[#FF7563] hover:opacity-90 transition-opacity"
                >
                  <FaInstagram />
                  Instagram
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-1.5 text-white rounded-xl bg-gradient-to-r from-[#2CA5E0] to-[#67C9F5] hover:opacity-90 transition-opacity"
                >
                  <FaTwitter />
                </Link>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2  ">
                  <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
                  <h2 className="text-xl text-[#3E3232] ">Quick Links</h2>
                </div>
              </div>

              <div className="flex gap-3 items-center w-full mt-2">
                <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <hr className="w-full border-t border-[#3384FE33]" />
                  <hr className="w-full border-t border-[#3384FE33]" />
                </div>
              </div>
              <ul className="flex flex-col gap-2 text-[#3E3232] mt-2">
                <Link href="/popular_news">Popular New</Link>
                <Link href="/recent_news">Recent News</Link>
                <Link href="/">Featured News</Link>
                <Link href="/">Most Viewed News</Link>
              </ul>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2  ">
                  <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
                  <h2 className="text-xl text-[#3E3232] ">Others Links</h2>
                </div>
              </div>

              <div className="flex gap-3 items-center w-full mt-2">
                <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <hr className="w-full border-t border-[#3384FE33]" />
                  <hr className="w-full border-t border-[#3384FE33]" />
                </div>
              </div>
              <ul className="flex flex-col gap-2 text-[#3E3232] mt-2">
                <Link href="/">Home</Link>
                <Link href="/about_us">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/writers">Writers</Link>
              </ul>
            </div>
          </div>
        </div>

        {/* copyrights section */}
        <div className="bg-[#3385FF] p-4 flex items-center justify-between rounded-[10px] mt-12">
          <p className="text-gray-300 text-xs">
            privacy policy | terms & conditions
          </p>
          <p className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} GenVoice | All rights reserved.
          </p>
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2  ">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Top Videos</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center w-full mt-2 mb-10">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>
        <FooterVideoGallery />
      </div>
    </div>
  );
};

export default Footer;
