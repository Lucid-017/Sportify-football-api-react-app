import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import SportifyContext from './context/SportifyContext'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
const Leagues = () => {
    const {getData,setSelectedLeagueName,loading,competitions,setSelectedLeague}=useContext(SportifyContext)
    const navigate = useNavigate()
        // const {position,team,playedGames,
        //       won,draw,lose,points,
        //       goalsFor,goalsAgainst}=standings
        // console.log(getStanding())

        useEffect(() => {
          getData()
        },[]);

        const handleNavigate =(competition)=>{
            setSelectedLeague(competition.code)
            setSelectedLeagueName(competition.name)
            navigate(`/competitions/${competition.code}`)
        }

        const renderer = competitions.map(competition => (
          competition.plan === 'TIER_ONE' && (
            <div
              key={competition.id}
              onClick={() => handleNavigate(competition)}
              className="cursor-pointer transition-shadow duration-300 shadow-xl hover:shadow-2xl p-6 sm:p-8 md:p-10 lg:p-8 h-auto sm:h-30 md:h-36 lg:h-36"
            >
              <div className="flex gap-4 items-center">
                <div className="w-20 sm:w-24 md:w-28 lg:w-28 flex-shrink-0">
                  <img src={competition.emblem} alt={`${competition.name} Emblem`} className="w-full h-auto object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium">{competition.name}</p>
                  <p className="text-sm text-gray-600 lg:text-xs">{competition.area.name}</p>
                </div>
              </div>
            </div>
          )
        ));
         
    
      return loading ? <Spinner/>:(
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          {renderer}
        </div>
        
        
      )
}

export default Leagues