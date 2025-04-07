import React from "react";
import { useEffect, useContext } from "react";
import SportifyContext from "./context/SportifyContext";
import Spinner from "./Spinner";

const HeadToHead = () => {
  const { loading, selectedLeague, matches } = useContext(SportifyContext);

  console.log(selectedLeague);

  return loading ? (
    <Spinner />
  ) : (
    <div className="">
      {matches.map((match) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-[auto,auto] justify-between p-5 border-b border-r"
          key={match.id}
        >
          <div className="flex relative pb-4 sm:pb-0">
            <div className="teams">
              <div className="team1 mb-3">
                <div className="flex gap-x-1.5">
                  <img className="w-[3vw] min-w-6" src={match.homeTeam.crest} alt={match.homeTeam.name} />
                  <p className="font-light self-center">
                    {match.homeTeam.name}
                  </p>
                </div>
              </div>
              <div className="team2">
                <div className="flex gap-x-1.5">
                  <img className="w-[3vw] min-w-6" src={match.awayTeam.crest} alt={match.awayTeam.name} />
                  <p className="font-light self-center">
                    {match.awayTeam.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* matchday */}
          <div className="matchday flex gap-2">
            {/* scores */}
            <div className="scores ">
              <div
                className={`homescore score mb-3 ${
                  match.score.fullTime.home > match.score.fullTime.away
                    ? "text-green-500"
                    : match.score.fullTime.home === match.score.fullTime.away
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                {/* {match.score.fullTime.home >  && ( */}
                <p>{match.score.fullTime.home}</p>
                {/* // )} */}
              </div>
              <div
                className={`homescore score ${
                  match.score.fullTime.away > match.score.fullTime.home
                    ? "text-green-500"
                    : match.score.fullTime.home === match.score.fullTime.away
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                <p>{match.score.fullTime.away}</p>
              </div>
            </div>
            <div className=' border-l pl-2'>
              {match.status === "FINISHED" ? <p>FT</p> : <p></p>}

              <p className="data">{match.utcDate.slice(5, 10)}</p>
              <p className="time">{match.utcDate.slice(11, 16)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadToHead;
