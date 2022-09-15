import { useState, useEffect } from 'react'
import CardMovie from './CardMovie'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const SubSection = ({ title, fetchUrl }) => {
  const { user } = UserAuth()
  const [movies, setMovies] = useState([])
  const [movieLiked, setMovieLiked] = useState([])

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setMovies(response.data.results)
      })
      .catch((error) => {
        alert('Error when retrieving data, please try again...')
        window.location.reload()
      })

    let unsub = null

    if (user?.email) {
      unsub = onSnapshot(doc(db, 'users', user?.email), (doc) => {
        setMovieLiked(doc.data().savedShows)
      })
    }

    return () => {
      if (unsub) {
        unsub()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email])

  return (
    <>
      <div className='container py-12'>
        <div className='font-bold text-3xl mb-6'>{title}</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {movies.length &&
            movies.slice(0, 9).map((item) => {
              let isLiked = movieLiked.find((like) => {
                return item.id === like.id
              })
              return <CardMovie data={item} key={item.id} isLiked={isLiked} />
            })}
        </div>
      </div>
    </>
  )
}

export default SubSection
