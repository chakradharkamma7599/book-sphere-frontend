/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../../redux/features/orders/ordersApi'; 

const CheckOutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = Number(cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2));
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: currentUser?.email || '',
    }
  });

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        street: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Order Placed!",
        text: "Your order was placed successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Orders"
      }).then(() => {
        navigate("/orders");
      });
    } catch (error) {
      console.error("Error placing the order:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to place an order. Please try again later.",
        icon: "error"
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="text-xl font-semibold text-center text-gray-600">
          Your cart is empty. <Link to="/" className="text-blue-600 underline">Go shopping</Link>
        </div>
      </section>
    );
  }
  if(isLoading) return <div>Loading....</div>
  return (
    <section>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-600">Cash On Delivery</h2>
            <p className="mb-2 text-gray-500">Total Price: ${totalPrice}</p>
            <p className="mb-6 text-gray-500">Items: {cartItems.length}</p>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                      {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        {...register("email")}
                        type="text"
                        id="email"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        disabled
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register("phone", { required: true })}
                        type="tel"
                        id="phone"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="+123 456 7890"
                      />
                      {errors.phone && <span className="text-xs text-red-500">Phone is required</span>}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        id="address"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                      {errors.address && <span className="text-xs text-red-500">Address is required</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        id="city"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                      {errors.city && <span className="text-xs text-red-500">City is required</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        {...register("country", { required: true })}
                        id="country"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="Country"
                      />
                      {errors.country && <span className="text-xs text-red-500">Country is required</span>}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        {...register("state", { required: true })}
                        id="state"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="State"
                      />
                      {errors.state && <span className="text-xs text-red-500">State is required</span>}
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        id="zipcode"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                      {errors.zipcode && <span className="text-xs text-red-500">Zipcode is required</span>}
                    </div>

                    <div className="mt-3 md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="billing_same"
                          className="form-checkbox"
                          onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the <Link className="text-blue-600 underline">Terms & Conditions</Link> and <Link className="text-blue-600 underline">Shopping Policy</Link>.
                        </label>
                      </div>
                    </div>

                    <div className="text-right md:col-span-5">
                      <button
                        type="submit"
                        disabled={!isChecked}
                        className={`px-4 py-2 font-bold text-white rounded ${isChecked ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
