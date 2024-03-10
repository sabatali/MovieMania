import React from 'react'
import HeroSection from './HeroSection'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'

const Home = () => {
    return (
        <div className='bg-gray-900'>
            <HeroSection />
            <Trending />
            <Popular />
            <TopRated/>
        </div>
    )
}

export default Home