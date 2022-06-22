import React from 'react'
import HeadToHead from './HeadToHead'
import SportifyContext from './context/SportifyContext'
import { useContext,useEffect } from 'react'
import Spinner from './Spinner'

const Matches = () => {
  const {matchday,getMatches,Loading}=useContext(SportifyContext)

  // useEffect(()=>{
  //    getMatches()
  // },[])
  return Loading ? <Spinner/>: (
    <>
    <div className='py-4'>
      <p>Matchweek {matchday}</p>
      <HeadToHead/>
    </div>

    
    </>
    
  )
}

export default Matches