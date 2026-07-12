import React from 'react';
import { useState, useEffect } from 'react';
import Standings from './Standings';
import { Link } from 'react-router-dom';
import Matches from '../Matches';
import Knockout from '../Knockout';
import Stats from '../Stats';
import SportifyContext from '../context/SportifyContext';
import { useContext } from 'react';


const Competitions = () => {
  const [active,setActive]= useState('Standings')
  const {LeagueName,selectedLeague}=useContext(SportifyContext)

  // World Cup is the only competition with a knockout bracket distinct
  // from group standings; other TIER_ONE leagues don't need the extra tab
  const tabs = selectedLeague === 'WC' ? ['Standings','Matches','Knockout','Stats'] : ['Standings','Matches','Stats']

  useEffect(() => {
    setActive('Standings')
  }, [selectedLeague])

  return (

    <div className='px-5 md:px-10 py-6 min-w-[300px] max-w-screen-desktop mx-auto'>
      <div className="flex items-center text-sm">
        <Link to={'/'}><span className='animate text-zest-600'>All Competitions</span></Link>
        <span className='text-ash-700 px-2'>/</span>
        <span className='text-ash-800 hidden sm:block'>{LeagueName}</span>
      </div>

      <h1 className='capitalize text-2xl md:text-3xl font-semibold text-Darkblue-800 mt-3 mb-5'>
        {LeagueName}
      </h1>

      <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
        <div className="flex bg-Darkblue-800">
          {tabs.map((tab,index)=>(
            <button key={index}
              className={`flex-1 text-sm md:text-base py-3 uppercase tracking-wide font-medium cursor-pointer transition-colors border-b-4 ${active===tab ? 'border-zest-500 text-white' : 'border-transparent text-ash-400 hover:text-white'}`}
              onClick={()=>setActive(tab)}>{tab}</button>
          ))}
        </div>
        <div className="rounded-b-xl">
          {active === 'Standings' ? <Standings/> : active === 'Matches' ? <Matches/> : active === 'Knockout' ? <Knockout/> : active === 'Stats' ? <Stats/> : null}
        </div>
      </div>
  </div>


  )
}

export default Competitions
