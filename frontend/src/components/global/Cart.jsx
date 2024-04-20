'use client'
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const CartOverlay = () => {
        return (
            <>
                <img src="/inverted-corner.svg" alt="" className="absolute bottom-0 translate-y-[-36%] right-[52px] w-4 h-4" />
                <div
                    className="absolute top-[52px] right-0 w-[300px] bg-white rounded-tr-[0] rounded-md py-2 font-prompt divide-y"
                >
                    <CartItem />
                    <CartItem />
                    <div className="flex flex-col gap-2 relative px-3 pt-4 border-t-[1px] solid border-gray-400 shadow-[0px_-3px_5px_0px_#00000024]">
                        <div className="flex items-end justify-between">
                            <p>
                                total:
                            </p>
                            <h4 className="font-bold text-xl flex gap-2 items-center">
                                <span className="px-2 py-1 bg-green-400 rounded-full text-white font-prompt text-sm">-40%</span>

                                <div className="relative">
                                    <span className="h-[3px] bg-black w-[120%] absolute translate-y-1/2 bottom-1/2 rotate-[-10deg] left-0"></span>
                                    100
                                </div>
                                <FaLongArrowAltRight /> 80$

                            </h4>
                        </div>
                        <div className="flex">
                            <input type="text" placeholder="discount code" className="w-full bg-gray-200 text-center " />
                            <button className="bg-primary text-white px-3 py-1 font-prompt">apply</button>
                        </div>
                        <button className="bg-primary text-white px-3 py-2 font-prompt">checkout</button>

                    </div>
                </div >
            </>
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
                    <input type="text" className="w-[5ch] bg-gray-200 text-center " />
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
