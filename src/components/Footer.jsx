import React from 'react'
import footerLink from '../assets/data/footer.json'
import FooterLink from './FooterLink'

const Footer = () => {
  return (
    <footer className='w-full h-[400px] border-t-4 border-t-gray-400 mt-12 pt-12'>
      <div className='container pb-12'>
        <div className='text-xl text-gray-300 mb-8'>
          Questions? Call 007-803-321-2130
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-400'>
          {footerLink.map((row, index) => {
            return (
              <div key={index}>
                {row.map((item, index) => (
                  <FooterLink key={index} title={item.title} url={item.url} />
                ))}
              </div>
            )
          })}
        </div>
        <div className='text-gray-300 mt-5'>
          Build with <span className='text-red-600'>❤</span> by{' '}
          <a
            href='https://github.com/ramammurshal'
            target='_blank'
            className='hover:underline'
            rel='noreferrer'
          >
            Ramzzzz
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
