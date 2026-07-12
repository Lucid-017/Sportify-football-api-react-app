import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 bg-Darkblue-800">
      <div className="max-w-screen-desktop mx-auto px-5 py-8 text-center">
        <p className="text-ash-200 text-sm">
          Built by{' '}
          <a
            className="animate text-white font-medium"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/UchennaOnwuliri"
          >
            Onwuliri Uchenna Austin
          </a>
        </p>
        <p className="text-ash-400 text-xs mt-2">
          Data provided by{' '}
          <a
            className="animate text-ash-200"
            target="_blank"
            rel="noreferrer"
            href="https://www.football-data.org/"
          >
            football-data.org
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
