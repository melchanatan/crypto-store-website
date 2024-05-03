"use client"
const { createContext, useEffect, useState, useRef, useContext } = require("react");
import { UserInfoContext } from "./UserInfoProvider";
const UserCartContext = createContext();

const UserCartProvider = ({ children }) => {
    const [userCart, setUserCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { userInfo } = useContext(UserInfoContext)
    const [isLoading, setIsLoading] = useState(true);

    const cartEventRef = useRef(false);

    const initEventListener = () => {
        if (cartEventRef.current) {
            return
        }
        cartEventRef.current = true
        const buttons = document.querySelectorAll("[data-refetch]")
        buttons.forEach(btn => {
            btn.addEventListener('click', handleRefetch)
        })

        return () => {
            buttons.forEach(btn => {
                btn.removeEventListener('click', handleRefetch)
            })
        }
    }


    // useEffect(() => {
    //     console.log('added event listener')

    //     const button = document.getElementById("x")
    //     button.addEventListener('click', handleRefetch)

    //     return () => {
    //         console.log('removed event listener')
    //         button.removeEventListener('click', handleRefetch)
    //     }
    // }, [userCart])
    // console.log('added event listener')
    const fetchCartItems = async () => {
        const delay = await new Promise(resolve => setTimeout(resolve, 500))
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/user-cart/' + userInfo.id)
        const data = await response.json()
        return {
            cartItems: data["items_in_cart"],
            userCart: data["user_cart"]
        }
    }

    useEffect(() => {
        fetchCartItems().then(data => {
            setCartItems(data.cartItems)
            setUserCart(data.userCart)
            setIsLoading(false)
        })
    }, [])

    const handleRefetch = () => {
        // add 2000 ms timeout
        fetchCartItems().then(data => {
            console.log(data)
            setCartItems(data.cartItems)
            setUserCart(data.userCart)
            setIsLoading(false)
        })
    }

    return (
        <UserCartContext.Provider value={{ userCart, setUserCart, setCartItems, cartItems, initEventListener }}>
            {children}
        </UserCartContext.Provider>
    );
};

export default UserCartProvider;
export { UserCartContext };