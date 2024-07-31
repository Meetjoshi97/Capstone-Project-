import React, { useState } from 'react';
import { FaTshirt, FaShoppingBag, FaShoePrints, FaHeadphones, FaTv, FaHome } from 'react-icons/fa';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchRequest = () => {
    console.log('Search request for:', searchQuery);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Discover the Latest Trends in Fashion</h1>
          <p>
            Explore our curated collection of stylish and affordable products for every occasion.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Shop now</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="./home-image.jpeg" alt="shop verse" />
        </div>
      </section>

      <section className="explore-category">
        <h2>Explore by Category</h2>
        <p>Browse our wide selection of products across various categories.</p>
        <div className="categories">
          <div className="category-item">
            <FaTshirt size={30} />
            <p>Clothing</p>
          </div>
          <div className="category-item">
            <FaShoppingBag size={30} />
            <p>Bags</p>
          </div>
          <div className="category-item">
            <FaShoePrints size={30} />
            <p>Shoes</p>
          </div>
          <div className="category-item">
            <FaHeadphones size={30} />
            <p>Accessories</p>
          </div>
          <div className="category-item">
            <FaTv size={30} />
            <p>Electronics</p>
          </div>
          <div className="category-item">
            <FaHome size={30} />
            <p>Home</p>
          </div>
        </div>
      </section>

      {/* Add TextField here as SearchBar */}
      <section className="explore-category">
      {/* <h2>Search Products</h2>

      <TextField
        fullWidth
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchRequest}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ margin: '20px auto', maxWidth: 800 }}
      /> */}


</section>
     

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <img src="./product.png" alt="Classic T-Shirt" />
            <p>Classic T-Shirt</p>
            <p>$19.99</p>
          </div>
          <div className="product-item">
            <img src="./product2.png" alt="Leather Backpack" />
            <p>Leather Backpack</p>
            <p>$79.99</p>
          </div>
          <div className="product-item">
            <img src="./product3.png" alt="Wireless Earbuds" />
            <p>Wireless Earbuds</p>
            <p>$49.99</p>
          </div>
          <div className="product-item">
            <img src="./product4.png" alt="Floral Dress" />
            <p>Floral Dress</p>
            <p>$39.99</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
