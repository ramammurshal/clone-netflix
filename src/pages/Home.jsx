import { useEffect } from 'react'
import Hero from '../components/Hero'
import Preview from '../components/Preview'
import SubSection from '../components/SubSection'

import requests from '../Requests'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <SubSection title='Popular Movie' fetchUrl={requests.requestPopular} />
      <Preview />
      <SubSection
        title='Top Rated Movie!'
        fetchUrl={requests.requestTopRated}
      />
    </>
  )
}

export default Home
