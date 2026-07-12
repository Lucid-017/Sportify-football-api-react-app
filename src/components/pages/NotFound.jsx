import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="max-w-screen-desktop mx-auto px-5 py-24 text-center">
      <p className="text-zest-500 text-6xl font-bold">404</p>
      <h1 className="text-Darkblue-800 text-2xl font-semibold mt-4">
        Route not found
      </h1>
      <p className="text-ash-800 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block mt-6 px-5 py-2.5 rounded-full bg-Darkblue-800 text-white font-medium hover:bg-Darkblue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
