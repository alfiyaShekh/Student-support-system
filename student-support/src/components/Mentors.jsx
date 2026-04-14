import React from 'react'

function Mentors({name,mentor,bio,img,rating}) {
  return (
    <>
    <div className="bg-pink-50 p-6 rounded-2xl shadow-md text-center hover:shadow-xl hover:scale-105 transition-all duration-300">

  <img 
    src={img}
    className="w-27 h-27 mx-auto rounded-full object-cover border-3 border-blue-200"
  />

  <h3 className="mt-4 text-lg font-semibold">
    {name}
  </h3>

  <p className="text-gray-500 text-xs">
    {mentor}
  </p>

  {/* Rating */}
  <div className="flex justify-center mt-2 text-yellow-400">
    {Array.from({ length: rating }, (_, i) => (
    <span key={i}>⭐</span>
  ))}
  </div>

  {/* Bio */}
  <p className="text-gray-500 text-xs mt-2">
    {bio}
  </p>

  {/* Button */}
  <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition text-sm">
    Connect +
  </button>

</div>
    </>
  )
}

export default Mentors