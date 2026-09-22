"use client";

import { checkNewsSaved, toggleSaveNews } from "@/services/savedNews";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { getFromLocalStorage } from "../../utils/localStorage";
import { authkey } from "@/constants/authkey";

type SaveButtonProps = {
  newsId: string;
  reporterId?: string;
};

const SaveButton = ({ newsId, reporterId }: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const token = getFromLocalStorage(authkey);

  // page load-e check kore nicche news ta age theke save kora kina
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await checkNewsSaved(newsId, token as string);
        if (res?.success) {
          setIsSaved(res.data.isSaved);
        }
      } catch {
        // logged out user hole ba error hole silently ignore, default unsaved dekhabe
      } finally {
        setIsChecking(false);
      }
    };
    fetchStatus();
  }, [newsId]);

  const handleToggle = async () => {
    if (isLoading) return;
    const previousState = isSaved;
    setIsSaved(!previousState);
    setIsLoading(true);

    console.log(newsId, reporterId, token);
    try {
      const res = await toggleSaveNews(newsId, reporterId, token as string);
      if (!res?.success) {
        throw new Error(res?.message || "Something went wrong");
      }
      setIsSaved(res.data.saved);
    } catch (err) {
      // fail korle purano state e ferot
      setIsSaved(previousState);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update saved news. Please login and try again.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isChecking || isLoading}
      className="px-3 py-1 bg-[#F5F5F5] text-2xl flex items-center w-fit rounded-[4px] gap-1.5 disabled:opacity-60"
    >
      {isSaved ? <FaBookmark className="text-[#2563EB]" /> : <CiBookmark />}
    </button>
  );
};

export default SaveButton;
