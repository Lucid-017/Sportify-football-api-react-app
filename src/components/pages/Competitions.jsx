import React from 'react';
import { useState } from 'react';
import Standings from './Standings';
import { Link } from 'react-router-dom';
import Matches from '../Matches';
import SportifyContext from '../context/SportifyContext';
import { useContext } from 'react';


const Competitions = () => {
  const [active,setActive]= useState(true)
  const {LeagueName}=useContext(SportifyContext)
  return (

    <div className='md:w-9/12 lg:w-7/12 mx-auto drop-shadow-md p-3 bg-white rounded check'>
    <div className="">
      <Link to={'/'}>
        <p className='animate p-2'>All Competitions
           </p> /<span className='text-ash-900'> <></>
          {LeagueName}</span>
        
      </Link>
        
       
      </div>
      <div className="">
        <p className='capitalize text-2xl text-blue-700 my-3'>
          {LeagueName}
        </p>
      </div>
      <div className="tabs text-white flex justify-around mt-5 bg-zest-500 pt-3">
          <button style={{borderBottomWidth:  active ? '4px' : null}} 
          onClick={()=>setActive(true)} className='text-xl pb-3 uppercase cursor-pointer'>Standings</button>
          <button style={{borderBottomWidth:  !active ? '4px' : null}} 
          onClick={()=>setActive(false)} className='text-xl pb-3 uppercase cursor-pointer'>matches</button>
      </div>
      {active ? <Standings/>:<Matches/>}
  </div>
      
    
  )
}

export default Competitions