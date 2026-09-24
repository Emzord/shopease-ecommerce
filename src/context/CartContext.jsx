import { createContext, useContext, useState } from "react";

import {
  addCart,
  updateCart,
  deleteCart,
} from "../services/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  async function addToCart(product, quantity) {
  try {
    const apiProducts = [
      {
        id: product.id,
        quantity: quantity,
      },
    ];

    await addCart(1, apiProducts);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  } catch (error) {
    console.error("Add to cart failed:", error);
  }
}

 async function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    return;
  }

  try {
    await updateCart(1, [
      {
        id: productId,
        quantity: newQuantity,
      },
    ]);

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  } catch (error) {
    console.error("Update cart failed:", error);
  }
}

  async function removeFromCart(productId) {
  try {
    await deleteCart(1);

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  } catch (error) {
    console.error("Remove from cart failed:", error);
  }
}

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}