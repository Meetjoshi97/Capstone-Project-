import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item._id === product._id);
      if (existingProduct) {
        if (existingProduct.quantity < product.inventory) {
          return prevItems.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
              : item
          );
        } else {
          toast.error(`Cannot add more than ${product.inventory} of ${product.name}`);
          return prevItems;
        }
      } else {
        return [...prevItems, { ...product, quantity: 1, totalPrice: product.price }];
      }
    });
  };

  const removeFromCart = (_id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== _id));
  };

  const updateCartQuantity = (_id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === _id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
