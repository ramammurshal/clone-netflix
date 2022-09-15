import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const signUp = async (email, password) => {
    const responseAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const responseDoc = await setDoc(doc(db, 'users', email), {
      savedShows: [],
    })

    return {
      responseAuth,
      responseDoc, // undefined btw
    }
  }

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const updateName = async (newName) => {
    return await updateProfile(user, {
      displayName: newName,
    }) // undefined
  }

  const getLikedMovie = async () => {
    const docRef = doc(db, 'users', user?.email)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      return docSnapshot.data().savedShows
    } else {
      console.log('Document not exist')
    }
  }

  const addMovieToFav = async (data) => {
    const docRef = doc(db, 'users', user?.email)
    return await updateDoc(docRef, {
      savedShows: arrayUnion({
        id: data.id,
        title: data.title,
        backdrop_path: data.backdrop_path,
      }),
    }) // undefined
  }

  const removeMovieToFav = async (id) => {
    const likedMovie = await getLikedMovie()
    const docRef = doc(db, 'users', user?.email)

    const filteredData = likedMovie.filter((data) => {
      return data.id !== id
    })
    return await updateDoc(docRef, {
      savedShows: filteredData,
    }) // undefined
  }

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribeAuth()
    }
  })

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        updateName,
        getLikedMovie,
        addMovieToFav,
        removeMovieToFav,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
