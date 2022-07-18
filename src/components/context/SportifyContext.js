import { createContext,useState } from "react";
import axios from "axios";
import { match } from "assert";



const SportifyContext = createContext()

export const SportifyProvider = ({children})=>{
    const FOOTBALL_API_URL = "https://calm-beyond-10739.herokuapp.com/https://api.football-data.org/v4/competitions"
    const FOOTBALL_API_TOKEN =  "45791bf74cd84c28aca251abe88efd6b"

    const [selectedLeague,setSelectedLeague]=useState({})
    const [loading,setLoading]= useState(false)
    const [competitions,setCompetitions]= useState([])
    const [matchday,setMatchDay]=useState([])
    const [matches,setMatches]=useState([])
    const [LeagueName,setSelectedLeagueName]=useState([])
    const area_ids= [2072,2114,2163,2077,2081,2088,2187,2224]



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
         console.log('testing the filtering results',results)

         setCompetitions(results)
         console.log(data)
}

const getMatches= async()=>{
  setLoading(true)
  const response = await axios.get(`${FOOTBALL_API_URL}/${selectedLeague}/matches`,{
        method: 'GET', 
          headers: { 'X-Auth-Token': `${FOOTBALL_API_TOKEN}`}
  } );
    console.log('checking getmatch response',response)
   const data = response.data
   console.log('checking response.data',data)
  
   setLoading(false)
    
    // set matchday
    const originmatchday = data.matches[0].season.currentMatchday
    setMatchDay(originmatchday)
    // filter matches by matchday
    const filter = data.matches.filter((match)=>{
      return  originmatchday === match.matchday
  })

    // log the filtered array
    console.log('filtered array',filter)

   setMatches(filter)

 
 }
    

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
