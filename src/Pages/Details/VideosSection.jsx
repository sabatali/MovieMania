import React, { useState } from "react";
import PlayIcon from "../../assets/icons8-play-50.png";
import VideoPopup from "../../Component/VideoPopup/VideoPopup";
import Img from "../../Component/LazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); // Initial count to display

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const handleLoadMore = () => {
    // Increase display count by 4 each time "Load More" is clicked
    setDisplayCount(displayCount + 4);
  };

  return (
    <div className="container m-auto">
      <>
        <div className="text-[20px] font-bold text-white py-9">Official Videos</div>
        {!loading ? (
          <div className="flex gap-7 flex-wrap">
            {/* Only display up to displayCount items */}
            {data?.results?.slice(0, displayCount).map((video) => (
              <div
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail w-[290px] relative">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <img src={PlayIcon} alt="" className="absolute top-[46px] left-[100px]" />
                </div>
                <div className="text-[16px]  w-[250px] font-light text-white">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen  bg-[#131926]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {/* Show "Load More" button if there are more items to load */}
        {data && data.results && data.results.length > displayCount && (
          <div className="flex justify-center mt-4">
            <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Load More
            </button>
          </div>
        )}
      </>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
