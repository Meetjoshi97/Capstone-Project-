import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Save cart items to local storage whenever it changes
  useEffect(() => {
    console.log('Cart items updated:', cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item._id === product._id);
      if (existingProduct) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
            : item
        );
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
