import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const ReporterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto  min-h-screen">
      <Navbar />
      <div className="pt-24">{children}</div>
    </div>
  );
};

export default ReporterLayout;
