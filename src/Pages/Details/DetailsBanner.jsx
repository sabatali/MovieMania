import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../Hooks/useFetch";
import { useSelector } from "react-redux";
import bgImage from "../../../src/assets/no_header_poster.png";
import Img from "../../Component/LazyLoadImage/Img";
import imgFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../Component/Genres/Genres";
import CircleRating from "../../Component/CircleRating/CircleRating";
import PlayIcon from "../../assets/icons8-play-50.png";
import VideoPopup from "../../Component/VideoPopup/VideoPopup";
import { useBardContext } from "../../Context/Context";

const DetailsBanner = ({ video, crew }) => {
  const {
    setInput,
    input,
    onset,
    result,
    resentPrompt,
    loading: aiLoading,
    showResponse,
  } =
    // console.log("🚀 ~ DetailsBanner ~ result:", result)
    useBardContext();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);
  const posterImg = url.backdrop + data?.poster_path;
  const bgImg = url.backdrop + data?.backdrop_path;

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen  bg-[#131926]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        </>
      ) : (
        <>
          {!!data && (
            <>
              <div
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImg || bgImage})` }}
              >
                <div className="absolute inset-0 bg-[#131926] opacity-90" />
                <div className="container m-auto py-5">
                  <div className="flex flex-wrap gap-[7%]">
                    <div className="w-[100%] sm:w-[30%]">
                      <Img src={posterImg || imgFallback} alt={data.name} />
                    </div>
                    <div className="z-10 w-[100%] sm:w-[60%]">
                      <h2 className="text-lg font-bold text-start text-white">
                        {`${data.name || data.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </h2>
                      <h3 className="text-lg font-light text-start text-white">
                        {" "}
                        {data.tagline}
                      </h3>
                      <div className=" flex gap-6 items-center">
                        <div className="mt-16">
                          <CircleRating rating={data.vote_average.toFixed(1)} />
                        </div>
                        <div
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          <img src={PlayIcon} alt="" />
                          <span className="text-md font-light text-start text-white">
                            Watch Trailer
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-lg font-bold text-start text-white">
                          Overview
                        </div>
                        <div className="text-lg font-normal text-start text-white">
                          {data.overview}
                        </div>
                      </div>
                      <div className="flex gap-10 flex-wrap text-lg font-normal text-start text-white mt-3">
                        {data.status && (
                          <div className=" flex  flex-col">
                            <span className="text bold">Status: </span>
                            <span className="text-[#e45741] font-semibold">
                              {data.status}
                            </span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="flex flex-col">
                            <span className="text bold">Release Date: </span>
                            <span className="text-[#e45741] font-semibold">
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="flex flex-col">
                            <span className="text bold">Runtime: </span>
                            <span className="text-[#e45741] font-semibold">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="text-lg font-normal text-start text-white pt-2">
                          <span className="text bold">Director: </span>
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className="text-lg font-normal text-start text-white pt-2">
                          <span className="text bold">Writer: </span>
                          <span className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && " || "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                      {/* Details With AI */}
                      <div>
                        <div className="flex shadow-lg rounded-md py-4 ">
                          <input
                            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder="Enter your query and get details"
                          />

                          <button
                            className="bg-blue-500 px-3 hover:bg-blue-700 text-white font-bold  focus:outline-none focus:shadow-outline"
                            onClick={() => onset(input)}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </>
          )}
        </>
      )}
      <div>
        {!aiLoading ? (
          <div className="flex container gap-2 align-middle text-white shadow-lg my-7  px-3 py-9">
            <div className="w-[90px]">
              <img src="" alt="" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: result }}></div>
          </div>
        ) : (
          <>
             <div className='flex max-w-full gap-2 align-middle shadow-lg my-7  px-3 py-9'>
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                {/* <img src='' alt="" /> */}
              </div>
              <div class=" p-4  w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-orange-400 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-orange-400 rounded col-span-2"></div>
                        <div class="h-2 bg-orange-400 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-orange-400 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsBanner;
