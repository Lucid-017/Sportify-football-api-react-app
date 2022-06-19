import { createContext,useState } from "react";
import axios from "axios";



const SportifyContext = createContext()

export const SportifyProvider = ({children})=>{
    const FOOTBALL_API_URL = "https://calm-beyond-10739.herokuapp.com/https://api.football-data.org/v4/competitions"
    const FOOTBALL_API_TOKEN =  "45791bf74cd84c28aca251abe88efd6b"

    const [selectedLeague,setSelectedLeague]=useState({})
    const [loading,setLoading]= useState(false)
    const [competitions,setCompetitions]= useState([])
    const [matchday,setMatchDay]=useState([])
    const [matches,setMatches]=useState([])
    const [season,setSeason]=useState([])
    const [LeagueName,setSelectedLeagueName]=useState([])
    const area_ids= [2072,2114,2163,2077,2081,2088,2187,2224]

    console.log(season)


//   
const test = async () =>{
    
    const response = await fetch(`${FOOTBALL_API_URL}`,{

      headers:{
        'X-Auth-Token': `${FOOTBALL_API_TOKEN}`,
       
      }
      
    })
         const data = await response.json().catch(err=>{
          console.log(err.message)
         })
         
         setLoading(true)
         const results = data.competitions.filter((competition)=>(
          area_ids.includes(competition.area.id)
         ))
         console.log(results)

         setCompetitions(results)
         console.log(data)
}

const getMatches= async()=>{
       const response = await axios.get(`${FOOTBALL_API_URL}/${selectedLeague}/matches?matchday=${matchday}`,{
             method: 'get', 
               headers: { 'X-Auth-Token': `${FOOTBALL_API_TOKEN}`}
       } );
        console.log(response)
        const data = await response.data
        
         setLoading(true)
         setSeason(data.matches[0].season.id)
         setMatchDay(data.matches[0].season.currentMatchday)
        //  console.log
        //  const results = data.matches.filter((matches)=>(
        //   matches.includes(matchday)
        //  ))
        if(data){
          setMatches(data.matches)
          localStorage.setItem('api_match',data)
        }else{
          data = JSON.parse(localStorage.getItem('api_match'))
          JSON.stringify(data)
          setMatches(data.matches)
        }

      
      }
    
// get matches & matchday
// const getMatches= async()=>{
//     const response = await fetch(`${FOOTBALL_API_URL}/${selectedLeague}/matches`,{
//       headers:{
//         'X-Auth-Token': `${FOOTBALL_API_TOKEN}`, 
//       }
//     })
//     const data = await response.json().catch(err=>{
//       console.log(err.message)
//      })
//      setLoading(false)
//      setMatchDay(data.matches[0].season.currentMatchday)
//     setMatches(data)
//     console.log(data[0])
//   }


    return <SportifyContext.Provider value={{
        test,
        setSelectedLeague,
        setSelectedLeagueName,
        getMatches,
        matchday,
        matches,
        LeagueName,
        FOOTBALL_API_TOKEN,
        FOOTBALL_API_URL,
        selectedLeague,
        loading,
        competitions,

    }}>
        {children}
    </SportifyContext.Provider>
}
export default SportifyContext
