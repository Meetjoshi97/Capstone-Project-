import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CartContext } from '../pages/CartContext';
import CartDropdown from '../pages/CartDropdown';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, admin, logout } = useAuth();
  const { cartItems } = useContext(CartContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="logo">
          <img src="/logo.png" alt="Login Image" className="h-10" />
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user && !admin ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900">Products</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
              <Link to="/userProfile" className="text-gray-700 hover:text-gray-900">My Profile</Link>
              <Link to="/aboutUs" className="text-gray-700 hover:text-gray-900">About Us</Link>
              <div className="relative">
                <button onClick={toggleCart} className="flex items-center relative text-gray-700 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-4-8m0 0l-.4-2m.4 2h16.2m-16.2 0L5.4 3m4 10a1 1 0 110 2h8a1 1 0 110-2H9z" />
                  </svg>
                  <span className="ml-1">{cartItems.length}</span>
                </button>
                {cartOpen && <CartDropdown />}
              </div>
              <div className="relative">
                <button onClick={toggleDropdown} className="user-initial  hover:text-gray-900">{user.username.charAt(0).toUpperCase()}</button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : admin ? (
            <>
              <Link to="/addproducts" className="text-gray-700 hover:text-gray-900">Add Products</Link>
              <Link to="/adminUsers" className="text-gray-700 hover:text-gray-900">Manage Users</Link>
              <Link to="/userOrder" className="text-gray-700 hover:text-gray-900">User Orders</Link>
              <div className="relative">
                <button onClick={toggleDropdown} className="user-initial  hover:text-gray-900">{admin.username.charAt(0).toUpperCase()}</button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/LoginSignup" className="text-gray-700 hover:text-gray-900">Login</Link>
          )}
        </div>
        <button className="md:hidden text-gray-700 hover:text-gray-900" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="space-y-2 py-2">
            {user && !admin ? (
              <>
                <li><Link to="/" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Home</Link></li>
                <li><Link to="/products" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Products</Link></li>
                <li><Link to="/contact" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Contact Us</Link></li>
                <li><Link to="/userProfile" className="block text-gray-700 hover:text-gray-900 px-4 py-2">My Profile</Link></li>
                <li><Link to="/aboutUs" className="block text-gray-700 hover:text-gray-900 px-4 py-2">About Us</Link></li>
                <li>
                  <button onClick={toggleCart} className="block text-gray-700 hover:text-gray-900 px-4 py-2">
                    Cart ({cartItems.length})
                  </button>
                  {cartOpen && <CartDropdown />}
                </li>
                <li>
                  <span className="block  px-4 py-2">{user.username.charAt(0).toUpperCase()}</span>
                  <button onClick={handleLogout} className="block text-gray-700 hover:text-gray-900 px-4 py-2">Logout</button>
                </li>
              </>
            ) : admin ? (
              <>
                <li><Link to="/addproducts" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Add Products</Link></li>
                <li><Link to="/adminUsers" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Manage Users</Link></li>
                <li><Link to="/userOrder" className="block text-gray-700 hover:text-gray-900 px-4 py-2">User Orders</Link></li>
                <li>
                  <span className="block  px-4 py-2">{admin.username.charAt(0).toUpperCase()}</span>
                  <button onClick={handleLogout} className="block text-gray-700 hover:text-gray-900 px-4 py-2">Logout</button>
                </li>
              </>
            ) : (
              <li><Link to="/LoginSignup" className="block text-gray-700 hover:text-gray-900 px-4 py-2">Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
