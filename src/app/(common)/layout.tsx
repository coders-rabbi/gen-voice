import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";

const sans = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-bn-sans",
  display: "swap",
});

const serif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-bn-serif",
  display: "swap",
});

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      lang="bn"
      className={`${sans.className} ${serif.variable} container mx-auto min-h-screen`}
    >
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
