'use client'
import React, { useEffect, useState } from "react";
import FeatureListView from "@/components/feature/FeatureListView";


const FeatureSection = () => {
  const [productInfos, setProductInfos] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/product/");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);
    });
  }, []);

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
          {
            productInfos.map((productInfo) => (
              <FeatureListView.ListItem
                key={productInfo.id}
                productInfo={productInfo}
              />
            ))
          }
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
          <FeatureListView.GridDisplay />
          <FeatureListView.GridDisplay />
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
