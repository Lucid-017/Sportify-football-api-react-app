import React from 'react'
import HeadToHead from './HeadToHead'
import SportifyContext from './context/SportifyContext'
import { useContext,useEffect } from 'react'
import Spinner from './Spinner'

const Matches = () => {
  const {matchday,getMatches,loading,selectedLeague,setSelectedLeague}=useContext(SportifyContext)

   useEffect(()=>{
    setSelectedLeague(selectedLeague)
    getMatches()
},[])
  return loading ? <Spinner/>: (
    <>
    <div className='p-4 '>
      <p>Matchweek {matchday}</p>
      <HeadToHead/>
    </div>

    
    </>
    
  )
}

export default Matches