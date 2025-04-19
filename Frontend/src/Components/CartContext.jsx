import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartProduct, setCartProduct] = useState(null);

  const addToCart = (product) => {
    setCartProduct(product);
  };

  return (
    <CartContext.Provider value={{ cartProduct, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
