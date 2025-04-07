import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// load env variables
dotenv.config({path: '../.env'}); //path to env
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()) //let frontend access this backend

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
app.get('/api/teams/:team/matches',async(req,res)=>{
    const {teamID}=req.params;

        try {
            const response = await axios.get(
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