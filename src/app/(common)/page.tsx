import EntertainmentNews from "@/components/ui/home/entertainmentNews";
import Herosection from "@/components/ui/home/herosection";
import MusicNews from "@/components/ui/home/musicNews";
import PopularCategory from "@/components/ui/home/popularCategory";
import Sports from "@/components/ui/home/sports";
import SportsWidget from "@/components/ui/home/sportsWidget";
import TechNews from "@/components/ui/home/techNews";
import ToReporters from "@/components/ui/home/topReporters";
import VideoNews from "@/components/ui/home/videoNews";
import { getHomePageCategoryNews } from "@/services/news/news.service";
// import WeatherWidget from "@/components/ui/home/weatherWidget";

const Home = async () => {
  const homeNews = await getHomePageCategoryNews();

  return (
    <div className="px-4">
      <Herosection news={homeNews?.Technology ?? []}/>
      <PopularCategory />
      <Sports news={homeNews?.Sports ?? []} />
      <VideoNews homeNews={homeNews} />
      <SportsWidget />
      <TechNews news={homeNews?.Technology ?? []} />
      <MusicNews news={homeNews?.Music ?? []} />
      <ToReporters />
      <EntertainmentNews news={homeNews?.Entertaiment ?? []} />
    </div>
  );
};

export default Home;
