import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <Section>
      <div className={`videoPopup ${show ? "visible" : ""}  z-[99]`}>
        <div className="opacityLayer" onClick={hidePopup}></div>
        <div className="videoPlayer">
          <span className="closeBtn" onClick={hidePopup}>
            Close
          </span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            // playing={true}
          />
        </div>
      </div>
    </Section>
  );
};

export default VideoPopup;

const Section = styled.div`
  .videoPopup {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    .opacityLayer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(3.5px);
      -webkit-backdrop-filter: blur(3.5px);
      opacity: 0;
      transition: opacity 400ms;
    }
    .videoPlayer {
      position: relative;
      width: 800px;
      aspect-ratio: 16 / 9;
      background-color: white;
      transform: scale(0.2);
      transition: transform 250ms;
      .closeBtn {
        position: absolute;
        top: -20px;
        right: 0;
        color: white;
        cursor: pointer;
      }
    }
    &.visible {
      opacity: 1;
      visibility: visible;
      .opacityLayer {
        opacity: 1;
      }
      .videoPlayer {
        transform: scale(1);
      }
    }
  }
`;
