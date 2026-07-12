import React from 'react'

// scores/team crests are missing for knockout matches whose bracket slot
// hasn't been decided yet (e.g. "Winner Group A"), so everything here is
// read defensively rather than assumed present
const MatchCard = ({ match }) => {
  const homeName = match.homeTeam?.name || 'TBD'
  const awayName = match.awayTeam?.name || 'TBD'
  const hasScore = match.score?.fullTime?.home != null && match.score?.fullTime?.away != null
  const homeGoals = match.score?.fullTime?.home
  const awayGoals = match.score?.fullTime?.away
  // who actually won, so we can make that obvious at a glance instead of
  // relying on someone reading two small colored numbers
  const winner = !hasScore ? null : homeGoals > awayGoals ? 'home' : awayGoals > homeGoals ? 'away' : 'draw'

  const scoreColor = (side) => {
    if (!hasScore) return 'text-ash-400'
    if (winner === 'draw') return 'text-ash-800'
    return winner === side ? 'text-Limegreen-600' : 'text-red-500'
  }

  const nameClass = (side) => {
    if (!hasScore || winner === 'draw') return 'text-Darkblue-800 font-medium'
    return winner === side ? 'text-Darkblue-900 font-semibold' : 'text-ash-500 font-normal'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 sm:gap-6 justify-between p-4 md:p-5 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow">
      <div className="flex relative">
        <div className="teams w-full">
          <div className="team1 mb-3">
            <div className="flex gap-x-2 items-center">
              {match.homeTeam?.crest ? (
                <img className="w-6 h-6 object-contain shrink-0" src={match.homeTeam.crest} alt={homeName} />
              ) : (
                <span className="w-6 h-6 rounded-full bg-ash-100 shrink-0" />
              )}
              <p className={`self-center ${nameClass('home')}`}>{homeName}</p>
              {winner === 'home' && <span className="text-Limegreen-600 text-xs font-bold">●</span>}
            </div>
          </div>
          <div className="team2">
            <div className="flex gap-x-2 items-center">
              {match.awayTeam?.crest ? (
                <img className="w-6 h-6 object-contain shrink-0" src={match.awayTeam.crest} alt={awayName} />
              ) : (
                <span className="w-6 h-6 rounded-full bg-ash-100 shrink-0" />
              )}
              <p className={`self-center ${nameClass('away')}`}>{awayName}</p>
              {winner === 'away' && <span className="text-Limegreen-600 text-xs font-bold">●</span>}
            </div>
          </div>
        </div>
      </div>

      {/* matchday */}
      <div className="matchday flex gap-3 sm:justify-self-end">
        {/* scores */}
        {hasScore ? (
          <div className="scores font-bold text-xl tabular-nums">
            <div className={`homescore score mb-3 ${scoreColor('home')}`}>
              <p>{homeGoals}</p>
            </div>
            <div className={`homescore score ${scoreColor('away')}`}>
              <p>{awayGoals}</p>
            </div>
          </div>
        ) : (
          <div className="scores text-ash-400 text-sm font-medium self-center">
            <p>vs</p>
          </div>
        )}
        <div className='border-l pl-3 text-sm text-ash-800'>
          {match.status === "FINISHED" ? (
            <span className="inline-block px-1.5 py-0.5 rounded text-xs font-semibold text-white bg-zest-500">FT</span>
          ) : (
            <span className="inline-block px-1.5 py-0.5 rounded text-xs font-semibold text-ash-800 bg-ash-100">
              {match.status === 'IN_PLAY' || match.status === 'PAUSED' ? 'LIVE' : 'Scheduled'}
            </span>
          )}

          <p className="data mt-1">{match.utcDate.slice(5, 10)}</p>
          <p className="time">{match.utcDate.slice(11, 16)}</p>
        </div>
      </div>
    </div>
  )
}

export default MatchCard
