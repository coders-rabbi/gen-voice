import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

const VideoNewsHorizontalCard = () => {
  return (
    <div className="md:flex gap-0.5">
      <Link href="/">
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold">POLITICS</h5>
          <h3 className="text-[#183354] text-sm font-semibold mt-1.5">
            Using Instagram tawo promote your
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] mt-2.5">
            <CiCalendar /> 27 Jun, 2026
          </p>
        </div>
      </Link>
      <iframe
        src="https://www.youtube.com/embed/bmrN8Cw1zX4?si=1BcxPULozXKg230s"
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
