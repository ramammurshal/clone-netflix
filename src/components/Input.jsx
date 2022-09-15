import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Input = (props) => {
  const [isPassword, setIsPassword] = useState(false)
  const [inputType, setInputType] = useState(null)

  useEffect(() => {
    setInputType(props.type)

    if (props.type === 'password') {
      setIsPassword(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePassType = () => {
    setInputType((prevInputType) => {
      return prevInputType === 'password' ? 'text' : 'password'
    })
  }

  return (
    <>
      <IconContext.Provider value={{ color: 'gray', size: '24px' }}>
        <div className='relative w-[100%] mb-4'>
          <input
            type={inputType}
            placeholder={props.placeholder}
            className='block w-full p-2 bg-gray-700 outline-none focus:outline-red-600 focus:outline-2'
            value={props.value}
            onChange={(e) => props.modifier(e.target.value)}
          />
          {isPassword && (
            <div
              className='absolute top-[50%] -translate-y-1/2 right-2 cursor-pointer'
              onClick={handleChangePassType}
            >
              {inputType === 'password' ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Input
