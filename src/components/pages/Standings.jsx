import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SportifyContext from "../context/SportifyContext";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [europestandings, setEuropestandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams(); // get selected league param
  const {setSelectedLeague,selectedLeague} = useContext(SportifyContext);
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
      setStandings(response.data.standings[0].table);
      setLoading(false)
    } catch (error) {
      console.log("something went wrong", error);
      // if api calls fails
      try {
        const data = JSON.parse(localStorage.getItem("api_data"));
        if (data && data.standings) {
          const regularSeasonStandings = data.standings.find(
            (standing) => standing.stage === "REGULAR_SEASON"
          );
          setStandings(regularSeasonStandings ? regularSeasonStandings.table : []);
        }
      } catch (error) {
        console.log(error, "could not retrieve data from local storage");
      }
      setLoading(false)
    }
  };
  // console.log('standings =========',standings)
  useEffect(() => {
    setLoading(false);
    setSelectedLeague(selectedLeague);
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
              <th className="w-6 p-3 text-base font-medium tracking-wide text-left">
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
      className=" divide-gray-100 hover:shadow-lg lg:px-4"
      key={item.position}
    >
      <tr className="border-b">
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <p>{item.position}</p>
        </td>
        <td className="flex p-3 text-sm text-gray-700 whitespace-nowrap">
          <div className="img w-10">
            <img src={item.team.crest} alt="emblem" />
          </div>
          <div className="self-center pl-3">
            <p className="uppercase">{item.team.name}</p>
          </div>
        </td>
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
          <div className="rounded shadow-2xl mt-5">
            <div className="overflow-x-auto lg:overflow-x-hidden md:overflow-x-hidden overflow-hidden  md:block px-2">
              <table className="w-full ">
                <thead className="border-b border-gray-500 ">
                  <tr className="text-ash-900 font-semi-bold">
                    <th className="w-6 text-sm  tracking-wide"></th>
                    <th className="w-40 pl-3 text-sm font-semibold tracking-wide text-left">
                      Team
                    </th>
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
