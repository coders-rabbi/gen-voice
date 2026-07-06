import React from "react";
import { MdAddReaction } from "react-icons/md";

const PostSatisfactionReaction = () => {
  return (
    <div className="bg-[#F5F5F5] py-2 px-2 w-fit h-fit rounded-[12px]">
      <p className="text-xs text-[#3E3232] mb-2 text-center">August 2026</p>
      <MdAddReaction className="text-3xl text-[#FC5C65] mx-auto" />
      <p className="text-xs text-[#3E3232] mt-2 text-center">20 Post</p>
    </div>
  );
};

export default PostSatisfactionReaction;
