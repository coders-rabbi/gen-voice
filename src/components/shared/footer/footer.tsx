import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const Footer = () => {
  return (
    <div className="grid md:grid-cols-4">
      <div>
        <Image
          src={logo}
          alt="gen voice"
          className="object-cover w-[220px] h-[50px]"
        />
        <p className="text-sm text-[#3E3232BF] mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
          purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
          rhoncus aenean vel elit scelerisque.
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
            className="text-[#3385FF]"
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
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>
    </div>
  );
};

export default Footer;
