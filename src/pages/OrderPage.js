import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const OrderPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [review, setReview] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://capstone-project-shop-verse.onrender.com/api/orders/${user.id}`);
                setOrders(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, [user.id]);

    const handleViewDetails = (orderId) => {
        const order = orders.find(order => order._id === orderId);
        setSelectedOrder(order);
        setReview('');
    };

    const handleBackToSummary = () => {
        setSelectedOrder(null);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleReviewSubmit = async () => {
        try {
            await axios.post(`https://capstone-project-shop-verse.onrender.com/api/orders/add-review/${selectedOrder._id}`, { userId: user.id, reviewText: review });
            const updatedOrder = { ...selectedOrder, reviews: [...selectedOrder.reviews, { userId: user.id, reviewText: review, createdAt: new Date() }] };
            setSelectedOrder(updatedOrder);
            setReview('');
        } catch (err) {
            console.error(err);
        }
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
                            <div className="flex flex-col p-4 mx-auto max-w-xl mt-24">
                                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="comment">Leave a Comment:</label>
                                <textarea
                                    rows="4"
                                    className="mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg"
                                    id="comment"
                                    name="comment"
                                    value={review}
                                    onChange={handleReviewChange}
                                ></textarea>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleReviewSubmit}
                                        className="add-review  text-white font-bold py-2 px-4 rounded max-w-[100px]"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-xl font-bold">Your Reviews</h3>
                                {selectedOrder.reviews.map((review, index) => (
                                    <div key={index} className="mt-4">
                                        <p className="text-gray-700"><strong>{new Date(review.createdAt).toLocaleDateString()}:</strong> {review.reviewText}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">Your Orders</h2>
                            {orders.map(order => (
                                <div key={order._id} className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto">
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-6">
                                        <h3 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1">Order ID: {order._id}</h3>
                                        <p className="font-medium text-lg leading-8 text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="font-medium text-lg leading-8 text-gray-600">Payment Status: {order.paymentStatus}</p>
                                    </div>
                                    <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex justify-end items-center">
                                        <button 
                                            onClick={() => handleViewDetails(order._id)} 
                                            className="view-detail mt-2 px-4 py-2  text-white rounded"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OrderPage;
