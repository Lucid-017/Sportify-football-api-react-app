import axios from 'axios'
import {useState,useEffect,useContext} from 'react'
import SportifyContext from '../context/SportifyContext'
import Spinner from '../Spinner'


const Standings = () => {
    const [standings,setStandings]=useState([])
    const [loading,setLoading]= useState(true)
   
    const {FOOTBALL_API_TOKEN,FOOTBALL_API_URL,setSelectedLeague,selectedLeague}= useContext(SportifyContext)
    console.log(selectedLeague)
    

    const getStanding= async()=>{
        // const response = await fetch(`${FOOTBALL_API_URL}/${selectedLeague}/standings`,{
        //   method:'GET',
        //   headers:{
        //     'X-Auth-Token': `${FOOTBALL_API_TOKEN}`, 
        //   }
        // })
      // const response = await axios.get({
      //   url:FOOTBALL_API_URL,
      //   method:'GET',
      //   headers:{
      //     'X-Auth-Token': `${FOOTBALL_API_TOKEN}`,
      //     'Content-type':'application/json'
      //   }
      // })
      // const response = await axios({ 
      //   method: 'get', 
      //   url: `${FOOTBALL_API_URL}/${selectedLeague}/standings`, 
      //   headers: { 'X-Auth-Token': `${FOOTBALL_API_TOKEN}`} })
      //  const options = {
      //   headers: {"X-Auth-Token": `${FOOTBALL_API_TOKEN}`}
      // }
       const response = await axios.get(`${FOOTBALL_API_URL}/${selectedLeague}/standings`,{
             method: 'get', 
               headers: { 'X-Auth-Token': `${FOOTBALL_API_TOKEN}`}
       } );
        console.log(response)
        const data = await response.data
        
         setLoading(true)

        if(data){
          setStandings(data.standings[0].table)
          localStorage.setItem('api_data',data)
        }else{
          const data = JSON.parse(localStorage.getItem('api_data'))
          JSON.stringify(data)
          setStandings(data.standings[0].table)
        }

      }
      console.log('standings =========',standings)
    useEffect(()=>{
      setLoading(false)
      setSelectedLeague(selectedLeague)
      getStanding()
    },[])

        const renderer = standings?.map((item)=>(
          <tbody className=" divide-gray-100 hover:shadow-lg lg:px-4" key={item.position}>
            
                  <tr className="border-b">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{item.position}</p>
                    </td>
                    <td className="flex p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="img w-10">
                        <img src={item.team.crest} alt="emblem" /> 
                      </div>
                      <div className="self-center pl-3">
                      {selectedLeague == 'CL' &&(
              <p>noodles</p>
            )}
                        <p className='uppercase'>{item.team.name}</p>
                      </div>
                      
                      
                    </td>
                    <td className="p-3 text-sm text-gray-700">{item.playedGames}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{item.won}</p>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.draw}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.lost}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.goalsFor}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.goalsAgainst}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.points}
                    </td>
                  </tr>
                </tbody>

        ))


  return !loading ? <Spinner/>: (
    <>
    <div className="rounded shadow-2xl mt-5">
            <div className="overflow-x-auto lg:overflow-x-hidden md:overflow-x-hidden overflow-hidden  md:block px-2">
              <table className="w-full ">
                <thead className="border-b border-gray-500 ">
                  <tr className='text-ash-900 font-semi-bold'>
                    <th className="w-6 text-sm  tracking-wide"></th>
                    <th className="w-40 pl-3 text-sm font-semibold tracking-wide text-left">
                      Team
                    </th>
                    <th className="w-6  text-sm font-semibold tracking-wide text-left">
                      MP
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      W
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      D
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      L
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      GF
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      GA
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      Pts
                    </th>
                  </tr>
                </thead>
                {renderer}
              </table>
            </div>
          </div>
    
    </>
  
  )
}

export default Standings
