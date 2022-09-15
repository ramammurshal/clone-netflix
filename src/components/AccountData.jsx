import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../components/Input'
import FormButton from '../components/FormButton'
import { UserAuth } from '../context/AuthContext'

const AccountData = () => {
  const [name, setName] = useState('')
  const { user, updateName } = UserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.displayName) {
      setName(user.displayName)
    }
  }, [user?.displayName])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (name !== '') {
      const resolveChangeName = new Promise(async (resolve, reject) => {
        try {
          const response = await updateName(name)
          resolve(response)
        } catch (error) {
          reject(error)
        }
      })

      toast
        .promise(
          resolveChangeName,
          {
            pending: 'Please wait, we are changing your name...',
            success: 'Success!',
            error: 'An error occured, please try again!',
          },
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
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
      <div className='text-4xl font-bold mb-5'>Your Name</div>
      <form className='w-[100%]' onSubmit={handleUpdate}>
        <Input type='text' placeholder='Name' value={name} modifier={setName} />
        <FormButton title='Update' full={false} />
      </form>
      <ToastContainer />
    </>
  )
}

export default AccountData
