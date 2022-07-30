import React from 'react'

function MainBtn({
  label, onClick, color, selected,
}) {
  const colorClassnames = color === 'primary'
    ? 'text-white bg-green-400 border-green-400 hover:bg-green-600 hover:border-green-600'
    : ''

  const selectedClasses = selected ? 'border-primary border-2 hover:bg-primary hover:bg-opacity-75 hover:text-white' : ''
  return (
    <button
      type="button"
      className={
        `rounded-full text-lg mx-8 my-2 border border-solid w-full py-2 px-3 cursor-pointer text-center   
       hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ${colorClassnames} ${selectedClasses}`
      }
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default MainBtn
