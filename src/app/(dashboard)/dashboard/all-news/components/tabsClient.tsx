"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsClientProps {
  onValueChange?: (value: string) => void;
}

const TabsClient = ({ onValueChange }: TabsClientProps) => {
  const handleTab = (value: string) => {
    onValueChange?.(value);
  };

  return (
    <Tabs defaultValue="all" className="w-[400px]" onValueChange={handleTab}>
      <TabsList className="bg-[#F0F6FF] p-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="blocked">Blocked</TabsTrigger>
        <TabsTrigger value="suspended">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsClient;
