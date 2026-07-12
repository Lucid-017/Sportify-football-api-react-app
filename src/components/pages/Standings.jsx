import { useState, useEffect, useContext } from "react";
import SportifyContext from "../context/SportifyContext";
import Spinner from "../Spinner";


const Standings = () => {
  const {
    selectedLeague,
    getStanding,
    standings,
    europestandings,
    fiveMatches,
    standingsLoading: loading,
  } = useContext(SportifyContext);
  // set active for filter
  const [active, setActive] = useState('Full');
  const tabs = ['Full','Short','Form']

  // if(w < 640) {
  //   console.log('mobile')
  //   setActive('Short')
  // }
  

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
    

  useEffect(() => {
    getStanding();
  }, [selectedLeague]);

  useEffect(()=>{
    function handleResize() {
      const width = window.innerWidth;
      if(width <=600){
        setActive('Short')
      }else if(width >601  && width <= 941){
        setActive('Full')}
      else if(width > 942){
        setActive('Form')
      }
    }

    handleResize()
    // 
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  const NotRegularSeasonCompetion = europestandings.map((group) => (
    <div key={group.group} className="rounded-lg border border-gray-200 mt-5 p-4 md:p-5">
      <div className="overflow-x-auto thin-scrollbar">
        <table className="w-full">
          <thead className="border-b-2 border-Darkblue-500">
            <tr>
              <th colSpan={9} className="text-left text-lg font-semibold text-Darkblue-800 pb-3">{group.group}</th>
            </tr>
            <tr className="text-ash-800 font-semibold">
              <th className="w-6 text-sm tracking-wide"></th>
              <th className="w-40 pl-3 text-sm font-medium tracking-wide text-left">
                Team
              </th>
              <th className="w-6 text-sm font-medium tracking-wide text-left">
                MP
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                W
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                D
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                L
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                GF
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                GA
              </th>
              <th className="w-6 p-3 text-sm font-medium tracking-wide text-left">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {group.table.map((item) => (
              <tr key={item.position} className="even:bg-ash-50 hover:bg-zest-50 transition-colors">
                <td className="p-3 text-sm text-ash-800 font-medium whitespace-nowrap">{item.position}</td>
                <td className="flex items-center p-3 text-sm text-Darkblue-800 whitespace-nowrap">
                  <img src={item.team.crest} className="w-6 h-6 object-contain shrink-0" alt="emblem" />
                  <span className="pl-3 font-medium truncate">{item.team.shortName || item.team.name}</span>
                </td>
                <td className="p-3 text-sm text-ash-800">{item.playedGames}</td>
                <td className="p-3 text-sm text-ash-800">{item.won}</td>
                <td className="p-3 text-sm text-ash-800">{item.draw}</td>
                <td className="p-3 text-sm text-ash-800">{item.lost}</td>
                <td className="p-3 text-sm text-ash-800">{item.goalsFor}</td>
                <td className="p-3 text-sm text-ash-800">{item.goalsAgainst}</td>
                <td className="p-3 text-sm font-semibold text-Darkblue-800">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ));


  // normal competitions
  const regularSeason = standings.map((item) => (
    <tbody
      className="divide-y divide-gray-100"
      key={item.position}
    >
      <tr className="even:bg-ash-50 hover:bg-zest-50 transition-colors">
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap font-medium">
          <p>{item.position}</p>
        </td>
        <td className="flex items-center p-3 text-sm text-Darkblue-800 whitespace-nowrap">
          <div className="img w-8 shrink-0">
            <img src={item.team.crest} className="w-6 h-6 object-contain" alt="emblem" />
          </div>
          <div className="self-center pl-3 min-w-0">
            <p className="uppercase hidden lg:block truncate font-medium">{item.team.name}</p>
            <p className="uppercase hidden md:block lg:hidden font-medium">{item.team.shortName}</p>
            <p className="uppercase md:hidden font-medium">{item.team.tla}</p>
          </div>
        </td>
        {active === 'Short' && (
          <>
            <td className="p-3 text-sm text-ash-800">{item.playedGames}</td>
            <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.goalsFor}
        </td>
        <td className="p-3 text-sm font-semibold text-Darkblue-800 whitespace-nowrap">
          {item.points}
        </td>
          </>
        )}
        {active === 'Full' && (
          <>
                  <td className="p-3 text-sm text-ash-800">{item.playedGames}</td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          <p>{item.won}</p>
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.draw}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.lost}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.goalsFor}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.goalsAgainst}
        </td>
        <td className="p-3 text-sm font-semibold text-Darkblue-800 whitespace-nowrap">
          {item.points}
        </td>
          </>
        )}
        {active === 'Form' && (
          <>
                  <td className="p-3 text-sm text-ash-800">{item.playedGames}</td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          <p>{item.won}</p>
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.draw}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.lost}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.goalsFor}
        </td>
        <td className="p-3 text-sm text-ash-800 whitespace-nowrap">
          {item.goalsAgainst}
        </td>
        <td className="p-3 text-sm font-semibold text-Darkblue-800 whitespace-nowrap">
          {item.points}
        </td>
        <td className="p-3 text-sm whitespace-nowrap">
  <div className="flex space-x-1">
  {getLast5Results(item.team.name, fiveMatches).map((match, index) => (
  // match.competition.code === selectedLeague && (
    <span
      key={index}
      className={`
        w-5 h-5 text-[11px] text-white font-bold rounded-full flex items-center justify-center shadow-sm
        ${match.result === "W" ? "bg-Limegreen-500" : match.result === "L" ? "bg-red-500" : "bg-ash-800"}
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
    <div className="p-4 md:p-6">
      {["CL", "EC", "WC"].includes(selectedLeague) ? ( //group-stage competitions (Champions League, Euros, World Cup) render one table per group instead of a single league table
        <div className="">
          {europestandings.length > 0 ? (
            NotRegularSeasonCompetion
          ) : (
            <p className="text-ash-800 text-sm py-8 text-center">
              Group stage standings aren't available yet.
            </p>
          )}
        </div>
      ) : (
        <>
          <div>
            <div className="px-1">
              {/* filter */}
              <div className="filter mb-4">
                <div className="inline-flex bg-ash-100 rounded-full items-center p-1 gap-1">
                  {tabs.map(tab => (
                    <button key={tab} onClick={()=>setActive(tab)}
                    className={`rounded-full transition duration-200 px-4 py-1.5 text-sm font-medium ${active === tab ? "bg-Darkblue-800 text-white shadow-sm":"text-ash-800 hover:text-Darkblue-800"}`}>{tab}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto thin-scrollbar rounded-lg border border-gray-200">
              {/* table */}
              <table className="w-full">
                <thead className="border-b-2 border-Darkblue-500 bg-ash-50">
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
