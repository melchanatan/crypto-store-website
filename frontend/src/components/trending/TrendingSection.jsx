import React from "react";
import TrendingListView from "@/components/trending/TrendingListView";

const TrendingSection = () => {
  return (
    <section id="feature-1" className="flex flex-col justify-center py-[54px]">
      <div className="text-center mb-5">
        <p className="sub-heading">TOP 12</p>
        <h2>TRENDING NFTS</h2>
      </div>
      <TrendingListView>
        <TrendingListView.ListItem />
        <TrendingListView.ListItem />

        <TrendingListView.ListItem />
        <TrendingListView.ListItem />
        <TrendingListView.ListItem />

        <TrendingListView.ListItem />
      </TrendingListView>
    </section>
  );
};

export default TrendingSection;
