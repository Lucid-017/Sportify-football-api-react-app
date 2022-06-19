import React from 'react'
import HeadToHead from './HeadToHead'
import SportifyContext from './context/SportifyContext'
import { useContext,useState,useEffect } from 'react'

const Matches = () => {
  const {matchday,matches}=useContext(SportifyContext)
  console.log(matches)
  console.log(matchday)
  useEffect(()=>{
    // getMatches()
  },[])
  return (
    <>
    <div className=''>
      <p>MATCHDAY {matchday}</p>
      <HeadToHead/>
    </div>

    
    </>
    
  )
}

export default Matches