"use client";

import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";

type ShareButtonProps = {
  url: string; // full absolute URL of the news details page
  title: string;
};

const ShareButton = ({ url, title }: ShareButtonProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // outside click hole dropdown close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShareClick = async () => {
    // mobile/supported browser hole native share sheet use hobe
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancel korle kichu korar dorkar nai
        return;
      }
    }
    setOpen((prev) => !prev);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-[#1877F2]" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaXTwitter className="text-black" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-[#25D366]" />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-[#0A66C2]" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access na thakle silently ignore
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleShareClick}
        className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5 cursor-pointer"
      >
        <BsSend />
        Share
      </button>

      {open && (
        <div className="absolute z-20 top-full mt-2 right-0 bg-white shadow-lg rounded-[10px] border border-[#E5E7EB] py-2 w-48">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#3E3232] hover:bg-[#F5F5F5] transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[#3E3232] hover:bg-[#F5F5F5] transition-colors"
          >
            <FaLink />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;