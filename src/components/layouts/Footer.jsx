import React from 'react'

const Footer = () => {
  return (
    <div className='w-2/4 mx-auto text-center my-8'>
      <p ><span className='text-ash-800'>Built by  : </span>
         <a className='animate' target='_blank' rel='noreferrer' href="https://twitter.com/UchennaOnwuliri">
          Onwuliri Uchenna Austin
        </a>
      </p>
      <p className='text-sm mt-2'>Credits:
        <a className='animate' target='_blank' rel='noreferrer' href="https://www.football-data.org/">
          Football data API
        </a>
      </p>
    </div>
  )
}

export default Footer