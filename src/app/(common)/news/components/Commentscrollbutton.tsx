"use client";

import { FaRegCommentDots } from "react-icons/fa6";

type CommentScrollButtonProps = {
  targetId?: string;
};

const CommentScrollButton = ({
  targetId = "comment-section",
}: CommentScrollButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
    >
      <FaRegCommentDots />
      Comment
    </button>
  );
};

export default CommentScrollButton;