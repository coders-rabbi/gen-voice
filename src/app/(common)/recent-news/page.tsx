import NewsCardVertical from "@/components/newsCardVertical";
import React from "react";

const RecentNews4 = () => {
  return (
    <div>
      <h1>This is Recent News Page</h1>
      <div className="flex gap-5">
        <NewsCardVertical />
        <NewsCardVertical />
        <NewsCardVertical />
        <NewsCardVertical />
      </div>
    </div>
  );
};

export default RecentNews4;
