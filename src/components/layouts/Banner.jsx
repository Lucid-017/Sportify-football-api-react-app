import React from 'react'
import Logo from '../assets/logo.efdde25b.png'
import Bannerimg from '../assets/bg-football.2d1b7b03.jpg'
const Banner = () => {
  return (
    <div>
      <div className='banner'>
        <div className="w-full h-full bg-gray-800 top-0 left-0 absolute opacity-20"></div>
       {/* <img src={Bannerimg} alt="Logo" /> */}
      
      <div className="logo-area flex flex-col items-center">
        <img src={Logo} alt="Logo" />
      </div>
      </div>
    </div>
  )
}

export default Banner