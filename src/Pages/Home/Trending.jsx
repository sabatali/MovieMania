import React, { useState } from 'react'
import SwitchTabs from '../../Component/SwitchTabs/SwitchTabs'
import useFetch from '../../Hooks/useFetch';
import CustomCarousel from '../../Component/Carousel/Carousel';

const Trending = () => {
    const [endPoint, setEndPoint] = useState("day");


    const { data, loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange = (tab) => {
        setEndPoint(endPoint === "Day" ? "day" : "week");
    }

    return (
        <div className='container m-auto px-5'>
            <div className='flex justify-between py-[30px]'>
                <h3 className='text-[20px] font-bold text-white'>Trending</h3>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </div>
            <CustomCarousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending