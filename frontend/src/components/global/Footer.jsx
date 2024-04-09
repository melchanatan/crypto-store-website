import React from "react";
import HiddenContainer from "@/components/global/HiddenContainer";

const Footer = () => {
  return (
    <footer className="bg-footer-image flex flex-col gap-2 items-center xl:grid grid-cols-2 text-white bg-center padding-page w-full py-10">
      <div className="flex flex-row w-full justify-center mb-2">
        <input
          type="text"
          placeholder="Enter your email"
          className="placeholder:text-gray-500 focus:outline-none text-black text-center py-2 w-[60%]"
        />
        <button className="bg-primary px-6 py-3">Subscribe</button>
      </div>
      <div className="w-full">
        <ul className="">
          <HiddenContainer title={"About"}>
            <p>hello world</p>
          </HiddenContainer>
          <HiddenContainer title={"STORE INFORMATION"}>
            <p>hello world</p>
          </HiddenContainer>
          <HiddenContainer title={"MY ACCOUNT"}>
            <p>hello world</p>
          </HiddenContainer>
          <HiddenContainer title={"WHY WE CHOOSE"}>
            <p>hello world</p>
          </HiddenContainer>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
``;
