import React from 'react'
import {useEffect,useContext} from 'react'
import SportifyContext from './context/SportifyContext'
import Spinner from './Spinner'

const HeadToHead = () => {
   
    const {loading,selectedLeague,matches}= useContext(SportifyContext)
   
    console.log(selectedLeague)


  return loading ? <Spinner/>: (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
        {matches.map((match)=>(
        <div className="p-5 border-b border-r" key={match.id}>
            <div className="flex justify-between relative">
                <div className="teams">
                    <div className="team1 mb-3">
                            <div className="flex gap-x-1.5">
                                <img className='w-6' src={match.homeTeam.crest} alt="" />
                                <p className='font-light self-center'>{match.homeTeam.name}</p>
                                
                            </div>
                        </div>
                        <div className="team2">
                            <div className="flex gap-x-1.5">
                                <img className='w-6' src={match.awayTeam.crest} alt="" />
                                <p className='font-light self-center'>{match.awayTeam.name}</p>
                                
                            </div>
                    </div>
                </div>
                <div className="scores absolute right-16">
                                <div className="score mb-3">
                                    {match.score.fullTime.home && (
                                    <p>{match.score.fullTime.home}</p>
                                )}
                                </div>
                                <div className="score">
                                    {match.score.fullTime.away && (
                                    <p>{match.score.fullTime.away}</p>
                                )}
                                </div>

                </div>
                
                   
                    
                    <div className="matchday justify-end border-l pl-2">
                        {match.score.fullTime &&(
                            <p>FT</p>
                        )}
                        
                        <p className='data'>{match.utcDate.slice(5,10)}</p>
                        <p className='time'>{match.utcDate.slice(11,16)}</p>
                        
                    </div>      
            </div>
            
        </div>
    ))}
    
    </div>
  )
}

export default HeadToHead