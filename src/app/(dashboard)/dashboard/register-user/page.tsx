"use client";
import { useState } from "react";
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
  const [value, setValue] = useState("");
  const handleTab = (value: string) => {
    setValue(value as string);
  };

  return (
    <div>
      <PageTitle TitleDetails={TitleDetails} />
      <div className="mt-5">
        <Tabs defaultValue="all" className="w-100" onValueChange={handleTab}>
          <TabsList className="bg-[#F0F6FF] p-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="blocked">Blocked</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
          </TabsList>
        </Tabs>

        <UsersTable onChangeValue={value} />
      </div>
    </div>
  );
};

export default page;
