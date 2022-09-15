import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAb31kAAi1Lu2yPBF6Ph_FF6rV9CKSlsnM",
  authDomain: "netflix-clone-baea4.firebaseapp.com",
  projectId: "netflix-clone-baea4",
  storageBucket: "netflix-clone-baea4.appspot.com",
  messagingSenderId: "884651957567",
  appId: "1:884651957567:web:d2576e7dc460c46ebb078a"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
