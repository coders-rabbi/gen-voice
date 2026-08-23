"use client";
import PageTitle from "../../components/page-Title";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostTable from "./components/postTable";

const TitleDetails = {
  title: "All Posts",
  subtitle: "Review, approve, and manage news articles across the platform.",
  breadcrumbs: [{ label: "Home", href: "/dashboard" }, { label: "Posts" }],
};

const page = () => {
  const handleTab = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <Tabs
          defaultValue="approved"
          className="w-[400px]"
          onValueChange={handleTab}
        >
          <TabsList className="bg-[#F0F6FF] p-2">
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
          </TabsList>
        </Tabs>
        <PostTable />
      </div>
    </div>
  );
};

export default page;
