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

    <div className='p-5 md:px-10 '>
      <div className="">
        <Link to={'/'}><p className='animate p-2'>All Competitions</p>  </Link>
        /<span className='text-ash-900 px-2'>{LeagueName}</span>
      </div>

      <div className="">
        <p className='capitalize text-2xl text-blue-700 my-5'>
          {LeagueName}
        </p>
      </div>
      <div className="tabs text-white flex justify-around mt-5 bg-zest-500 pt-3">
          <button style={{borderBottomWidth:  active ? '4px' : null,borderColor:'white'}} 
          onClick={()=>setActive(true)} className='text-xl pb-3 uppercase cursor-pointer'>Standings</button>
          <button style={{borderBottomWidth:  !active ? '4px' : null,borderColor:'white'}} 
          onClick={()=>setActive(false)} className='text-xl pb-3 uppercase cursor-pointer'>Matches</button>
          {/* <button style={{borderBottomWidth:  !active ? '4px' : null,borderColor:'white'}} 
          onClick={()=>setActive(false)} className='text-xl pb-3 uppercase cursor-pointer'>Stats</button> */}
      </div>
      {active ? <Standings/>: <Matches/>}
  </div>
      
    
  )
}

export default Competitions