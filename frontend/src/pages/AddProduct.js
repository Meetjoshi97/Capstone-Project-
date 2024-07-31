import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    image: null,
    category: '', // New category field
  });

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await fetch(`http://localhost:5000/api/products/${currentProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      toast.success('Product updated successfully');
    } else {
      await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      toast.success('Product added successfully');
    }

    fetchProducts();
    setProduct({
      name: '',
      description: '',
      price: '',
      inventory: '',
      image: null,
      category: '', // Reset category field
    });
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((prod) => prod._id === id);
    setProduct(productToEdit);
    setIsEditing(true);
    setCurrentProductId(id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    toast.success('Product deleted successfully');
    fetchProducts();
  };

  return (
    <>
      <div className="add-product-container">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={product.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Inventory</label>
            <input type="number" name="inventory" value={product.inventory} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={product.category} onChange={handleChange} />
          </div>
          <button className='addProduct-button' type="submit">{isEditing ? 'Update Product' : 'Save Product'}</button>
        </form>
      </div>
      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      <ToastContainer />
    </>
  );
};

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Category</th> {/* Add Category Header */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image && <img src={product.image} alt={product.name} className="product-image" />}
              </td>
              <td>
                <strong>{product.name}</strong>
                <p>{product.description}</p>
              </td>
              <td>${product.price}</td>
              <td>{product.inventory} in stock</td>
              <td>{product.category}</td> {/* Add Category Data */}
              <td>{product.inventory > 0 ? 'In stock' : 'Out of stock'}</td>
              <td>
              <div className='action-container'>
              <button onClick={() => onEdit(product._id)} className="action-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M14.06 9.02l-4.93 4.93c-.12.12-.26.21-.41.27l-2.56.73c-.37.1-.73-.26-.63-.63l.73-2.56c.06-.15.15-.29.27-.41l4.93-4.93 2.57 2.57zm5.66-6.49c-.78-.78-2.05-.78-2.83 0l-1.83 1.83 2.57 2.57 1.83-1.83c.78-.78.78-2.05 0-2.83z"
                      fill="currentColor"
                    />
                    <path
                      d="M0 20h24v4H0z"
                      fill="none"
                      transform="translate(0 -20)"
                    />
                  </svg>
                </button>
                <button onClick={() => onDelete(product._id)} className="action-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 8H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddProduct;
