import React, { useState, useEffect } from "react";
import CartContext from "./cartContext";
const Cartstate = (props) => {

   const [cart, setCart] = useState([]);

   function addToCart(id, size = 'M', quantity = 1) {
      const currentCart = [...cart];
      // Check if product with same id AND size already exists
      const existingItemIndex = currentCart.findIndex(item => item.id === id && item.size === size);

      if (existingItemIndex > -1) {
         currentCart[existingItemIndex].quantity += quantity;
      } else {
         currentCart.push({ id, size, quantity });
      }

      localStorage.setItem("Products_id", JSON.stringify(currentCart));
      setCart(currentCart);
   }

   useEffect(() => {
      const savedCart = localStorage.getItem("Products_id");
      if (savedCart) {
         try {
            const parsed = JSON.parse(savedCart);
            // Handle legacy format (array of strings) if necessary
            if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
               const Migrated = parsed.map(id => ({ id, size: 'M', quantity: 1 }));
               setCart(Migrated);
            } else {
               setCart(parsed);
            }
         } catch (e) {
            setCart([]);
         }
      }
   }, [])



   return (

      <CartContext.Provider value={{ cart, addToCart, setCart }}>
         {props.children}
      </CartContext.Provider>


   )
}

export default Cartstate;