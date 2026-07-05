import blurImage from "@/assets/home/blur.png";
import Image from "next/image";
import { CalendarWeekNumbers } from "./components/calendar";
import Compition from "./components/compition";

const SportsWidget = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-lg mt-12">
      <Image
        src={blurImage}
        alt="gen voice"
        className="w-full min-h-[400px] max-h-full  object-cover"
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  flex flex-col sm:flex-row items-center justify-center gap-3 
                  w-[95%] max-w-max
                  scale-85 xs:scale-90 sm:scale-100 transition-transform"
      >
        <CalendarWeekNumbers />
        <CalendarWeekNumbers />
        <Compition />
      </div>
    </div>
  );
};

export default SportsWidget;
