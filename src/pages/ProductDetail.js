import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useAuth } from '../components/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { user } = useAuth();

  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://capstone-project-shop-verse.onrender.com/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));

    fetch(`https://capstone-project-shop-verse.onrender.com/api/reviews/${id}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      productId: id,
      userId: user.id,
      text: newReview,
    };

    fetch(`https://capstone-project-shop-verse.onrender.com/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })
      .then(response => response.json())
      .then(data => {
        const updatedReview = { ...data, userId: { _id: user.id, username: user.username } };
        setReviews([...reviews, updatedReview]);
      })
      .catch(error => console.error('Error adding review:', error));

    setNewReview("");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  const cartQuantity = getCartQuantity(product._id);

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img className="w-full h-full scale-down" src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600">${product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="text-gray-600">{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <button
                  className={`w-full text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ${cartQuantity >= product.inventory ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900'}`}
                  onClick={() => addToCart(product)}
                  disabled={cartQuantity >= product.inventory || product.inventory === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
           
          </div>
        </div>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Write a review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <button type="submit" className="w-full text-white py-2 px-4 rounded-full bg-gray-900 hover:bg-gray-800">
          Submit Review
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="mb-4">
              <p className="text-gray-600"><strong>User:</strong> {review.userId.username}</p>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default ProductDetail;
