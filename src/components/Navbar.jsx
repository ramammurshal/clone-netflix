import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/sign-in')
    } catch (error) {
      alert('Error when signOut user.')
    }
  }

  return (
    <>
      <nav className='z-10 absolute w-full'>
        <div className='container py-4 flex items-center justify-between'>
          <Link to='/'>
            <div className='text-red-500 text-2xl sm:text-4xl font-bold cursor-pointer'>
              NETFLIX
            </div>
          </Link>
          {user?.email ? (
            <div>
              <Link to='/account'>
                <button className='mr-4'>
                  {user?.displayName
                    ? user?.displayName.split(' ')[0]
                    : 'Account'}
                </button>
              </Link>
              <button
                className='bg-red-600 hover:bg-red-700 active:bg-red-700 px-6 py-2 rounded cursor-pointer text-white'
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <Link to='/sign-in'>
                <button className='mr-4 hover:text-gray-200 active:text-gray-200'>
                  Sign In
                </button>
              </Link>
              <Link to='/sign-up'>
                <button className='bg-red-600 hover:bg-red-700 active:bg-red-700 px-6 py-2 rounded cursor-pointer text-white'>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
