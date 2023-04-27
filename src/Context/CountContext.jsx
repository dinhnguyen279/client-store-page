import React, { createContext, useEffect, useState } from 'react'
import CartAPI from '../API/CartAPI'
import FavoriteAPI from '../API/Favorites'

const CountContext = createContext()
const CountProvider = ({ children }) => {

    const [countCart, setCountCart] = useState(0)
    const [countWishlist, setCountWishlist] = useState(0)
    const [reloadCount, setReloadCount] = useState(true)
    let idUser = ""
    if (sessionStorage.getItem("id_user")) {
        const id_user = sessionStorage.getItem("id_user");
        idUser = id_user;

    }
    else if (localStorage.getItem("id_user_clientage")) {
        const id_user_clientage = localStorage.getItem("id_user_clientage")
        idUser = id_user_clientage;
    }

    useEffect(() => {
        const fecthCount = async () => {
            const getCount = (getCount) => {
                let count = getCount
                let totalCount = 0
                if (getCount.length === 0) {
                    setCountCart(0)
                    return
                }
                count.map((val) => {
                    return (
                        totalCount += val.quantity
                    )
                })
                setCountCart(totalCount)
            }

            try {
                const cartResponse = await CartAPI.getCartById(`/${idUser}`)
                getCount(cartResponse.data)
            } catch (error) {
                console.log("error get api cart", error);
            }

            try {
                const favoritesResponse = await FavoriteAPI.getFavoriteById(`/${idUser}`)
                setCountWishlist(favoritesResponse.data)
            } catch (error) {
                console.log("error get api favorites", error);
            }
        }
        fecthCount()
        setReloadCount(true)
    }, [reloadCount])
    // hàm này xử lý thêm sản phẩm vào yêu thích

    const value = {
        countCart,
        countWishlist,
        setReloadCount,
    }
    return (
        <CountContext.Provider value={value}>
            {children}
        </CountContext.Provider>
    )
}

export { CountContext, CountProvider } 