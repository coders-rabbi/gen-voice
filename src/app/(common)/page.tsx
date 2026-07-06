import EntertainmentNews from "@/components/ui/home/entertainmentNews";
import Herosection from "@/components/ui/home/herosection";
import MusicNews from "@/components/ui/home/musicNews";
import PopularCategory from "@/components/ui/home/popularCategory";
import Sports from "@/components/ui/home/sports";
import SportsWidget from "@/components/ui/home/sportsWidget";
import TechNews from "@/components/ui/home/techNews";
import TopWrite from "@/components/ui/home/topWrite";
import VideoNews from "@/components/ui/home/videoNews";
import WeatherWidget from "@/components/ui/home/weatherWidget";
import React from "react";

const Home = () => {
  return (
    <div className="px-4">
      <Herosection />
      <PopularCategory />
      <Sports />
      <VideoNews />
      <SportsWidget />
      <TechNews />
      <MusicNews />
      <WeatherWidget />
      <TopWrite />
      <EntertainmentNews />
    </div>
  );
};

export default Home;
