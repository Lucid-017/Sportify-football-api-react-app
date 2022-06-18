import React from 'react';
import { useState } from 'react';
import Standings from './Standings';
import { Link } from 'react-router-dom';
import Matches from '../Matches';

const Competitions = () => {
  const [active,setActive]= useState(true)
  return (
    <div className=' w-2/4 mx-auto drop-shadow-md p-5 bg-white rounded check'>
    <div className="">
      <Link to={'/'}>
        <p>All Competitions
            <span> /
          {/* <p>name of league</p> */}</span>
        </p>
      </Link>
        
       
      </div>
      <div className="">
        <p className='capitalize text-2xl font-semibold text-blue-700 mb-3'>
          {/* name of league */}
          league name
        </p>
      </div>
      <div className="tabs text-white flex justify-around mt-5 bg-orange-400 pt-3">
          <button style={{borderBottomWidth:  active ? '4px' : null}} 
          onClick={()=>setActive(true)} className='text-2xl pb-3 uppercase cursor-pointer'>Standings</button>
          <button style={{borderBottomWidth:  !active ? '4px' : null}} 
          onClick={()=>setActive(false)} className='text-2xl pb-3 uppercase cursor-pointer'>matches</button>
      </div>
      {active ? <Standings/>:<Matches/>}
  </div>
      
    
  )
}

export default Competitions