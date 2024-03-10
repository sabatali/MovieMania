import React from "react";
import DetailsBanner from "./DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Cast from "./cast";
import VideosSection from "./VideosSection";
import Similar from "./Similar";
import Recommendation from "./Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div className="bg-gray-900">
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
