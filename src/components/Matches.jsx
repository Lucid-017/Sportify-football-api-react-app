import React from 'react'
import HeadToHead from './HeadToHead'
import SportifyContext from './context/SportifyContext'
import { useContext, useEffect, useMemo } from 'react'
import Spinner from './Spinner'

const Matches = () => {
  const {matchday,getMatches,loading,selectedLeague,setSelectedLeague,allMatches,selectMatchday}=useContext(SportifyContext)

   useEffect(()=>{
    setSelectedLeague(selectedLeague)
    getMatches()
},[])

  // matchday numbers observed in the already-fetched season (knockout
  // matches have no matchday and are excluded here)
  const availableMatchdays = useMemo(() => (
    [...new Set(allMatches.map((match) => match.matchday).filter((day) => day != null))].sort((a, b) => a - b)
  ), [allMatches]);

  return loading ? <Spinner/>: (
    <div className='p-4 md:p-6'>
      <div className='flex items-center gap-2 mb-3'>
        <label htmlFor="matchday-select" className='text-sm font-semibold uppercase tracking-wide text-ash-800'>
          Matchweek
        </label>
        {availableMatchdays.length > 0 ? (
          <select
            id="matchday-select"
            value={matchday}
            onChange={(e) => selectMatchday(Number(e.target.value))}
            className='border border-gray-300 rounded-md px-2 py-1 text-sm text-Darkblue-800 bg-white focus:outline-none focus:ring-2 focus:ring-zest-400'
          >
            {availableMatchdays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        ) : (
          <span className='text-sm text-ash-800'>{matchday}</span>
        )}
      </div>
      <HeadToHead/>
    </div>
  )
}

export default Matches
