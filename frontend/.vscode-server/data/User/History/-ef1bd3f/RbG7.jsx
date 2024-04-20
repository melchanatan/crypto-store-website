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
            <div
                className="absolute bottom-[-18px] right-0 min-w-[200px] bg-white rounded-tl-0 rounded-md transition-all duration-300"
                style={{ opacity: isOpen ? 1 : 0 }}
            >
                fdv
            </div>
        )
    }

    return (
        <div className="relative">
            <button onClick={toggleIsOpen} className={` ${isOpen ? 'bg-white rounded-t-full p-0' : 'c-nav__icon-box'}`}>
                <IoCartOutline className={`c-nav__icon ${isOpen ? 'hover:text-black !text-black' : ''}`} />
            </button>
            <CartOverlay />
        </div>
    )
}

export default Cart;
