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
              className="cursor-pointer pb-4 border-b-2 border-gray-300"
            >
              <div className="flex gap-4 items-center ">
                <div className="">
                  <img src={competition.emblem} alt={`${competition.name} Emblem`} className=" w-[7vw] min-w-12" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium">{competition.name}</p>
                  <p className="text-sm text-gray-500 lg:text-xs">{competition.area.name}</p>
                </div>
              </div>
            </div>
          )
        ));
         
    
      return loading ? <Spinner/>:(
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-10 mx-auto'>
          {renderer}
        </div>
        
        
      )
}

export default Leagues