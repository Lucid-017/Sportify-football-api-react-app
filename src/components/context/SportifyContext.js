import { createContext, useState } from "react";
import axios from "axios";

const SportifyContext = createContext();

export const SportifyProvider = ({ children }) => {
  const FOOTBALL_API_URL = process.env.REACT_APP_FOOTBALL_API_URL;
  const FOOTBALL_API_TOKEN = process.env.REACT_APP_FOOTBALL_API_TOKEN;

  const [selectedLeague, setSelectedLeague] = useState({});
  const [loading, setLoading] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [matchday, setMatchDay] = useState([]);
  const [matches, setMatches] = useState([]);
  const [LeagueName, setSelectedLeagueName] = useState([]);
  const area_ids = [2072, 2114, 2163, 2077, 2081, 2088, 2187, 2224];

  const urlCompetitions = 'http://localhost:5000/api/competitions'
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(urlCompetitions);
      console.log(response);
      const results = response.data.competitions.filter((competition) =>
        area_ids.includes(competition.area.id)
      );
      console.log("testing the filtering results", results);
      setCompetitions(results);
    } catch (error) {
      // if get data fails
      console.log(error);
    }
    setLoading(false);
  };

  const getMatches = async () => {
    setLoading(true);
    try {
      // get matches based on the selected league
      const response = await axios.get(
        `${urlCompetitions}/${selectedLeague}/matches`);
      console.log("checking getmatch response", response);
      const data = response.data;
      console.log("checking response.data", data);
      // set matchday
      const originmatchday = data.matches[0].season.currentMatchday;
      setMatchDay(originmatchday);
      // filter matches by matchday
      const filter = data.matches.filter((match) => {
        return originmatchday === match.matchday;
      });

      // log the filtered array
      console.log("filtered array", );

      setMatches(filter);
      localStorage.setItem("matches",JSON.stringify(filter))
      setLoading(false)
    } catch (error) {
      // if getting matches fails, get from local storage
      try {
        const localStorageMatch = localStorage.getItem("matches")
        if(localStorageMatch){
          setMatches(localStorageMatch)
        }
        
      } catch (error) {
        console.log('could not get matches from local storage - ', error)
      }
    }
    setLoading(false);

  };

  return (
    <SportifyContext.Provider
      value={{
        getData,
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
      }}
    >
      {children}
    </SportifyContext.Provider>
  );
};
export default SportifyContext;
