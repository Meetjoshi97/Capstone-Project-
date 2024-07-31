import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';
import LoginSignup from './pages/LoginSignup';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './pages/CartContext';
import UserPage from './pages/UserProfile';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/LoginSignup" element={<LoginSignup />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/userProfile" element={<UserPage />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/addproducts" element={<AddProduct />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
