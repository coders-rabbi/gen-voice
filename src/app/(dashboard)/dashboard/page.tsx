import { PostGrowthChart } from "../components/charts/growthChart";
import { TrafficSources } from "../components/charts/trafficSource";
import { VisitorsChart } from "../components/charts/visitors";
import { YearlyPostsChart } from "../components/charts/yearlyGrowthChart";
import OverviewCard from "../components/overview-card-info";
import PageTitle from "../components/page-Title";

const TitleDetails = {
  title: "Overview",
  subtitle: "Latest news, updates and stories from our team",
  breadcrumbs: [{ label: "Home", href: "/" }],
};

const page = () => {
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <OverviewCard />
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
