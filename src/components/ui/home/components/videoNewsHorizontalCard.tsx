import { TNews } from "@/types/news";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
interface VideoNewsProps {
  videoNews: TNews;
}

const VideoNewsHorizontalCard = ({ videoNews }: VideoNewsProps) => {
  return (
    <div className="md:flex gap-0.5">
      <Link href="/">
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold">
            {videoNews?.categoryId?.categoryName}
          </h5>
          <h3 className="text-[#183354] text-[10px] font-semibold mt-1.5">
            {videoNews?.title || "Using Instagram tawo promote your"}
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] mt-2.5">
            <CiCalendar />{" "}
            {videoNews?.publishAt?.slice(0, videoNews.publishAt.indexOf("T"))}
          </p>
        </div>
      </Link>
      <iframe
        src={videoNews?.featuredImageUrl}
        title="YouTube video player"
        style={{
          border: "none",
          width: "100px",
          height: "100px",
          flexShrink: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoNewsHorizontalCard;
