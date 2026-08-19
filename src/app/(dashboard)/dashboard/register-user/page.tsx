import React from "react";
import PageTitle from "../../components/page-Title";
import { UsersTable } from "./components/userTable";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TitleDetails = {
  title: "Registered Users",
  subtitle:
    "Manage all registered writers, review pending signups, and enforce moderation",
  breadcrumbs: [
    { label: "Home", href: "/dashboard" },
    { label: "Registered Users" },
  ],
};

const page = () => {
  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList className="bg-[#F0F6FF] p-2">
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
          </TabsList>
        </Tabs>

        <UsersTable />
      </div>
    </div>
  );
};

export default page;
