import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SportifyContext from "../context/SportifyContext";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";
import  './css/Standings.css'


const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [fiveMatches, setFiveMatches] = useState([]);
  const [europestandings, setEuropestandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams(); // get selected league param
  const { selectedLeague } = useContext(SportifyContext);
  // set active for filter
  const [active, setActive] = useState('Full');
  const tabs = ['Full','Short','Form']
  console.log(selectedLeague);

  const getStanding = async () => {
    setLoading(true);
    console.log(name, "standing param");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/competitions/${selectedLeague}/standings`
      );
      // console.log(response)
      setEuropestandings(response.data.standings[0].table);
      console.log(response.data.standings[0].table);
      setStandings(response.data.standings[0].table);
      console.log("europe standings", europestandings);

      localStorage.setItem("api_data", JSON.stringify(response.data));

      const regularSeasonStandings = response.data.standings.find(
        (standing) => standing.stage === "REGULAR_SEASON"
      );
      const standingsData = regularSeasonStandings
      ? regularSeasonStandings.table
      : [];
      setStandings(response.data.standings[0].table);

      // only fetch for top 5 teams
      const top5Teams = standingsData.slice(0, 1);
      // for each team, fetch matches with rate limiting
      const teamMatches = await Promise.all(
        top5Teams.map(async (club)=>{
          // create a token to hold all team matches by their id
          const storageToken = `last5Matches_${club.team.id}`
          try{
            const response = await axios.get(`http://localhost:5000/api/teams/${club.team.id}/matches`)
            console.log(response.data, `matches for ${club.team.name}`) //i cant see this
            // store response in local storage
            localStorage.setItem(storageToken,JSON.stringify({
              team:club.team.name,
              matches:response.data
            }))

            return {team:club.team.name , matches: response.data} 

          }catch(err){
            console.log(err, 'could not get matches for team')
            // if apiCall fails, get from local storage
            try {
              const teamLc = localStorage.getItem(storageToken)
              if(teamLc){
                const parse = JSON.parse(teamLc)
                console.log(parse, 'loaded team form from local storage')
                return parse;
              }   
            } catch (error) {
              console.log('Couldnt retrieve team form from local storage',error)
            }

            return { team: club.team.name, matches: [] };//fallback
          }
        })
      )
      console.log(teamMatches,'team matches') //this is retruning null, help
      setFiveMatches(teamMatches);

      setLoading(false);
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
      setLoading(false);
    }
  };

  

    // utility to get last 5 matches for a team
    // function getLast5Results(teamName, matchesData) {
    //   if (!matchesData?.matches) return [];
    
    //   return matchesData.matches
    //     .filter(match => match.status === "FINISHED")
    //     .filter(match => match.homeTeam.name === teamName || match.awayTeam.name === teamName)
    //     .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate)) // Newest first
    //     .slice(0, 5)
    //     .map(match => {
    //       const isHome = match.homeTeam.name === teamName;
    //       const teamGoals = isHome ? match.score.fullTime.home : match.score.fullTime.away;
    //       const opponentGoals = isHome ? match.score.fullTime.away : match.score.fullTime.home;
    
    //       if (teamGoals > opponentGoals) return "W";
    //       if (teamGoals < opponentGoals) return "L";
    //       return "D";
    //     });
    // }
    function getLast5Results(teamName, teamMatches) {
      const teamData = teamMatches.find(t => t.team === teamName);
      if (!teamData || !teamData.matches || !Array.isArray(teamData.matches.matches)) return [];
    
      return teamData.matches.matches
        .filter(match => match.status === "FINISHED")
        .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
        .slice(-5)
        .map(match => {
          const isHome = match.homeTeam.name === teamName;
          const teamGoals = isHome ? match.score.fullTime.home : match.score.fullTime.away;
          const opponentGoals = isHome ? match.score.fullTime.away : match.score.fullTime.home;
          
          let result = "D"; // Default to Draw
          if (teamGoals > opponentGoals) result = "W";
          if (teamGoals < opponentGoals) result = "L";

          return {
            // return the match result and competition code
            competition: match.competition.code,
            result
          }

        });
    }
    

  // console.log('standings =========',standings)
  useEffect(() => {
    setLoading(false);
    // setSelectedLeague(selectedLeague);
    getStanding();
  }, [name]);

  const NotRegularSeasonCompetion = europestandings.map((item) => (
    <div className="rounded custom-shadow mt-5 mb-8 p-5">
      <div className="overflow-x-auto lg:overflow-x-hidden md:overflow-x-hidden overflow-hidden  md:block px-2">
        <table className="w-full ">
          <thead className="border-b border-gray-500 ">
            <p className="text-xl pb-10 font-medium">{item.group}</p>
            <tr className="text-ash-900 font-semi-bold ">
              <th className="w-6 text-base  tracking-wide"></th>
              <th className="w-40 pl-3 text-base font-medium tracking-wide text-left">
                Team
              </th>
              <th className="w-6  text-base font-medium tracking-wide text-left">
                MP
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
                W
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
                D
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
                L
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left hidden">
                GF
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
                GA
              </th>
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
                Pts
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  ));


  // normal competitions
  const regularSeason = standings.map((item) => (
    <tbody
      className=" divide-gray-100 lg:px-4"
      key={item.position}
    >
      <tr className="border-b">
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <p>{item.position}</p>
        </td>
        <td className="flex p-3 text-sm text-gray-700 whitespace-nowrap">
          <div className="img w-10">
            <img src={item.team.crest} className="w-[3vw] min-w-6" alt="emblem" />
          </div>
          <div className="self-center pl-3">
            <p className="uppercase hidden lg:block">{item.team.name}</p>
            <p className="uppercase hidden md:block lg:hidden">{item.team.shortName}</p>
            <p className="uppercase md:hidden">{item.team.tla}</p>
          </div>
        </td>
        {active === 'Short' && (
          <>
            <td className="p-3 text-sm text-gray-700">{item.playedGames}</td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {item.goalsFor}
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {item.points}
        </td>
          </>
        )}
        {active === 'Full' && (
          <>
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
          </>
        )}
        {active === 'Form' && (
          <>
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
        <td className="p-3 text-sm whitespace-nowrap">
  <div className="flex space-x-1">
  {getLast5Results(item.team.name, fiveMatches).map((match, index) => (
  // match.competition.code === selectedLeague && (
    <span
      key={index}
      className={`
        w-5 h-5 text-xs text-white font-bold rounded-full flex items-center justify-center
        ${match.result === "W" ? "bg-green-500" : match.result === "L" ? "bg-red-500" : "bg-gray-400"}
      `}
    >
      {match.result}
    </span>
  // )
))}
  </div>
</td>
          </>
        )}
      </tr>
    </tbody>
  ));


  return loading ? (
    <Spinner />
  ) : (
    <div className="p-4">
      {selectedLeague === "CL" || selectedLeague === "EC" ? ( //if the selected league is champions league, the table will be a different format
        <div className="">{NotRegularSeasonCompetion}</div>
      ) : (
        <>
          <div>
            <div className="overflow-x-auto lg:overflow-x-hidden md:overflow-x-hidden overflow-hidden  md:block px-2">
              {/* filter */}
              <div className="filter ">
                <div className="flex text-white bg-gray-500 rounded-3xl items-center space-x-3 w-fit ">
                  {tabs.map(tab => (
                    <button key={tab} onClick={()=>setActive(tab)}
                    className={`rounded-3xl transition duration-200 ${active === tab ? "bg-gray-300 px-2  font-semibold":"bg-gray-500 px-2 "}`}>{tab}</button>
                  ))}
                </div>
              </div>
              {/* table */}
              <table className="w-full">
                <thead className="border-b border-gray-400 ">
                  <tr className="text-ash-900 font-semi-bold">
                    <th className="w-6 text-sm "></th>
                    {/*  --tracking-wide */}
                    <th className="w-40 pl-3 text-sm font-semibold tracking-wide text-left">
                      Team
                    </th>
                    {active === 'Short' && (
                      <>
                       <th className="w-6  text-sm font-semibold tracking-wide text-left">
                      MP
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      GF
                    </th>
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      Pts
                    </th>
                      </>
                    )}
                    {active === 'Full' && (
                      <>
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
                      </>
                    )}
                    {active === 'Form' && (
                      <>
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
                    <th className="w-6 p-3 text-sm font-semibold tracking-wide text-left">
                      Form
                    </th>
                      </>
                    )}
                  </tr>
                </thead>
                {regularSeason}
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Standings;
