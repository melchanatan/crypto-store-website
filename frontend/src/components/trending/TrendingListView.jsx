import React from "react";
import Carousel from "@/components/global/Carousel";
import Image from "next/image";
import { Suspense, lazy } from "react";
import { FaEthereum } from "react-icons/fa";
import Button from "@/components/global/Button";
import { IoIosHeartEmpty } from "react-icons/io";

const FeatureListView = ({ children }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Carousel className="grid grid-cols-1 gap-x-2 padding-page">
        {children}
      </Carousel>
    </Suspense>
  );
};

const ListItem = () => {
  return (
    <li className="p-3 bg-white flex flex-row border-b-[1px] border-gray-200">
      <div className="flex flex-row items-center gap-3 w-full">
        <label htmlFor="" className="font-prompt">
          1
        </label>
        <Image
          src={"/default-avatar.jpeg"}
          width={64}
          height={64}
          alt="image"
          className="rounded-lg"
        />
        <article className="flex-col flex items-start w-full">
          <h3 className="font-bold font-prompt mb-auto">iHFT</h3>
          <div className="text-sm text-gray-500">
            <p>Floor Price: 0.45 ETH</p>
            <p>Volume: 253 ETH</p>
          </div>
        </article>
        <span className="ml-auto text-end">
          <p className="percentage--up">50.32</p>
          <p className="percentage--down">5</p>
        </span>
      </div>
    </li>
  );
};

FeatureListView.ListItem = ListItem;
export default FeatureListView;
