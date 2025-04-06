import React from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import { getImgUrl } from '../../../utils/getImgUrl'

import { Link } from 'react-router-dom'

import { useDispatch } from'react-redux'
import { addToCart } from '../../../redux/features/cart/cartSlice'


const BookCard = ({book}) => {

  const dispatch =  useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product))
  }
  return (
    <div className="transition-shadow duration-300 rounded-lg ">
    <div
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:h-72 sm:justify-center"
    >
      <div className="border rounded-md sm:h-72 sm:flex-shrink-0">
        <Link to={`/books/${book._id}`}>
          <img
            src={getImgUrl(book?.coverImage)} alt=""
            className="w-full p-2 transition-all duration-200 bg-cover rounded-md cursor-pointer hover:scale-105"
          />
        </Link>
      </div>
  
      <div >
  <Link to={`/books/${book?._id}`}>
    <h3 className="mb-4 text-xl font-semibold hover:text-blue-600">
    {book?.title.length > 25
        ? `${book.title.slice(0, 25)}...`
        : book?.title}
    </h3>
  </Link>

  <div className="flex-grow">
    <p className="text-gray-600 text-xm mb-2 leading-tight min-h-[48px]">
      {book?.description.length > 80
        ? `${book.description.slice(0, 80)}...`
        : book?.description}
    </p>

    <p className="flex items-center mb-4 font-medium text-xm">
      <span className="font-semibold text-green-600">${book?.newPrice}</span>
      <span className="ml-2 text-xs font-normal text-gray-500 line-through">
        ${book?.oldPrice}
      </span>
    </p>
  </div>

  <button
    onClick={() => handleAddToCart(book)}
    className="flex items-center justify-center w-full gap-1 py-1 mt-auto font-semibold transition-all duration-200 rounded-md text-xm"
    style={{
      backgroundColor: '#FFCE1A',
      color: '#000000',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#0D0842';
      e.currentTarget.style.color = '#FFFFFF';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#FFCE1A';
      e.currentTarget.style.color = '#000000';
    }}
  >
    <FiShoppingCart className="text-m" />
    <span>Add to Cart</span>
  </button>
</div>





    </div>
  </div>
  )
}

export default BookCard;