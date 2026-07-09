import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto  min-h-screen">
      <Navbar />
      <div className="pt-32">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
