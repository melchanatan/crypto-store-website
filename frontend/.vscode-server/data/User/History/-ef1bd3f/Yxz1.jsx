'use client'
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const CartOverlay = () => {
        return (
            <div className="absolute bottom-[-20px] right-0 min-w-[200px] bg-white rounded-md">
                fdv
            </div>
        )
    }

    return (
        <li onClick={toggleIsOpen} className={`relative ${isOpen ? 'bg-white' : ''}`}>
            <IoCartOutline />
            <CartOverlay />
        </li>
    )
}

export default Cart;
