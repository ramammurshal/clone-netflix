import React from 'react'

const FooterLink = ({ title, url }) => {
  return (
    <a
      href={url}
      target='_blank'
      className='mb-5 block hover:underline'
      rel='noreferrer'
    >
      {title}
    </a>
  )
}

export default FooterLink
