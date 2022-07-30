import React from 'react'

function MainBtn({ label, onClick, variant }) {
  const variantClassnames = variant === 'primary'
    ? 'text-white bg-green-400 border-green-400 hover:bg-green-600 hover:border-green-600'
    : ''
  return (
    <div
      className={`rounded-sm font-medium border border-solid w-full py-1 px-2 cursor-pointer text-center ${variantClassnames}`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default MainBtn
