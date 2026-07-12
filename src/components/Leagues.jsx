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
        const europe = ['EC','CL']
        const renderer = competitions.map(competition => (
          competition.plan === 'TIER_ONE' && !competition.code.includes(europe[0]) && !competition.code.includes(europe[1]) &&(
            <div
              key={competition.id}
              onClick={() => handleNavigate(competition)}
              className="cursor-pointer rounded-lg border border-gray-200 p-4 flex gap-4 items-center transition-all hover:border-zest-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-ash-100">
                <img src={competition.emblem} alt={`${competition.name} Emblem`} className="w-10 h-10 object-contain" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-base font-medium text-Darkblue-800 truncate">{competition.name}</p>
                <p className="text-sm text-ash-800">{competition.area.name}</p>
              </div>
            </div>
          )
        ));


      return loading ? <Spinner/>:(

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
          {renderer}
        </div>


      )
}

export default Leagues