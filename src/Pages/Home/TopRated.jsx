import React, { useState } from 'react'
import SwitchTabs from '../../Component/SwitchTabs/SwitchTabs'
import useFetch from '../../Hooks/useFetch';
import CustomCarousel from '../../Component/Carousel/Carousel';

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");


    const { data, loading } = useFetch(`/${endPoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndPoint(endPoint === "Movies" ? "movie" : "tv");
    }

    return (
        <div className='container m-auto px-5'>
            <div className='flex justify-between py-[30px]'>
                <h3 className='text-[20px] font-bold text-white'>Top Rated</h3>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </div>
            <CustomCarousel data={data?.results} loading={loading} endpoint={endPoint} />
        </div>
    )
}

export default TopRated