import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import CustomCarousel from '../../Component/Carousel/Carousel';

const Similar = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div className='container m-auto pt-14'>
            <CustomCarousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />
        </div>
    )
}

export default Similar