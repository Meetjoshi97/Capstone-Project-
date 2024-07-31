import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const CartDropdown = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
      {cartItems.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Your cart is empty</div>
      ) : (
        <>
          <div className="p-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
                <div className="flex-1">
                  <span className="font-semibold text-gray-500 block">{item.name}</span>
                  <span className="text-gray-500">Qty: {item.quantity}</span>
                  <span className="text-gray-500 block">Price: ${item.totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <Link to="/checkout" className="block w-full checkout-link text-white text-center py-2 rounded mb-2 hover:bg-blue-600">
              Checkout
            </Link>
            <Link to="/checkout" className="block w-full text-center shopping-link hover:underline">
              View Shopping Bag
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
