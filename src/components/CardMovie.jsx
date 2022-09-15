import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'

const CardMovie = ({ data, isLiked }) => {
  const [like, setLike] = useState(false)
  const { user, addMovieToFav, removeMovieToFav } = UserAuth()

  useEffect(() => {
    if (isLiked) {
      setLike(true)
    }
  }, [isLiked])

  const handleLike = async () => {
    if (user?.email) {
      if (!like) {
        const resolveLike = new Promise(async (resolve, reject) => {
          try {
            const response = await addMovieToFav({
              id: data.id,
              title: data.title,
              backdrop_path: data.backdrop_path,
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
            setLike(true)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const resolveUnlike = new Promise(async (resolve, reject) => {
          try {
            resolve(await removeMovieToFav(data.id))
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
            // console.log('unliked')
            toast.dismiss()
            setLike(false)
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
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className='card h-[200px] relative group'
      >
        <div className='absolute w-full h-full transition group-hover:bg-black/50'></div>
        <div className='absolute w-full h-full flex items-center justify-center text-center opacity-0 group-hover:opacity-100 font-bold transition'>
          <Link to={`/details/${data.id}`}>{data.title}</Link>
        </div>
        <div
          onClick={handleLike}
          className='absolute cursor-pointer top-2 left-2 hidden transition group-hover:block'
        >
          {like ? (
            <FaHeart className='text-red-500' />
          ) : (
            <FaRegHeart className='hover:text-red-500' />
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default CardMovie
