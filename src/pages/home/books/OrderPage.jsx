import React from 'react';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi'; 
import { useAuth } from '../../../context/AuthContext'; 

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;

    return (
        <div className='container p-6 mx-auto'>
            <h2 className='mb-4 text-2xl font-semibold'>Your Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order._id} className="pb-4 mb-4 border-b">
                            <p className='w-10 p-1 mb-1 text-white rounded bg-secondary'># {index + 1}</p>
                            <h2 className="font-bold">Order ID: {order._id}</h2>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Email: {order.email}</p>
                            <p className="text-gray-600">Phone: {order.phone}</p>
                            <p className="text-gray-600">Total Price: ${order.totalPrice}</p>

                            <h3 className="mt-2 font-semibold">Address:</h3>
                            <p>
                                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                            </p>

                            <h3 className="mt-2 font-semibold">Product IDs:</h3>
                            <ul className="list-disc list-inside">
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
