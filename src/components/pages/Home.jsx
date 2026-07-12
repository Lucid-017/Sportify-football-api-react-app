import React from 'react'
import Leagues from '../Leagues'

const Home = () => {
  return (
    <div>
      <div className="bg-Darkblue-800">
        <div className="max-w-screen-desktop mx-auto px-5 md:px-10 py-10 md:py-14 text-center">
          <h1 className="text-white text-3xl md:text-4xl font-semibold">
            All Competitions
          </h1>
          <p className="text-ash-300 mt-2 text-sm md:text-base">
            Standings, fixtures and form for Europe's top football leagues
          </p>
        </div>
      </div>

      <div className="max-w-screen-desktop mx-auto px-5 md:px-10 -mt-6 md:-mt-8 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
          <Leagues/>
        </div>
      </div>
    </div>
  )
}

export default Home
