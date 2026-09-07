
import { getAllUser } from "@/services/users/user.service";
import { PostGrowthChart } from "../components/charts/growthChart";
import { TrafficSources } from "../components/charts/trafficSource";
import { VisitorsChart } from "../components/charts/visitors";
import { YearlyPostsChart } from "../components/charts/yearlyGrowthChart";
import OverviewCard from "../components/overview-card-info";
import PageTitle from "../components/page-Title";
import { getAllNews } from "@/services/news/news.service";
import { getFromLocalStorage } from "../../../../utils/localStorage";
import { authkey } from "@/constants/authkey";

const TitleDetails = {
  title: "Overview",
  subtitle: "Latest news, updates and stories from our team",
  breadcrumbs: [{ label: "Home", href: "/" }],
};

const page = async () => {
  const token = getFromLocalStorage(authkey)
  const userDataFromDB = await getAllUser(token as string);
  const newsData = await getAllNews();

  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <OverviewCard userData={userDataFromDB} newsData={newsData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <TrafficSources />
        <PostGrowthChart />
        <YearlyPostsChart />
        <VisitorsChart />
      </div>
    </div>
  );
};

export default page;
