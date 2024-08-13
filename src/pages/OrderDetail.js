// OrderDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <div>
        {order.products.map(product => (
          <div key={product.productId._id} className="product-detail">
            <img src={product.productId.image} alt={product.productId.name} />
            <p>{product.productId.name}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
      <p>Total Price: ${order.products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
    </div>
  );
};

export default OrderDetail;
