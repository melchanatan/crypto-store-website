import React from "react";
import FeatureListView from "@/components/feature/FeatureListView";
const FeatureSection = () => {
  return (
    <>
      <section
        id="feature-1"
        className="flex flex-col justify-center pb-[54px]"
      >
        <div className="text-center mb-5">
          <p className="sub-heading">Live auctions</p>
          <h2>Top Collection</h2>
        </div>
        <FeatureListView>
          <FeatureListView.ListItem />
          <FeatureListView.ListItem />
          <FeatureListView.ListItem />
        </FeatureListView>
      </section>
      <section
        id="feature-2"
        className="flex flex-col justify-center py-[54px] bg-bg-darken text-white"
      >
        <div className="text-center mb-5">
          <p className="sub-heading">Live auctions</p>
          <h2>Top Collection</h2>
        </div>
        <div className="padding-page grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeatureListView.GridDisplay /> <FeatureListView.GridDisplay />
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
