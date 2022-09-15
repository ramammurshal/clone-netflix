import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detail from './pages/Detail'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/details/:movieId' element={<Detail />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  )
}

export default App
