import PageTitle from "../../components/page-Title";
import PostTable from "./components/postTable";
import TabsClient from "./components/tabsClient";

const TitleDetails = {
  title: "All Posts",
  subtitle: "Review, approve, and manage news articles across the platform.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Posts" }],
};

const page = () => {
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <TabsClient />
        <PostTable />
      </div>
    </div>
  );
};

export default page;
