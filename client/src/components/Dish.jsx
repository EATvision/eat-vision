import React from 'react'

export default function Dish({ data }) {
  return (
    <div className="flex justify-center mb-4 flex-1">
      <div className="flex flex-col md:flex-row md:max-w-xl md:w-xl rounded-lg bg-white shadow-lg">
        <img
          className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={data.photo_url}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{data.display_name}</h5>
          <p className="text-gray-700 text-base mb-4">
            {data.short_description}
          </p>
          <p className="text-gray-600 text-xs">
            {data.price}
          </p>
        </div>
      </div>
    </div>
  )
}
