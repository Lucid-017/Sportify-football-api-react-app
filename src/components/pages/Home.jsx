import React from 'react'
import Leagues from '../Leagues'


const Home = () => {
  
  return (
    <div className=' w-2/4 mx-auto drop-shadow-md p-5 bg-white check rounded'>
      <p className='text-2xl '>All Competitions</p>
      <Leagues className=''/>
    </div>
  )
}

export default Home