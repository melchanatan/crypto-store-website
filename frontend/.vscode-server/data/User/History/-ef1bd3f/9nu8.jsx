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
            <span
                className="absolute bottom-[-18px] right-0 min-w-[200px] bg-white rounded-tr-[0] rounded-md transition-all duration-300"
                style={{ height: isOpen ? 'auto' : '0px' }}
            >
                fdv
            </span>
        )
    }

    return (
        <div className="relative transition-all duration-300">
            <button onClick={toggleIsOpen} className={`
                ${isOpen ?
                    'bg-white rounded-t-full p-0' :
                    'c-nav__icon-box'
                }`}>
                <IoCartOutline className={`
                ${isOpen ?
                        'hover:text-black !text-black' :
                        ''}
                c-nav__icon 
                `} />
            </button>

            <CartOverlay />
        </div>
    )
}

export default Cart;
