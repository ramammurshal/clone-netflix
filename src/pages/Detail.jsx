import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import axios from 'axios'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Detail = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})
  const [movieRate, setMovieRate] = useState('')
  const [isMovieLiked, setIsMovieLiked] = useState(false)

  const { user, addMovieToFav, removeMovieToFav } = UserAuth()

  useEffect(() => {
    window.scrollTo(0, 0)

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_IMDB_API_KEY}`
      )
      .then((response) => {
        setMovie(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    setMovieRate(() => {
      if (movie.vote_average > 0 && movie.vote_average < 2) {
        return `✨ ${movie.vote_average}`
      } else if (movie.vote_average < 4) {
        return `⭐✨ ${movie.vote_average}`
      } else if (movie.vote_average < 6) {
        return `⭐⭐✨ ${movie.vote_average}`
      } else if (movie.vote_average < 8) {
        return `⭐⭐⭐✨ ${movie.vote_average}`
      } else if (movie.vote_average < 10) {
        return `⭐⭐⭐⭐✨ ${movie.vote_average}`
      } else if (movie.vote_average === 10) {
        return `⭐⭐⭐⭐⭐ ${movie.vote_average}`
      }
    })

    let unsub = null

    if (user?.email) {
      unsub = onSnapshot(doc(db, 'users', user?.email), (doc) => {
        // console.log(doc.data())
        if (doc.data().savedShows.length > 0) {
          let isLiked = doc.data().savedShows.find((like) => {
            return like.id === movie.id
          })

          if (isLiked) {
            setIsMovieLiked(true)
          }
        }
      })
    }

    return () => {
      if (unsub) {
        unsub()
      }
    }
  }, [movieId, movie.id, movie.vote_average, user?.email])

  const handleLike = () => {
    if (user?.email) {
      if (!isMovieLiked) {
        const resolveLike = new Promise(async (resolve, reject) => {
          try {
            const response = await addMovieToFav({
              id: movie.id,
              title: movie.title,
              backdrop_path: movie.backdrop_path,
            })
            resolve(response)
          } catch (error) {
            reject(error)
          }
        })

        toast
          .promise(
            resolveLike,
            {
              pending: 'Please wait!',
              success: 'Success add movie to favorite list!',
              error: 'An error occured, please try again!',
            },
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
              autoClose: 2000,
            }
          )
          .then((response) => {
            // console.log(response)
            setIsMovieLiked(true)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const resolveUnlike = new Promise(async (resolve, reject) => {
          try {
            const response = await removeMovieToFav(movie.id)
            resolve(response)
          } catch (error) {
            reject(error)
          }
        })

        toast
          .promise(
            resolveUnlike,
            {
              pending: 'Please wait!',
              success: 'Success delete movie from favorite list!',
              error: 'An error occured, please try again!',
            },
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
              autoClose: 2000,
            }
          )
          .then((response) => {
            // console.log(response)
            setIsMovieLiked(false)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } else {
      toast.error('Login first 😁', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      })
    }
  }

  return (
    <>
      <div className='w-full h-[450px] flex items-center bg-gradient-to-r from-black'>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt=''
          className='absolute w-full h-[450px] object-cover -z-10'
        />
        <div className='container'>
          <div className='text-3xl md:text-5xl font-bold'>{movie.title}</div>
          <div className='text-gray-300 text-sm mt-4 mb-2'>
            Released: {movie.release_date}
          </div>
          <div className='text-gray-300 text-sm mb-4'>
            Length: {movie.runtime} Minutes
          </div>
          <button
            className={`border-2 border-red-600 transition-all py-2 px-6 rounded flex items-center ${
              isMovieLiked && 'bg-red-600'
            }`}
            onClick={handleLike}
          >
            {isMovieLiked ? 'Unsaved' : 'Save'} &nbsp;
            <FaRegHeart />
          </button>
        </div>
      </div>
      <div className='container py-6'>
        <div className='font-bold text-2xl mb-4'>{movie.tagline}</div>
        <div className='text-justify mb-3'>{movie.overview}</div>
        <div className='mb-3'> Rate: {movieRate}</div>
        <div>
          <span className='inline-block'>Genre: </span> &nbsp;&nbsp;
          {movie.genres &&
            movie.genres.map((item) => (
              <span
                key={item.id}
                className='bg-red-600 p-1 rounded inline-block mr-3 mb-3'
              >
                {item.name}
              </span>
            ))}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Detail
