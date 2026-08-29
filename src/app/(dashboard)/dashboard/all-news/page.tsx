import { getAllNews } from "@/services/news/news.service";
import PageTitle from "../../components/page-Title";
import NewsTable from "./components/newsTable";
import TabsClient from "./components/tabsClient";

const TitleDetails = {
  title: "All Posts",
  subtitle: "Review, approve, and manage news articles across the platform.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Posts" }],
};

const page = async () => {
  const newsData = await getAllNews();
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <TabsClient />
        <NewsTable newsData={newsData} />
      </div>
    </div>
  );
};

export default page;
