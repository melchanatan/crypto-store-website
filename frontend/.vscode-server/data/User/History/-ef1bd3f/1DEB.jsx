'use client'
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const CartOverlay = () => {
        return (
            <div className="absolute bottom-0 right-0 min-w-[200px] bg-white rounded-md">
                fdv
            </div>
        )
    }

    return (
        <li className="relative">
            <IoCartOutline />
        </li>
    )
}

export default Cart;
