import React from 'react'

export default function Dish({ data }) {
  return (
    <div className="flex justify-center mb-4 flex-1">
      <div className="flex flex-row max-w-xlw-xl rounded-lg bg-white shadow-lg">
        <img
          className="h-auto object-cover w-48 rounded-t-lg rounded-none rounded-l-lg"
          src={data.photo_url}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start w-80">
          <div className="text-gray-900 text-xl font-medium mb-2 ">{data.name}</div>
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
