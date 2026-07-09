import Image from "next/image";
import Link from "next/link";
import { BsSend } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import {
  FaCalendar,
  FaComment,
  FaFile,
  FaRegCommentDots,
} from "react-icons/fa6";
import news from "@/assets/news/news.jpg";
import img from "@/assets/news/img2.jpg";
import Advertisement from "@/components/advertisement";
import WritesCard from "@/components/ui/home/components/writesCard";
import manImg from "@/assets/home/man.jpg";
import { getAllBlog } from "@/services/postService";

interface PageProps {
  params: Promise<{
    newsDetails: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const { newsDetails } = await params;

  const postId = Number(newsDetails);

  const data = await getAllBlog();
  const post = data.filter((post) => post.postId === postId);
  console.log(post);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 px-4 gap-4">
      <div className="md:col-span-8">
        <h1 className="text-xl md:text-3xl text-black">{post?.[0]?.title}</h1>
        <Image
          src={post?.[0]?.mainImage}
          alt={post?.[0]?.title}
          width={1200}
          height={800}
          className="w-full h-[60vh] object-cover rounded-[10px] my-5"
        />
        <div className="flex flex-col md:flex-row  gap-3 justify-between flex-wrap">
          <div className="flex gap-2 md:gap-5">
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaCalendar />
              {post?.[0]?.postDate}
            </p>
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaComment />
              comments : {post?.[0]?.totalCommentsCount}
            </p>
            <p className="text-[#3E3232BF] text-sm flex items-center gap-1">
              <FaFile />
              Category : {post?.[0].category}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <BsSend />
              Share
            </Link>
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <CiBookmark />
              Share
            </Link>
            <Link
              href=""
              className="px-3 py-1 bg-[#F5F5F5] flex items-center w-fit rounded-[8px] gap-1.5"
            >
              <FaRegCommentDots />
              Share
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <h4 className="text-[16px] text-[#3E3232] font-semibold">
            {post?.[0]?.subtitles?.[0]}
          </h4>
          <p className="mt-4 text-[#3E3232] text-[16px]">
            {post?.[0]?.subtitles}
          </p>
          {post?.[0]?.subtitles}
          <Image
            src={post?.[0]?.mainImage}
            alt={post?.[0]?.title}
            width={800}
            height={500}
            className="w-full md:w-2/3 h-[50vh] mx-auto object-cover rounded-[10px] my-12"
          />
          <h4 className="text-[16px] text-[#3E3232] font-semibold">
            {post?.[0]?.subtitles?.[1]}
          </h4>
          <p className="mt-4 text-[#3E3232] text-[16px]">
            {/* {post?.[0]?.subtitles} */}
          </p>
          <p className="bg-[#EAF3FF] text-[#181A2A] p-8 rounded-[12px] text-xs border-l-3 border-[#3385FF] mt-2">
            “ Want to leave your stress on the water? The resort has kayaks,
            paddleboards, or the low-key pedal boats. Snorkeling equipment is
            available as well, so you can experience the ever-changing undersea
            environment. ”
          </p>
          <Advertisement />
          <h4 className="text-xl text-[#3E3232] font-semibold">
            Not how long, but how well you have lived is the main thing.
          </h4>
          <p className="mt-4 text-[#3E3232] text-[16px]">
            {post?.[0]?.postDetails}
          </p>
          <div className="flex items-center">
            <div className="flex gap-3 items-center w-full mt-2.5">
              <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-[#3384FE33]" />
                <hr className="w-full border-t border-[#3384FE33]" />
              </div>
            </div>
            <div className="flex gap-3  w-full mt-2.5">
              <div className="w-8 h-2 rounded-tl-2xl rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
              <div className="flex flex-col gap-0.5 flex-1">
                <hr className="w-full border-t border-[#3384FE33]" />
                <hr className="w-full border-t border-[#3384FE33]" />
              </div>
            </div>
            <div className="w-8 h-2 rounded-tl-2xl bg-[#3385FF] flex-shrink-0"></div>
          </div>
        </div>

        {/* reader comment section */}
        <div className="my-12">
          <div className="flex items-center gap-2 mb-2.5  ">
            <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
            <h2 className="text-xl text-[#3E3232] ">Comments</h2>
          </div>
          <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
            <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
            <div className="flex flex-col gap-0.5 flex-1">
              <hr className="w-full border-t border-[#3384FE33]" />
              <hr className="w-full border-t border-[#3384FE33]" />
            </div>
          </div>

          <div className="p-4 bg-[#EAF3FF] rounded-xs">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center mb-3">
                <Image
                  src={manImg}
                  alt="gen voice"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4>Rabbi Mia</h4>
                  <p className="flex gap-2 items-center text-[#3E3232BF]">
                    {" "}
                    <FaCalendar /> 2022 04 July
                  </p>
                </div>
              </div>
              <button className="btn btn-ghost bg-[#3E32320D] rounded-xl">
                Reply
              </button>
            </div>
            <p className="text-xs">
              An island (or isle) is an isolated piece of habitat that is
              surrounded by a dramatically different habitat, such as water.
              Very small islands such as emergent land features on atolls can be
              called islets, skerries, cays or keys.
            </p>
          </div>

          {/* comment form */}
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
            <form action="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div>
                    <legend className="fieldset-legend text-black">Name</legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <legend className="fieldset-legend text-black">
                      Website
                    </legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <legend className="fieldset-legend text-black">
                      Email
                    </legend>
                    <input
                      type="text"
                      className="input border border-[#E6E6E6] rounded-[8px] bg-[#F5F5F5] w-full"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <h4 className="mb-2">Comment</h4>
                  <textarea
                    className="textarea h-full rounded-[8px] border w-full bg-[#F5F5F5] text-[#3E3232BF]"
                    placeholder="Type..."
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3 py-2 mt-2 bg-[#3385FF] hover:bg-[#2570E0] text-white font-medium rounded-xl text-sm shadow-sm transition-all active:scale-95 flex gap-1 items-center w-fit"
                    >
                      <FaComment />
                      Send Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:col-span-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Writer Profile</h2>
        </div>
        <div className="flex gap-3 items-center w-full mb-2">
          <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
          <div className="flex flex-col gap-0.5 flex-1">
            <hr className="w-full border-t border-[#3384FE33]" />
            <hr className="w-full border-t border-[#3384FE33]" />
          </div>
        </div>
        <WritesCard />
        <div className="flex items-center gap-2 mb-2 mt-10">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Tags</h2>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
        <div className="mt-5 flex gap-4 flex-wrap">
          {post?.[0]?.tags?.map((item) => (
            <Link
              href=""
              className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
            >
              {item}
            </Link>
          ))}
          {/* <Link
            href=""
            className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
          >
            Travel
          </Link>
          <Link
            href=""
            className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
          >
            Travel
          </Link>
          <Link
            href=""
            className="px-4 py-2.5 rounded-xl text-[#3E3232BF] bg-[#F5F5F5]"
          >
            Travel
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default page;
