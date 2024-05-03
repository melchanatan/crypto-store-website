'use client'
import React, { useEffect, useState, useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { UserInfoContext } from "@/utils/UserInfoProvider";
import { FaRegTrashCan } from "react-icons/fa6";
import { UserCartContext } from "@/utils/UserCartProvider";

const Cart = () => {
    const { userCart, setUserCart, cartItems, initEventListener, setCartItems, isLoading } = useContext(UserCartContext)
    const [isOpen, setIsOpen] = useState(false);
    const { userInfo } = useContext(UserInfoContext);

    const toggleIsOpen = () => {
        setIsOpen(prev => !prev)
    }

    const CostTotal = () => {
        const [total, setTotal] = useState(0)
        const [discountPercentage, setDiscountPercentage] = useState(0)
        const [subtotal, setSubtotal] = useState(0)

        const getTotal = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-cart/${userInfo.id}/get_total`)
            const data = await response.json()
            return data
        }

        useEffect(() => {
            initEventListener()
            getTotal().then(data => {
                setTotal(data.total)
                setDiscountPercentage(data.discount_percentage)
                setSubtotal(data.subtotal)
            })
        }, [])

        return (
            <div className="flex items-end justify-between">
                <p>
                    total:
                </p>
                {
                    discountPercentage > 0 && total > 0 ? (
                        <h4 className="font-bold text-sm flex gap-2 items-center">
                            <span className="px-2 py-1 bg-green-400 rounded-full text-white font-prompt text-sm">-{discountPercentage}%</span>
                            <div className="relative text-lg">
                                <span className="h-[2px] bg-black w-full absolute bottom-1/2 rotate-[-10deg] left-0"></span>
                                {total}
                            </div>
                            <FaLongArrowAltRight /> {subtotal}$
                        </h4>
                    ) : (
                        <h4 className="font-bold text-lg">
                            {total}$
                        </h4>
                    )
                }
            </div>
        )
    }

    const CartOverlay = () => {
        return (
            <>
                <img src="/inverted-corner.svg" alt="" className="absolute bottom-0 translate-y-[-36%] right-[52px] w-4 h-4" />
                <div
                    className="absolute top-[52px] right-0 w-[300px] bg-white rounded-tr-[0] rounded-md py-2 font-prompt divide-y"
                >
                    <div className="max-h-[400px] overflow-y-auto">
                        {
                            cartItems && cartItems.map((item, index) => (
                                <CartItem
                                    key={item.id}
                                    itemInfo={item.product}
                                    quantity={item.quantity}
                                    id={item.id}
                                />
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-2 relative px-3 pt-4 border-t-[1px] solid border-gray-400 shadow-[0px_-3px_5px_0px_#00000024]">
                        <CostTotal />
                        {
                            !isLoading &&
                            <PromotionInput promotion={userCart.selected_promotion} />
                        }
                        <button className="bg-primary text-white px-3 py-2 font-prompt">checkout</button>
                    </div>
                </div >
            </>
        )
    }

    const PromotionInput = ({ promotion }) => {
        const [promotionCode, setPromotionCode] = useState(promotion ? promotion.name : "")
        const [message, setMessage] = useState("")

        const handleChange = (e) => {
            setPromotionCode(e.target.value)
        }

        useEffect(() => {
            initEventListener()
        })
        const handleApply = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-cart/${userInfo.id}/update_promotion/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "promotion_code": promotionCode
                    })
                }
            )

            const data = await response.json()

            setMessage(data.message)
        }

        return (
            <>
                <div className="flex">
                    <input type="text" placeholder="discount code" className="w-full bg-gray-200 text-center" value={promotionCode} onChange={handleChange} />
                    <button className="bg-primary text-white px-3 py-1 font-prompt button-animate" onClick={handleApply} data-refetch>apply</button>
                </div>
                <p>{message}</p>
            </>
        )
    }

    const CartItem = ({ itemInfo, quantity, id }) => {
        const { name, price } = itemInfo
        const [currentQuantity, setCurrentQuantity] = useState(quantity)
        var lastQuantity = quantity

        const handleChange = (e) => {
            setCurrentQuantity(e.target.value)
        }

        const handleConfirm = async () => {
            if (lastQuantity == currentQuantity) return
            lastQuantity = currentQuantity

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart-item/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: currentQuantity
                })
            })
            const data = await response.json()
        }

        const deleteItemFromCart = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/cart-item/' + id, {
                method: 'DELETE'
            })
            const data = await response.json()
        }

        return (
            <div className="flex items-center justify-between gap-2 font-prompt py-3 px-3" >
                <img src="/default-avatar.jpeg" alt="product img" className="w-[32px] h-[32px] object-cover rounded-full" />
                <label>
                    <h4>{name}</h4>
                    <p className="text-sm text-gray-500">${price}</p>
                </label>
                <div className="ml-auto flex">
                    <input
                        type="text"
                        className="w-[5ch] bg-gray-200 text-center"
                        onChange={handleChange}
                        onBlur={handleConfirm}
                        value={currentQuantity}
                    />
                    <button className="p-2 bg-red-500 text-white text-xl button-animate" title="delete item" onClick={deleteItemFromCart} data-refetch>
                        <FaRegTrashCan />
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
