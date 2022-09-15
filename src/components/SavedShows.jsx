import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import CardMovie from './CardMovie'

const SavedShows = () => {
  const { user } = UserAuth()
  const [isThereIsSavedShows, setIsThereIsSavedShows] = useState(true)
  const [savedShows, setSavedShows] = useState([])

  useEffect(() => {
    let unsub = null

    unsub = onSnapshot(doc(db, 'users', user?.email), (doc) => {
      if (doc.data().savedShows.length > 0) {
        setSavedShows(doc.data().savedShows)
      } else {
        setIsThereIsSavedShows(false)
      }
    })

    return () => {
      unsub()
    }
  }, [user?.email])

  return (
    <div>
      {isThereIsSavedShows
        ? savedShows.length > 0
          ? savedShows.map((item) => {
              return (
                <div className='mb-6' key={item.id}>
                  <CardMovie data={item} isLiked={true} />
                </div>
              )
            })
          : 'Please wait...'
        : "You don't have a liked movie"}
    </div>
  )
}

export default SavedShows
