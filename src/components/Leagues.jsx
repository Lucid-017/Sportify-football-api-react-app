import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import SportifyContext from './context/SportifyContext'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
const Leagues = () => {
    const {test,setSelectedLeagueName,loading,competitions,setSelectedLeague}=useContext(SportifyContext)

        // const {position,team,playedGames,
        //       won,draw,lose,points,
        //       goalsFor,goalsAgainst}=standings
        // console.log(getStanding())

        useEffect(() => {
         test()
        },[]);

        const filter =competitions.filter((competition)=>(
         console.log(competition.area.id) 
        ))
        console.log(filter)
      // console.log(test())
    const renderer= competitions.map((competition)=>(
        <div className=" h-3/4 " key={competition.name}>
            <div className="cursor-pointer shadow-xl hover:shadow-2xl lg:p-8 md:p-10 p-8 h-40 md:h-40 lg:h-36" >
         <div className="flex gap-3">
         <div className=" w-28 md:w-36 lg:w-24 self-center justify-self-center">
           <img className='' src={competition.emblem} alt="emblem" />
         </div>
         <div className="league" onClick={()=>
         {setSelectedLeague(competition.code)
         setSelectedLeagueName(competition.name)}
        }>
          <Link to={`/competitions/${competition.id}`}>
            <p className='text-lg font-medium '>{competition.name}</p>
            <p className='text-xs'>{competition.area.name}</p>
          </Link>
         </div>
         </div>
         
      </div>
        </div>
      
    ))
    
      return !loading ? <Spinner/>:(
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
          {renderer}
        </div>
        
        
      )
}

export default Leagues