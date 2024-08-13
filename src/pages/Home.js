import React, { useEffect, useState } from 'react';
import { FaTshirt, FaShoppingBag, FaShoePrints, FaHeadphones, FaTv, FaHome } from 'react-icons/fa';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchRequest = () => {
    console.log('Search request for:', searchQuery);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://capstone-project-shop-verse.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          <div className="category-item" onClick={() => handleCategoryClick('Clothing')}>
            <FaTshirt size={30} />
            <p>Clothing</p>
          </div>
          <div className="category-item" onClick={() => handleCategoryClick('Bags')}>
            <FaShoppingBag size={30} />
            <p>Bags</p>
          </div>
          <div className="category-item" onClick={() => handleCategoryClick('Shoes')}>
            <FaShoePrints size={30} />
            <p>Shoes</p>
          </div>
          <div className="category-item" onClick={() => handleCategoryClick('Accessories')}>
            <FaHeadphones size={30} />
            <p>Accessories</p>
          </div>
          <div className="category-item" onClick={() => handleCategoryClick('Electronics')}>
            <FaTv size={30} />
            <p>Electronics</p>
          </div>
          <div className="category-item" onClick={() => handleCategoryClick('Home')}>
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
          {products.map((product) => (
            <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
