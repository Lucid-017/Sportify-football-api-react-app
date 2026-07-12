import React from 'react'
import { useContext, useEffect, useMemo } from 'react'
import SportifyContext from './context/SportifyContext'
import Spinner from './Spinner'
import MatchCard from './MatchCard'

// canonical bracket order — anything the API returns that isn't in this
// list still renders, just appended after the known rounds
const STAGE_ORDER = ['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'THIRD_PLACE', 'FINAL'];
const STAGE_LABELS = {
  LAST_32: 'Round of 32',
  LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-Finals',
  SEMI_FINALS: 'Semi-Finals',
  THIRD_PLACE: 'Third Place',
  FINAL: 'Final',
};

const Knockout = () => {
  const { loading, selectedLeague, setSelectedLeague, allMatches, getMatches } = useContext(SportifyContext)

  useEffect(() => {
    setSelectedLeague(selectedLeague)
    getMatches()
  }, [])

  const stages = useMemo(() => {
    const knockoutMatches = allMatches.filter((match) => match.stage && match.stage !== 'GROUP_STAGE');
    const byStage = knockoutMatches.reduce((acc, match) => {
      (acc[match.stage] = acc[match.stage] || []).push(match);
      return acc;
    }, {});
    Object.values(byStage).forEach((list) => list.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)));
    const orderedKeys = [
      ...STAGE_ORDER.filter((stage) => byStage[stage]),
      ...Object.keys(byStage).filter((stage) => !STAGE_ORDER.includes(stage)),
    ];
    return orderedKeys.map((stage) => ({
      stage,
      label: STAGE_LABELS[stage] || stage.replace(/_/g, ' '),
      matches: byStage[stage],
    }));
  }, [allMatches]);

  const reachedStages = new Set(stages.map((s) => s.stage));

  return loading ? (
    <Spinner />
  ) : (
    <div className='p-4 md:p-6'>
      {stages.length === 0 ? (
        <p className="text-ash-800 text-sm py-8 text-center">
          The knockout stage hasn't started yet.
        </p>
      ) : (
        <>
          {/* round progress: which stages of the bracket have kicked off */}
          <div className='flex items-center flex-wrap gap-2 mb-2'>
            {STAGE_ORDER.map((stage) => (
              <span
                key={stage}
                title={reachedStages.has(stage) ? undefined : 'Not reached yet'}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  reachedStages.has(stage)
                    ? 'bg-Darkblue-800 text-white'
                    : 'bg-ash-100 text-ash-500'
                }`}
              >
                {STAGE_LABELS[stage]}
              </span>
            ))}
          </div>
          <p className='text-xs text-ash-800 mb-4 flex items-center gap-1'>
            <span className="text-Limegreen-600 font-bold">●</span> marks the team that advanced — bold name means the winner, greyed-out means eliminated.
          </p>

          <div className='flex gap-0 overflow-x-auto thin-scrollbar pb-2'>
            {stages.map(({ stage, label, matches }) => (
              <div key={stage} className='shrink-0 w-80 px-3 first:pl-0 border-r border-gray-200 last:border-r-0'>
                <div className='bg-Darkblue-800 rounded-lg px-4 py-2.5 mb-4 flex items-baseline justify-between gap-2'>
                  <span className='text-white font-semibold text-sm uppercase tracking-wide'>{label}</span>
                  <span className='text-ash-300 text-xs shrink-0'>{matches.length} {matches.length === 1 ? 'match' : 'matches'}</span>
                </div>
                <div className='flex flex-col gap-3'>
                  {matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Knockout
