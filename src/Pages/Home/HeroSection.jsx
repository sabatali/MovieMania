import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useFetch from '../../Hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../Component/LazyLoadImage/Img';

import bgImage from "../../../src/assets/no_header_poster.png"


const HeroSection = () => {
  const [background, setBackground] = useState("")
  console.log("🚀 ~ HeroSection ~ background:", background)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bgImageUrl = url.backdrop + data?.results[Math.floor(Math.random() * 20)].backdrop_path
    setBackground(bgImageUrl);
  }, [data])




  const handleSearchQuery = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }


  return (

    <>
      <div className="relative h-[100%]">
        {!loading && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center backdrop-img" style={{ backgroundImage: `url(${background || bgImage})` }} />
            <div className="absolute inset-0 bg-blue-900 opacity-50" />
          </div>
        )}

        <div className="container relative py-[160px] z-10 m-auto">
          <div className="text-center text-white p-8 rounded-lg">
            <h4 className='text-[20px] font-medium'>Welcome</h4>
            <h2 className='text-[30px] font-bold'>Unlimited movies, TV shows, and more</h2>
          </div>
          <div className="flex w-[90%] sm:w-[50%] m-auto items-stretch mt-12 justify-center">
            <input className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-2 w-3/4 border border-transparent focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearchQuery}
            />
            <button className="w-22 rounded-l-none hover:bg-indigo-600 bg-indigo-700 rounded text-base font-medium leading-none text-white p-5 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">Enter</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default HeroSection