import React from 'react'
import { Plus } from 'lucide-react' // Importing the Plus icon from lucide-react

// Main ProductPricing component
// It now accepts props: title, subtitle, features (an array of strings), and price
const ProductPricing = ({ title, subtitle, features, price }) => {
  return (
    <div
      style={{
        position: 'relative',
        bottom: '-32rem',
        left: '45rem',
        zIndex: 10,
        // backgroundColor: 'orange',
        // opacity: 0.2,
        flexShrink: 0,
        // width: '820px',
        paddingBottom: '2rem',
      }}
      className='pricing-container'
    >
      {/* Product Card Container */}
      {/* Main Title - uses the 'title' prop */}
      <h1
        className='text-white text-2xl sm:text-4xl font-semibold mb-2 pricing-title'
        style={{ letterSpacing: '4px', fontWeight: 'bold', paddingBottom: '3rem', fontSize: '3.5rem' }}
      >
        {title}
      </h1>

      {/* Subtitle - uses the 'subtitle' prop */}
      <h2 className='text-white text-lg sm:text-xl font-medium mb-2'>{subtitle}</h2>

      {/* Product Details List - maps over the 'features' prop array */}
      <ul className='list-none p-0 text-white text-sm sm:text-base '>
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      {/* Price and Add Button Section */}
      <div className='flex items-center justify-normal mt-8 gap-4 sm:gap-6'>
        {/* Add to Cart Button */}
        <button className='flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 ease-in-out'>
          <Plus className='w-6 h-6 sm:w-7 sm:h-7' strokeWidth={2.5} /> {/* Plus icon */}
        </button>

        {/* Price - uses the 'price' prop */}
        <span className='text-white text-3xl sm:text-4xl font-bold'>{price}</span>
      </div>
    </div>
  )
}

export default ProductPricing
