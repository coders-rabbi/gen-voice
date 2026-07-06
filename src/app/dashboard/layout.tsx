import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto  min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default dashboardLayout;
