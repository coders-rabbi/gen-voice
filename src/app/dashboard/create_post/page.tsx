import Image from "next/image";
import banner from "@/assets/writer/writerBanner.jpg";
import React from "react";
import ProfileInfo from "@/components/dashboard/profileInfo";

const page = () => {
  return (
    <div>
      <Image
        src={banner}
        alt="gen voice"
        className="w-full h-40 rounded-xl object-center"
      />

      {/* profile info */}
      <div>
        <ProfileInfo />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default page;
