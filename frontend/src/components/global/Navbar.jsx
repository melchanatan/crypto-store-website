'use client'
import React from "react";
import Cart from '@/components/global/Cart'
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import Login from "@/components/global/Login";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { push } = useRouter();

  return (
    <nav className="absolute z-10 top-0 flex flex-row w-screen justify-between  items-center padding-page py-[32px]">
      <img
        src="/logo.png"
        alt="multicart logo"
        className="w-[30%] max-w-[200px]"
      />
      <ul className="flex flex-row gap-2 items-center [&>li]:c-nav__icon-box c-nav__icon-list">
        <li>
          <IoIosSearch />
        </li>
        <li>
          <HiOutlineAdjustmentsHorizontal />
        </li>
        <li>
          <IoIosHeartEmpty />
        </li>
        <Cart />
        <a onClick={() => push("/api/auth/signin")}>
          <img
            src="/default-avatar.jpeg"
            alt="user profile"
            className="c-nav__avatar"
          />
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;

