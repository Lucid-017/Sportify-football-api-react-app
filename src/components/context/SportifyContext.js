import { createContext,useState } from "react";



const SportifyContext = createContext()

export const SportifyProvider = ({children})=>{
    const FOOTBALL_API_URL = "https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions"
    const FOOTBALL_API_TOKEN =  "45791bf74cd84c28aca251abe88efd6b"

    
    const [selectedLeague,setSelectedLeague]=useState({})
    const [loading,setLoading]= useState(true)
    const [competitions,setCompetitions]= useState([])


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
         
         setLoading(false)
         setCompetitions(data.competitions)
         console.log(data)
}


    return <SportifyContext.Provider value={{
        test,
        setSelectedLeague,
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