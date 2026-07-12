import React from 'react'
import { useContext, useEffect } from 'react'
import SportifyContext from './context/SportifyContext'
import Spinner from './Spinner'

const Stats = () => {
  const { scorersLoading, selectedLeague, setSelectedLeague, getScorers, scorers } = useContext(SportifyContext)

  useEffect(() => {
    setSelectedLeague(selectedLeague)
    getScorers()
  }, [])

  return scorersLoading ? (
    <Spinner />
  ) : (
    <div className='p-4 md:p-6'>
      <p className='text-sm font-semibold uppercase tracking-wide text-ash-800 mb-3'>Top Scorers</p>
      {scorers.length === 0 ? (
        <p className="text-ash-800 text-sm py-8 text-center">
          No scorer data available yet.
        </p>
      ) : (
        <div className="overflow-x-auto thin-scrollbar rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="border-b-2 border-Darkblue-500 bg-ash-50">
              <tr className="text-ash-800 font-semibold">
                <th className="w-6 p-3 text-sm text-left"></th>
                <th className="pl-3 text-sm font-semibold tracking-wide text-left">Player</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left hidden sm:table-cell">Team</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">MP</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left hidden md:table-cell">Assists</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Goals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scorers.map((entry, index) => (
                <tr key={entry.player.id} className="even:bg-ash-50 hover:bg-zest-50 transition-colors">
                  <td className="p-3 text-sm text-ash-800 font-medium">{index + 1}</td>
                  <td className="flex items-center p-3 text-sm text-Darkblue-800 whitespace-nowrap">
                    <img src={entry.team.crest} className="w-6 h-6 object-contain shrink-0" alt={entry.team.name} />
                    <span className="pl-3 font-medium">{entry.player.name}</span>
                  </td>
                  <td className="p-3 text-sm text-ash-800 hidden sm:table-cell">{entry.team.shortName || entry.team.name}</td>
                  <td className="p-3 text-sm text-ash-800">{entry.playedMatches}</td>
                  <td className="p-3 text-sm text-ash-800 hidden md:table-cell">{entry.assists ?? 0}</td>
                  <td className="p-3 text-sm font-semibold text-Darkblue-800">{entry.goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Stats
