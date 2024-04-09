import React from "react";
import Image from "next/image";
import { Suspense, lazy } from "react";
const HeroListView = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ul className="flex flex-row  justify-between padding-page h-[15vh] gap-2 md:gap-4 items-center bg-white translate-y-[-5vh] custom-border-radius relative">
        <HeroListItem />
        <HeroListItem />
        <HeroListItem />
      </ul>
    </Suspense>
  );
};

const HeroListItem = () => {
  return (
    <li className="p-3 bg-white shadow-md flex flex-col items-center rounded-xl border-gray-300 border-[1px]">
      <Image
        src={"/hero/features/1.jpg"}
        width={150}
        height={50}
        alt="image"
        className="rounded-lg"
      />
      <h3 className="text-black uppercase text-sm md:text-lg font-semibold">
        Trending
      </h3>
    </li>
  );
};

export default HeroListView;
