import React from 'react';
import { useState } from 'react';
import Standings from './Standings';
import { Link } from 'react-router-dom';
import Matches from '../Matches';
import SportifyContext from '../context/SportifyContext';
import { useContext } from 'react';


const Competitions = () => {
  const [active,setActive]= useState('Standings')
  const {LeagueName}=useContext(SportifyContext)
  return (

    <div className='p-5 md:px-10 min-w-[300px] max-w-screen-laptop mx-auto '>
      <div className=" flex items-center">
        <Link to={'/'}><p className='animate p-2'>All Competitions</p>  </Link>
        /<p className='text-ash-900 px-2 hidden sm:block'>{LeagueName}</p>
      </div>

      <div className="">
        <p className='capitalize text-2xl text-blue-700 my-5'>
          {LeagueName}
        </p>
      </div>
      <div className="tabs text-white flex justify-around mt-5 bg-zest-500 pt-3">
        {['Standings','Matches'].map((tab,index)=>(
          <>
          <button key={index} className={`text-xl pb-3 uppercase cursor-pointer ${active===tab ? 'border-b-4 border-white' : ''}`}
          onClick={()=>setActive(tab)}>{tab}</button>
          </>
        ))}
      </div>
      {active === 'Standings' ? <Standings/> : active === 'Matches' ? <Matches/>: null}
  </div>
      
    
  )
}

export default Competitions