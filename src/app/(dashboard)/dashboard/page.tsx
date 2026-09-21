import { getAllUser } from "@/services/users/user.service";
import { PostGrowthChart } from "../components/charts/growthChart";
import { TrafficSources } from "../components/charts/trafficSource";
import { VisitorsChart } from "../components/charts/visitors";
import { YearlyPostsChart } from "../components/charts/yearlyGrowthChart";
import OverviewCard from "../components/overview-card-info";
import PageTitle from "../components/page-Title";
import {
  getAllNews,
  getHomePageCategoryNews,
  getNewsTotalView,
} from "@/services/news/news.service";
import { getFromLocalStorage } from "../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";
import { getPolls } from "@/services/poll";
import { getTrafficStats } from "@/services/traffic";

const TitleDetails = {
  title: "Overview",
  subtitle: "Latest news, updates and stories from our team",
  breadcrumbs: [{ label: "Home", href: "/" }],
};
const page = async () => {
  const token = getFromLocalStorage(authkey);
  const userDataFromDB = await getAllUser(token as string);
  const newsData = await getAllNews();
  const newsTotalViews = await getNewsTotalView();
  const totalViews = newsTotalViews?.data;
  const res = await getPolls();
  const polls = res?.data;

  const trafficRes =await getTrafficStats()
  const trafficData = trafficRes?.data;
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <OverviewCard
        userData={userDataFromDB}
        newsData={newsData}
        totalViews={trafficData?.totalVisits as number}
        polls={polls}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <TrafficSources traffic={trafficData}/>
        <PostGrowthChart/>
        <YearlyPostsChart newsData={newsData}/>
        <VisitorsChart traffic={trafficData}/>
      </div>
    </div>
  );
};

export default page;
