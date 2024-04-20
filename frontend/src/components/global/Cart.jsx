'use client'
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const CartOverlay = () => {
        return (
            <div
                className="absolute top-[52px] right-0 w-[300px] bg-white rounded-tr-[0] rounded-md py-2 font-prompt divide-y"
            >
                <CartItem />
                <CartItem />
                <div className="flex items-end justify-between relative px-3 pt-4 border-t-[1px] solid border-gray-400 shadow-[0px_-3px_5px_0px_#00000024]">
                    <p className="leading-4">
                        total:
                        <h4 className="font-bold text-xl mb-1t">$100</h4>
                    </p>
                    <button className="bg-primary text-white px-3 py-2 font-prompt">checkout</button>
                </div>
            </div >
        )
    }

    const CartItem = () => {

        return (
            <div className="flex items-center justify-between gap-2 font-prompt py-3 px-3">
                <img src="/default-avatar.jpeg" alt="product img" className="w-[32px] h-[32px] object-cover rounded-full" />
                <label>
                    <h4>Product Name</h4>
                    <p className="text-sm text-gray-500">$100</p>
                </label>
                <div className="ml-auto flex">
                    <input type="text" className="w-[5ch] bg-gray-200 text-center" />
                    <button className="p-2 bg-primary text-white text-xl">
                        <FaPlus />
                    </button>
                </div>
            </div>
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

            {isOpen && <CartOverlay />}
        </div>
    )
}

export default Cart;
