import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noData, setNoData] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Filter state
  const [priceFilter, setPriceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const fetchProducts = async (searchTerm = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/products?search=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setNoData(data.length === 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (search !== '') {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (priceFilter.length > 0) {
      filtered = filtered.filter(product => {
        return priceFilter.some(priceRange => {
          const [min, max] = priceRange.split('-').map(Number);
          return product.price >= min && (max ? product.price <= max : true);
        });
      });
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter(product => categoryFilter.includes(product.category));
    }

    setFilteredProducts(filtered);
    setNoData(filtered.length === 0);
  }, [search, priceFilter, categoryFilter, products]);

  const handleFilterChange = (filterType, value) => {
    const setFilter = {
      price: setPriceFilter,
      category: setCategoryFilter
    }[filterType];

    setFilter(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setPriceFilter([]);
    setCategoryFilter([]);
  };

  const activeFiltersCount = priceFilter.length + categoryFilter.length;

  return (
    <div>
      

      <label
        className="mx-auto mt-10 mb-6 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          placeholder="Your keyword here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="w-full md:w-auto px-6 py-3 search-button text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all "
          disabled
        >
          <div className="relative">
            <div className="flex items-center transition-all opacity-1 valid:">
              <span className="text-sm  font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
            </div>
          </div>
        </button>
      </label>

      {/* Filter Toggle Button and Summary */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-between items-center">
        <button
          className="flex items-center space-x-2 text-gray-700"
          onClick={toggleFilters}
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM4 8h16v2a1 1 0 01-1 1H5a1 1 0 01-1-1V8zM6 12h12v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2z" />
          </svg>
          <span>{activeFiltersCount} Filters</span>
        </button>
        <button
          className="text-gray-700"
          onClick={clearFilters}
        >
          Clear all
        </button>
        <div className="text-gray-700">
          Sort
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Price</h2>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('price', '0-25')}
                  />
                  $0 - $25
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('price', '25-50')}
                  />
                  $25 - $50
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('price', '50-75')}
                  />
                  $50 - $75
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('price', '75-')}
                  />
                  $75+
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Category</h2>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('category', 'Electronics')}
                  />
                Electronics
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('category', 'Shoes')}
                  />
                  Shoes
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('category', 'Bags')}
                  />
                  Bags
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('category', 'Clothing')}
                  />
                  Clothing
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => handleFilterChange('category', 'Home')}
                  />
                  Home
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {noData ? (
          <div className="col-span-3 text-center text-gray-500">No data found</div>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={`/products/${product._id}`}>
                <img src={product.image} alt={product.name} className="h-80 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                  <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                    {product.originalPrice && (
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">${product.originalPrice}</p>
                      </del>
                    )}
                    <div className="ml-auto">
                      <button
                        onClick={() => addToCart(product)}
                        className="text-white addCart-button  px-3 py-1 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ProductPage;
