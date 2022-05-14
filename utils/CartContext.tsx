import React, { createContext, useState } from "react";
import { IItem } from "../types";

export const CartContext = createContext(undefined);

type PropsType = {
  children: React.ReactNode,
}

export const CartProvider: React.FC<PropsType> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IItem[]>([]);

  return <CartContext.Provider value={[cartItems, setCartItems]}>{children}</CartContext.Provider>
};