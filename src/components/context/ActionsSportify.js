// import axios from 'axios'
// require('dotenv').config()


const FOOTBALL_API_URL = import.meta.env.FOOTBALL_API_URL
const FOOTBALL_API_TOKEN =  import.meta.env.FOOTBALL_API_TOKEN

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
