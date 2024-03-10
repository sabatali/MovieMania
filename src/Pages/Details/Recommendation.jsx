import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import CustomCarousel from '../../Component/Carousel/Carousel';

const Recommendation = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

    console.log("🚀 ~ Recommendation ~ data:", data)
    const title = mediaType === "tv" ? "Recommendation TV Shows" : "Recommendation Movies";

    return (
        <div className='container m-auto pt-14'>
            <CustomCarousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />
        </div>
    )
}

export default Recommendation