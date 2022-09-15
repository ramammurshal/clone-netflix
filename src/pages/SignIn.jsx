import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../components/Input'
import FormButton from '../components/FormButton'
import { UserAuth } from '../context/AuthContext'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = UserAuth()
  const navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.error('Please complete your data first.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      })
    } else {
      const resolveSignIn = new Promise(async (resolve, reject) => {
        try {
          const response = await signIn(email, password)
          resolve(response)
        } catch (error) {
          reject(error)
        }
      })
      toast
        .promise(
          resolveSignIn,
          {
            pending: 'Please wait, we are logged in you.',
            success: 'Success!',
            error: 'Sign in failed, please check your credentials!',
          },
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000,
          }
        )
        .then((response) => {
          // console.log(response)
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <div className='w-[100%] h-[100vh] bg-black/50 flex items-center justify-center'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='Background Auth'
          className='absolute w-[100%] h-[100vh] -z-10 object-cover'
        />
        <div className='bg-black/70 p-14'>
          <div className='mb-8 font-bold text-4xl'>Sign In!</div>
          <form onSubmit={handleSignIn} className='w-[350px]'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              modifier={setEmail}
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              modifier={setPassword}
            />
            <FormButton title='Sign In' />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default SignIn
