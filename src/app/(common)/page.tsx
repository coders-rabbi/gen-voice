import Herosection from "@/components/ui/home/herosection";
import PopularCategory from "@/components/ui/home/popularCategory";
import Sports from "@/components/ui/home/sports";
import React from "react";

const Home = () => {
  return (
    <div>
      <Herosection />
      <PopularCategory />
      <Sports />
    </div>
  );
};

export default Home;
