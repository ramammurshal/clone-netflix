import { useState, useEffect } from 'react'
import axios from 'axios'
import requests from '../Requests'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => {
        const movieResults = response.data.results

        setMovie(movieResults[Math.floor(Math.random() * movieResults.length)])
      })
      .catch((error) => {
        alert('Error when retrieving data, please try again...')
        window.location.reload()
      })
  }, [])

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  return (
    <div className='w-full h-[550px] flex items-center bg-gradient-to-r from-black'>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt=''
        className='absolute w-full h-[550px] object-cover -z-10'
      />
      <div className='container'>
        <div className='text-3xl md:text-5xl font-bold '>{movie?.title}</div>
        <div className='text-gray-400 text-sm my-3'>
          Released: {movie?.release_date}
        </div>
        <div className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mb-5'>
          {truncateString(movie?.overview, 180)}
        </div>
        <button className='bg-red-600 hover:bg-red-700 active:bg-red-700 px-6 py-2 rounded cursor-pointer text-white'>
          <Link to={`/details/${movie?.id}`}>Read More</Link>
        </button>
      </div>
    </div>
  )
}

export default Hero
