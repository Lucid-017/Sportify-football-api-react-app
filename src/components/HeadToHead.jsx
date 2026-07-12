import React from "react";
import { useContext } from "react";
import SportifyContext from "./context/SportifyContext";
import Spinner from "./Spinner";
import MatchCard from "./MatchCard";

const HeadToHead = () => {
  const { loading, matches } = useContext(SportifyContext);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default HeadToHead;
