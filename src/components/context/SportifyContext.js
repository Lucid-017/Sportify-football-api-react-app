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
  // full, unfiltered season fetch (every matchday + knockout stage) that
  // getMatches() pulls down; matchday/knockout views are just filters over this
  const [allMatches, setAllMatches] = useState([]);
  // which league allMatches currently holds data for, so switching between
  // the Matches/Knockout tabs re-uses it instead of re-hitting the API
  const [matchesLeague, setMatchesLeague] = useState(null);
  const [standings, setStandings] = useState([]);
  const [europestandings, setEuropestandings] = useState([]);
  const [fiveMatches, setFiveMatches] = useState([]);
  const [standingsLoading, setStandingsLoading] = useState(true);
  // which league `standings`/`europestandings`/`fiveMatches` belong to, so
  // revisiting the Standings tab re-uses it instead of re-hitting the API
  // (and re-triggering the rate-limited /teams/:id/matches call)
  const [standingsLeague, setStandingsLeague] = useState(null);
  const [scorers, setScorers] = useState([]);
  const [scorersLoading, setScorersLoading] = useState(true);
  // which league `scorers` belongs to, so revisiting the Stats tab re-uses
  // it instead of re-hitting the API
  const [scorersLeague, setScorersLeague] = useState(null);
  const [LeagueName, setSelectedLeagueName] = useState([]);
  const area_ids = [2220,2267,2032,2072, 2114, 2163, 2077, 2081, 2088, 2187, 2224];

  const urlCompetitions = process.env.REACT_APP_FOOTBALL_API_URL + "/api/competitions";
  const getData = async () => {
    // Leagues.jsx (rendered on Home) re-mounts and re-runs this every time
    // you navigate back to "/" — the competitions list barely ever changes,
    // so skip the call once we already have it.
    if (competitions.length > 0) {
      setLoading(false);
      return;
    }
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
    // Matches and Knockout are separate tabs that both call getMatches() on
    // mount; without this guard, flipping between them re-fetches the whole
    // season from the API every time, burning the rate limit for no reason.
    if (matchesLeague === selectedLeague && allMatches.length > 0) {
      setLoading(false);
      return;
    }
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
      setAllMatches(data.matches);
      setMatchesLeague(selectedLeague);
      // filter matches by matchday
      const filter = data.matches.filter((match) => {
        return originmatchday === match.matchday;
      });

      setMatches(filter);
      localStorage.setItem("matches",JSON.stringify(filter))
      localStorage.setItem("allMatches",JSON.stringify(data.matches))
      setLoading(false)
    } catch (error) {
      // if getting matches fails, get from local storage
      try {
        const localStorageMatch = localStorage.getItem("matches")
        if(localStorageMatch){
          setMatches(JSON.parse(localStorageMatch))
        }
        const localStorageAllMatches = localStorage.getItem("allMatches")
        if(localStorageAllMatches){
          setAllMatches(JSON.parse(localStorageAllMatches))
        }
      } catch (error) {
        console.log('could not get matches from local storage - ', error)
      }
    }
    setLoading(false);

  };

  // switch the visible "Matches" tab to a different matchday without
  // re-fetching: getMatches() already pulled the whole season down
  const selectMatchday = (day) => {
    setMatchDay(day);
    setMatches(allMatches.filter((match) => match.matchday === day));
  };

  const getStanding = async () => {
    // revisiting the Standings tab remounts the component; skip the network
    // round-trip (and the rate-limited /teams/:id/matches call below) if we
    // already have this competition's standings cached
    if (standingsLeague === selectedLeague && standings.length > 0) {
      setStandingsLoading(false);
      return;
    }
    setStandingsLoading(true);
    try {
      const response = await axios.get(
        `${urlCompetitions}/${selectedLeague}/standings`
      );
      // group-stage competitions (CL/EC/WC) return one standings entry per
      // group (e.g. "Group A"); keep the whole group list, not just one table
      const groupStandings = response.data.standings.filter((standing) => standing.group);
      setEuropestandings(groupStandings);
      setStandings(response.data.standings[0].table);
      setStandingsLeague(selectedLeague);

      localStorage.setItem("api_data", JSON.stringify(response.data));

      const regularSeasonStandings = response.data.standings.find(
        (standing) => standing.stage === "REGULAR_SEASON"
      );
      const standingsData = regularSeasonStandings
        ? regularSeasonStandings.table
        : [];

      // only fetch for the top team
      const top5Teams = standingsData.slice(0, 1);
      // for each team, fetch matches with rate limiting
      const teamMatches = await Promise.all(
        top5Teams.map(async (club) => {
          // create a token to hold all team matches by their id
          const storageToken = `last5Matches_${club.team.id}`;
          try {
            const response = await axios.get(`${FOOTBALL_API_URL}/api/teams/${club.team.id}/matches`);
            // store response in local storage
            localStorage.setItem(storageToken, JSON.stringify({
              team: club.team.name,
              matches: response.data
            }));

            return { team: club.team.name, matches: response.data };

          } catch (err) {
            // if apiCall fails, get from local storage
            try {
              const teamLc = localStorage.getItem(storageToken);
              if (teamLc) {
                return JSON.parse(teamLc);
              }
            } catch (error) {
              console.log('Couldnt retrieve team form from local storage', error);
            }

            return { team: club.team.name, matches: [] }; //fallback
          }
        })
      );
      setFiveMatches(teamMatches);

      setStandingsLoading(false);
    } catch (error) {
      console.log("something went wrong", error);
      // if api calls fails
      try {
        const data = JSON.parse(localStorage.getItem("api_data"));
        if (data && data.standings) {
          const regularSeasonStandings = data.standings.find(
            (standing) => standing.stage === "REGULAR_SEASON"
          );
          setStandings(
            regularSeasonStandings ? regularSeasonStandings.table : []
          );
        }
      } catch (error) {
        console.log(error, "could not retrieve data from local storage");
      }
      setStandingsLoading(false);
    }
  };

  const getScorers = async () => {
    // revisiting the Stats tab remounts the component; skip the network
    // round-trip if we already have this competition's scorers cached
    if (scorersLeague === selectedLeague && scorers.length > 0) {
      setScorersLoading(false);
      return;
    }
    setScorersLoading(true);
    try {
      const response = await axios.get(`${urlCompetitions}/${selectedLeague}/scorers`);
      setScorers(response.data.scorers || []);
      setScorersLeague(selectedLeague);
      localStorage.setItem("scorers", JSON.stringify(response.data.scorers || []));
      setScorersLoading(false);
    } catch (error) {
      console.log("could not fetch scorers", error);
      try {
        const localScorers = localStorage.getItem("scorers");
        if (localScorers) {
          setScorers(JSON.parse(localScorers));
        }
      } catch (err) {
        console.log('could not get scorers from local storage - ', err);
      }
      setScorersLoading(false);
    }
  };

  return (
    <SportifyContext.Provider
      value={{
        getData,
        setSelectedLeague,
        setSelectedLeagueName,
        getMatches,
        selectMatchday,
        matchday,
        matches,
        allMatches,
        getStanding,
        standings,
        europestandings,
        fiveMatches,
        standingsLoading,
        getScorers,
        scorers,
        scorersLoading,
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
