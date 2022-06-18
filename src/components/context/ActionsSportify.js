// import axios from 'axios'

const FOOTBALL_API_URL = "http://api.football-data.org/v4/competitions"
const FOOTBALL_API_TOKEN =  "45791bf74cd84c28aca251abe88efd6b"

// testing
export const test = async () =>{

    const response = await fetch(`${FOOTBALL_API_URL}/PL`,{
        headers:{
            'X-Auth-Token': `${FOOTBALL_API_TOKEN}`
        }
    })
         const data = await response.json()
         console.log(data)
}
