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
        <button onClick={toggleIsOpen} className={`relative ${isOpen ? 'bg-white !hover:bg-white' : 'c-nav__box'}`}>
            <IoCartOutline className="c-nav__icon" />
            <CartOverlay />
        </button>
    )
}

export default Cart;
