import React from 'react'
import previewImage from '../assets/images/preview.png'

const Preview = () => {
  return (
    <div className='container py-12'>
      <div className='grid md:grid-cols-2'>
        <div className='flex flex-col justify-center pr-5 mb-8'>
          <div className='text-5xl font-bold mb-3'>
            Watch Netflix Everywhere
          </div>
          <div className='text-gray-300 text-xl'>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </div>
        </div>
        <div>
          <img src={previewImage} alt='Example Videos' />
        </div>
      </div>
    </div>
  )
}

export default Preview
