"use client";
import PageTitle from "../../components/page-Title";
import NewsTable from "./components/newsTable";
import TabsClient from "./components/tabsClient";
import { useState } from "react";

const TitleDetails = {
  title: "All Posts",
  subtitle: "Review, approve, and manage news articles across the platform.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Posts" }],
};

const page = () => {
  const [sharedValue, setSharedValue] = useState<string>("");
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <TabsClient onValueChange={setSharedValue} />
        <NewsTable onValueChange={sharedValue} />
      </div>
    </div>
  );
};

export default page;
