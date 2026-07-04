import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto bg-[#F5F5F5] min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
