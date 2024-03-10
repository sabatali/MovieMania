import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import Img from "../../Component/LazyLoadImage/Img";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const [displayCount, setDisplayCount] = useState(8); 

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 8);
  };

  return (
    <div className="container m-auto">
      <>
        <div className="text-[20px] font-bold text-center sm:text-start text-white py-8">Top Cast</div>
        {!loading ? (
          <div className="flex flex-wrap items-center justify-center sm:justify-start">
            {/* Only display up to displayCount items */}
            {data?.slice(0, displayCount).map((item) => {
              let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
              return (
                <div key={item.id} className="w-[150px]  flex flex-col items-center">
                  <div>
                    <Img src={imgUrl} className="w-[70px] h-[70px] rounded-[50%]" />
                  </div>
                  <div className="text-lg font-[400] text-white text-center">{item.name}</div>
                  <div className="text-md font-[200] text-center text-white">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen  bg-[#131926]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {/* Show "Load More" button if there are more items to load */}
        {data && data.length > displayCount && (
          <div className="flex justify-center mt-4">
            <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Load More
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default Cast;
