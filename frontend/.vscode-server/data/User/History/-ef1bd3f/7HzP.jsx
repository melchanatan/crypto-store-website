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
            <div className="absolute bottom-[-20px] right-0 min-w-[200px] bg-white rounded-md" style={isOpen ? { display: 'block' } : { display: 'none' }}>
                fdv
            </div>
        )
    }

    return (
        <button onClick={toggleIsOpen} className={`relative ${isOpen ? 'bg-white rounded-t-full' : 'c-nav__icon-box'}`}>
            <IoCartOutline className={`c-nav__icon ${isOpen ? 'hover:text-black !text-black' : ''}`} />

            <div style={isOpen ? { display: 'block' } : { display: 'none' }}>
                <CartOverlay />
            </div>
        </button>
    )
}

export default Cart;
