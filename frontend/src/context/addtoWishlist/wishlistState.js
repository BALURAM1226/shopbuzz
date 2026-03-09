import React, { useState, useEffect } from "react";
import WishlistContext from "./wishlistContext";
import toast from "react-hot-toast";

const WishlistState = (props) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Initialize from local storage
    useEffect(() => {
        const storedWishlist = localStorage.getItem("user_wishlist");
        if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist));
        }
    }, []);

    const addToWishlist = (product) => {
        setWishlistItems(prevItems => {
            const isExist = prevItems.find(item => item._id === product._id);
            if (isExist) {
                const updatedItems = prevItems.filter(item => item._id !== product._id);
                localStorage.setItem("user_wishlist", JSON.stringify(updatedItems));
                toast.success("Item removed from your curated wishlist.");
                return updatedItems;
            } else {
                const updatedItems = [...prevItems, product];
                localStorage.setItem("user_wishlist", JSON.stringify(updatedItems));
                toast.success("Style saved to your personal collection! ❤️", {
                    icon: '❤️',
                    style: { borderRadius: '1rem', background: '#333', color: '#fff' }
                });
                return updatedItems;
            }
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prevItems => {
            const updatedItems = prevItems.filter(item => item._id !== productId);
            localStorage.setItem("user_wishlist", JSON.stringify(updatedItems));
            toast.success("Garment archived from wishlist.");
            return updatedItems;
        });
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {props.children}
        </WishlistContext.Provider>
    );
};

export default WishlistState;
