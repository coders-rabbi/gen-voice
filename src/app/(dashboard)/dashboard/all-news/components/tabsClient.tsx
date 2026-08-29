"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsClientProps {
  onValueChange?: (value: string) => void;
}

const TabsClient = ({ onValueChange }: TabsClientProps) => {
  const handleTab = (value: string) => {
    console.log(value);
    onValueChange?.(value);
  };

  return (
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
  );
};

export default TabsClient;
