import React from "react";
import manImage from "@/assets/home/man2.jpg";
import Image from "next/image";

const ProfileInfo = () => {
  return (
    <div>
      <div className="flex gap-2.5 items-center">
        <Image
          src={manImage}
          alt="gen voice"
          className="w-20 h-20 object-cover rounded-[12px]"
        />
        <h2 className="text-[16px] font-medium">Louis Hoebregts</h2>
      </div>
    </div>
  );
};

export default ProfileInfo;
