import React from 'react'
import AccountData from '../components/AccountData'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
      <div className='w-full h-[300px] bg-black/50 flex items-center'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='Account Background'
          className='absolute w-full h-[300px] object-cover -z-10'
        />
        <div className='container'>
          <div className='text-4xl font-bold'>My Account</div>
        </div>
      </div>
      <div className='container py-12'>
        <div className='grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-2'>
          <div>
            <AccountData />
          </div>
          <div>
            <div className='text-4xl font-bold mb-5'>Favorite Movie</div>
            <SavedShows />
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
