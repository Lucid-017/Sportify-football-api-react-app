import React from 'react'
import { useState,useEffect } from 'react'
import Standings from './pages/Competitions'
import Matches from './Matches'
import { useContext } from 'react'
import SportifyContext from './context/SportifyContext'
import { Link } from 'react-router-dom'
const Leagues = () => {
    const {selectedLeague,setSelectedLeague,}=useContext(SportifyContext)
    const {test,FOOTBALL_API_URL,FOOTBALL_API_TOKEN,loading,setLoading,competitions}=useContext(SportifyContext)

        // const {position,team,playedGames,
        //       won,draw,lose,points,
        //       goalsFor,goalsAgainst}=standings
        // console.log(getStanding())

        useEffect(() => {
         test()
        },[]);
      // console.log(test())
    const renderer= competitions.map((competition)=>(
        <div className=" h-3/4">
            <div className="cursor-pointer shadow-xl hover:shadow-2xl   p-8 h-36" key={competition.id}>
         <div className="flex gap-3">
         <div className="img">
           <img className='w-24' src={competition.emblem} alt="emblem" />
         </div>
         <div className="league " onClick={()=>setSelectedLeague(competition.code)}>
          <Link to={`/competitions/${competition.id}`}>
          <p className='text-lg font-semibold'>{competition.name}</p>
          <p className='text-xs'>{competition.area.name}</p>
          </Link>
         </div>
         </div>
         
      </div>
        </div>
      
    ))
    
      return loading ? <p>loading</p>:(
        
        <div className='grid grid-cols-2 gap-5'>
          {renderer}
        </div>
        
        
      )
}

export default Leagues