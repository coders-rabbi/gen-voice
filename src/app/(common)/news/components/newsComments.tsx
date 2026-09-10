import Image from "next/image";
import { FaCalendar } from "react-icons/fa6";
import manImg from "@/assets/home/man.jpg";
import { getCommentsByNewsId } from "@/services/comments";
import { TComments } from "@/types/comment.type";

interface commentsProps {
  comments: TComments[];
}

const NewsComments = async ({ comments }: commentsProps) => {
  return (
    <div className="my-12">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
        <h2 className="text-xl text-[#3E3232]">Comments</h2>
      </div>
      <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-[#3E3232BF]">
          এখনো কোনো কমেন্ট নেই, প্রথম কমেন্ট করুন।
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment, commentIndex) => {
            const replies = Array.isArray(comment.replay) ? comment.replay : [];

            return (
              <div
                key={comment?._id ?? `comment-${commentIndex}`}
                className="p-4 bg-[#EAF3FF] rounded-xs"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center mb-3">
                    <Image
                      src={manImg}
                      alt={comment.name || "Comment author"}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4>{comment.name || "Anonymous"}</h4>
                      <p className="flex gap-2 items-center text-[#3E3232BF]">
                        <FaCalendar />
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-ghost bg-[#3E32320D] rounded-xl">
                    Reply
                  </button>
                </div>
                <p className="text-xs">
                  {comment.comment || "No comment text."}
                </p>

                {replies.length > 0 && (
                  <div className="ml-16 mt-3 flex flex-col gap-2">
                    {replies.map((r, idx) => (
                      <div
                        key={
                          r?._id ??
                          `${comment?._id ?? commentIndex}-reply-${idx}`
                        }
                        className="p-3 bg-white rounded-lg"
                      >
                        <h5 className="text-sm font-medium">
                          {r.name || "Anonymous"}
                        </h5>
                        <p className="text-xs text-[#3E3232BF]">
                          {r.comment || "No reply text."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewsComments;
