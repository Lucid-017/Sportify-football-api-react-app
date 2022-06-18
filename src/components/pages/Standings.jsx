import {useState,useEffect,useContext} from 'react'
import SportifyContext from '../context/SportifyContext'

const Standings = () => {
    const [standings,setStandings]=useState([])
    const [loading,setLoading]= useState(true)
    const {FOOTBALL_API_TOKEN,FOOTBALL_API_URL,selectedLeague}= useContext(SportifyContext)
    console.log(selectedLeague)

    const getStanding= async()=>{
        const response = await fetch(`${FOOTBALL_API_URL}/${selectedLeague}/standings`,{
          headers:{
            'X-Auth-Token': `${FOOTBALL_API_TOKEN}`, 
          }
        })
        const data = await response.json().catch(err=>{
          console.log(err.message)
         })
         setLoading(false)
        setStandings(data.standings)
        console.log(data)
      }

    useEffect(()=>{
      getStanding()
    },[])

        const renderer = standings.map((item)=>(
<div className="rounded shadow-2xl mt-5">
            <div className="overflow-auto  md:block px-2">
              <table className="w-full ">
                <thead className="border-b border-gray-500 ">
                  <tr>
                    <th className="w-6 text-sm  tracking-wide"></th>
                    <th className="w-40 px-10 text-sm font-semibold tracking-wide text-left">
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
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-red">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{item.table[0].position}</p>
                    </td>
                    <td className="flex p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="img">
                        <img src={item.table[0].team.crest} alt="emblem" />
                      </div>
                      <p>{item.table[0].team.name}</p>
                      
                    </td>
                    <td className="p-3 text-sm text-gray-700">{item.table[0].playedGames}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{item.table[0].won}</p>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.table[0].draw}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.table[0].lost}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.table[0].goalsFor}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.table[0].goalsAgainst}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.table[0].points}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))


  return (
    <>
    {renderer}
    </>
  
  )
}

export default Standings
