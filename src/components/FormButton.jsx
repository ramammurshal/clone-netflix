import React from 'react'

const FormButton = ({ title, full = true }) => {
  return (
    <button
      className={`block bg-red-600 px-6 py-2 ${
        full && 'w-full'
      } rounded outline-none hover:bg-red-700 focus:bg-red-700 active:bg-red-700`}
      type='submit'
    >
      {title}
    </button>
  )
}

export default FormButton
