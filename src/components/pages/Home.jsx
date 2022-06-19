import React from 'react'
import Leagues from '../Leagues'
import Spinner from '../Spinner';
import SportifyContext from '../context/SportifyContext';
import { useContext } from 'react';


const Home = () => {
  const {loading}=useContext(SportifyContext)


  return (
    <div className=' w-4/5 md:w-3/4 lg:w-4/6 mx-auto drop-shadow-md p-5 bg-white check rounded'>
      <p className='text-2xl '>All Competitions</p>
      <Leagues/>
    </div>
  )
}

export default Home