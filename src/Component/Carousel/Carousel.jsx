import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the default styles
import imgFallback from '../../assets/no-poster.png';
import { useSelector } from 'react-redux';
import Img from '../LazyLoadImage/Img';
import CircleRating from '../CircleRating/CircleRating';
import Genres from '../Genres/Genres';
import { Navigate, useNavigate } from 'react-router-dom';

const CustomCarousel = ({ data, loading, endpoint, title }) => {
    console.log("🚀 ~ CustomCarousel ~ data:", data);
    const { url } = useSelector((state) => state.home);

    const navigate =useNavigate();

    if (!data || !Array.isArray(data)) {
        return null; // Or you can return a loading indicator or default message
    }

    return (
        <div>
            {title && <div className="text-[30px] font-semibold text-start py-11 text-white">{title}</div>}
        <Carousel
            responsive={{
                superLargeDesktop: {
                    breakpoint: { max: 4000, min: 3000 },
                    items: 7
                },
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 5
                },
                tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 3
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 2
                }
            }}
            swipeable={true}
            draggable={false}
            showDots={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="transform 1s ease-in-out"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >

            {
                data.map((item, index) => {
                    const posterImg = url.backdrop + item.poster_path;
                    const title = item.title || item.original_title || item.original_name;
                    const truncatedTitle = title.length > 18 ? title.substring(0, 18) + '...' : title;
                    return (
                        <div key={index}  onClick={() =>
                            navigate(
                                `/${item.media_type || endpoint}/${
                                    item.id
                                }`
                            )}
                             className="flex flex-col mx-5 justify-center">
                          <div>
                          <Img src={posterImg || imgFallback} alt={item.name} className="w-[100%] h-[100%] rounded-md" />
                          <Genres data={item.genre_ids}/>
                            <CircleRating rating={item.vote_average.toFixed(1)}/>
                          </div>
                         <div className='mt-[-20px]'>
                           <h2 className="text-lg font-semibold text-start text-white">{truncatedTitle}</h2>
                            <h4 className="text-sm text-white">{item.release_date || item.first_air_date}</h4>
                        </div>
                           </div>
                    )
                })
            }




        </Carousel >
        </div>
    );
};

export default CustomCarousel;
