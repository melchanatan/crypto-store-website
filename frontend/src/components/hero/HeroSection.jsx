"use client"

import React from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import HeroListView from "@/components/hero/HeroListView";
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="bg-hero-image bg-cover bg-center h-[75vh] w-screen mb-[calc(15vh+1rem)]"
    >
      <ul className="grid grid-cols-2 w-full h-full justify-center items-center padding-page ">
        <li className="">
          <h1 className="text-clamp-lg font-prompt font-bold mb-3 leading-[120%]">
            Find The Best Digital Art And Unique NFTs.
          </h1>
          <Button text={"Explore Now"} />
        </li>
        <li className="h-full relative">
          <Image
            src={"/hero/1.png"}
            width={300}
            height={300}
            className="c-hero__img right-[45%] animate-hero-image-1"
          />
          <Image
            src={"/hero/2.png"}
            width={300}
            height={300}
            className="c-hero__img left-[40%] animate-hero-image-2"
          />
        </li>
      </ul>

      <HeroListView></HeroListView>
    </section>
  );
};

export default HeroSection;
