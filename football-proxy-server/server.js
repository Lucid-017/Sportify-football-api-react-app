import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import Bottleneck from 'bottleneck';

// load env variables
dotenv.config({path: '../.env'}); //path to env
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()) //let frontend access this backend

// allow 1 request per 4seconds
const limiter = new Bottleneck({
  minTime:6000, //4000 ms = 4s
  maxConcurrent:1 //only one request at a time
})

// wrap axios request
const limitedAxios = limiter.wrap(axios.get)
// 
console.log('Football API URL:', process.env.REACT_APP_FOOTBALL_API_URL);
console.log('Football API Token:', process.env.REACT_APP_FOOTBALL_API_TOKEN);

// test server health http://localhost:5000/health
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
  });

// FETCH COMPETITIONS http://localhost:5000/api/competitions
app.get('/api/competitions',async(req,res)=>{
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FOOTBALL_API_URL}`,
                {
                  headers: {
                    "X-Auth-Token": process.env.REACT_APP_FOOTBALL_API_TOKEN,
                  },
                }
              );
            //   parse data
            res.json(response.data)
        } catch (error) {
          // if get data fails
          res.status(error.response?.status || 500).json({error:"Something went wrong",error})
        }
})

// GET LEAGUE STANDINGS
app.get('/api/competitions/:name/standings',async(req,res)=>{
    const {name}=req.params;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FOOTBALL_API_URL}/${name}/standings`,
                {
                  headers: {
                    "X-Auth-Token": process.env.REACT_APP_FOOTBALL_API_TOKEN,
                  },
                }
              );
            //   parse data
            res.json(response.data)
        } catch (error) {
          // if get data fails
          res.status(error.response?.status || 500).json({error:"Something went wrong",error})
        }
})
// GET LEAGUE MATCHES
app.get('/api/competitions/:name/matches',async(req,res)=>{
    const {name}=req.params;
  console.log(name,'name param')
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FOOTBALL_API_URL}/${name}/matches`,
                {
                  headers: {
                    "X-Auth-Token": process.env.REACT_APP_FOOTBALL_API_TOKEN,
                  },
                }
              );
            //   parse data
            res.json(response.data)
        } catch (error) {
          // if get data fails
          res.status(error.response?.status || 500).json({error:"Something went wrong",error})
        }
})
// GET team MATCHES
app.get('/api/teams/:teamID/matches',async(req,res)=>{
    const {teamID}=req.params;
    console.log(teamID, 'Team id')
        try {
            const response = await limitedAxios(
                `https://api.football-data.org/v4/teams/${teamID}/matches`,
                {
                  headers: {
                    "X-Auth-Token": process.env.REACT_APP_FOOTBALL_API_TOKEN,
                  },
                }
              );
            //   parse data
            res.json(response.data)
            console.log(`Fetching matches for team ${teamID}`);
        } catch (error) {
          // if get data fails
          res.status(error.response?.status || 500).json({error:"Something went wrong",error})
        }
})

app.listen(PORT,()=>{
    console.log('proxyserver running on host:',PORT)
})