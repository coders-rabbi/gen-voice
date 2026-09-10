"use client";
import { FaComment } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TCommentPyaload } from "@/types/comment.type";
import { createCommentAction } from "@/services/actions/comment";

interface newsIdProps {
  newsId: string;
}

const CommentForm = ({ newsId }: newsIdProps) => {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCommentPyaload>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<TCommentPyaload> = async (data) => {
    const commentData = {
      ...data,
      newsId,
    };

    try {
      setLoading(true);
      const res = await createCommentAction(commentData, pathname);
      if (res.success) {
        Swal.fire({
          title: "Thanks for your comment",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      reset();
    } catch (err) {
      Swal.fire({
        title: "Can't added your comment",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5  mt-12.5">
        <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
        <h2 className="text-xl text-[#3E3232] ">Write Comments</h2>
      </div>
      <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div>
              <legend className="fieldset-legend text-black">Name</legend>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                placeholder=""
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <legend className="fieldset-legend text-black">Email</legend>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                placeholder=""
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <h4 className="mb-2">Comment</h4>
            <textarea
              {...register("comment", { required: "Comment is required" })}
              className="textarea h-full rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
              placeholder="Type..."
            />
            {errors.comment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.comment.message}
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 mt-2 bg-[#3385FF] hover:bg-[#2570E0] disabled:bg-[#3385FF]/60 disabled:cursor-not-allowed text-white font-medium rounded-xl text-sm shadow-sm transition-all active:scale-95 flex gap-1 items-center w-fit"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaComment />
                    Send Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
