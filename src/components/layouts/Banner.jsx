import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.efdde25b.png'

const Banner = () => {
  return (
    <header className="sticky top-0 z-50 bg-Darkblue-800 shadow-md">
      <div className="max-w-screen-desktop mx-auto flex items-center justify-between px-5 md:px-10 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={Logo} alt="Sportify" className="h-9 w-auto" />
          <span className="hidden sm:block text-white font-semibold text-lg tracking-wide">
            Sportify
          </span>
        </Link>
        <nav>
          <Link
            to="/"
            className="text-ash-100 hover:text-zest-400 font-medium text-sm md:text-base transition-colors"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Banner
