import Herosection from "@/components/ui/home/herosection";
import PopularCategory from "@/components/ui/home/popularCategory";
import Sports from "@/components/ui/home/sports";
import VideoNews from "@/components/ui/home/videoNews";
import React from "react";

const Home = () => {
  return (
    <div className="px-4">
      <Herosection />
      <PopularCategory />
      <Sports />
      <VideoNews />
    </div>
  );
};

export default Home;
