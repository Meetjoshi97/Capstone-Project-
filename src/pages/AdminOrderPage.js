import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const AdminOrderPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [orderResponse, userResponse] = await Promise.all([
                    axios.get('https://capstone-project-shop-verse.onrender.com/api/orders/allOrders'),
                    axios.get('https://capstone-project-shop-verse.onrender.com/api/user/all')
                ]);
                setOrders(orderResponse.data);
                setUsers(userResponse.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const handleViewDetails = (orderId) => {
        const order = orders.find(order => order._id === orderId);
        setSelectedOrder(order);
    };

    const handleBackToSummary = () => {
        setSelectedOrder(null);
    };

    const getUserDetails = (userId) => {
        return users.find(user => user._id === userId);
    };

    return (
        <section className="py-24 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
                    {selectedOrder ? (
                        <div>
                            <button onClick={handleBackToSummary} className="mb-4 px-4 py-2 bg-gray-300 rounded">Back to Summary</button>
                            <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">Order Details</h2>
                            <div className="grid grid-cols-8 pb-9">
                                <div className="col-span-8 lg:col-span-4">
                                    <p className="font-medium text-lg leading-8 text-indigo-600">Product</p>
                                </div>
                                <div className="col-span-1 max-lg:hidden">
                                    <p className="font-medium text-lg leading-8 text-gray-600 text-center">Price</p>
                                </div>
                                <div className="col-span-1 max-lg:hidden flex items-center justify-center">
                                    <p className="font-medium text-lg leading-8 text-gray-600">Qty</p>
                                </div>
                                <div className="col-span-2 max-lg:hidden">
                                    <p className="font-medium text-lg leading-8 text-gray-500">Order Date</p>
                                </div>
                            </div>
                            {selectedOrder.products.map(product => (
                                <div key={product._id} className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto">
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
                                        <img src={product.productId.image} alt="product" className="max-lg:w-auto max-sm:mx-auto rounded-xl" />
                                    </div>
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-3 flex h-full justify-center pl-4 flex-col max-lg:items-center">
                                        <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1 whitespace-nowrap">
                                            {product.productId.name}
                                        </h5>
                                        <p className="font-normal text-base leading-7 text-gray-600 max-md:text-center">{product.productId.description}</p>
                                    </div>
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center">
                                        <p className="font-semibold text-xl leading-8 text-black">${product.price}</p>
                                    </div>
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center">
                                        <p className="font-semibold text-xl leading-8 text-indigo-600 text-center">{product.quantity}</p>
                                    </div>
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
                                        <p className="font-semibold text-xl leading-8 text-black">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 text-lg font-semibold text-black">
                                <p><strong>Total Price:</strong> ${selectedOrder.products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
                                <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                            </div>
                            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-xl font-bold">Reviews from user</h3>
                                {selectedOrder.reviews.map((review, index) => (
                                    <div key={index} className="mt-4">
                                        <p className="text-gray-700"><strong>{new Date(review.createdAt).toLocaleDateString()}:</strong> {review.reviewText}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">All Orders</h2>
                            {orders.map(order => {
                                const user = getUserDetails(order.userId);
                                return (
                                    <div key={order._id} className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto">
                                        <div className="col-span-8 sm:col-span-4 lg:col-span-6">
                                            <h3 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1">User: {user ? user.username : 'Unknown'}</h3>
                                            <p className="font-medium text-lg leading-8 text-gray-600">Order ID: {order._id}</p>
                                            <p className="font-medium text-lg leading-8 text-gray-600">Total Price: ${order.products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
                                            <p className="font-medium text-lg leading-8 text-gray-600">Total Quantity: {order.products.reduce((total, product) => total + product.quantity, 0)}</p>
                                        </div>
                                        <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex justify-end items-center">
                                            <button 
                                                onClick={() => handleViewDetails(order._id)} 
                                                className="view-detail mt-2 px-4 py-2 text-white rounded"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminOrderPage;
