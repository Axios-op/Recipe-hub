import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaClock, FaHeart, FaDollarSign } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from "../images/raj-removebg-preview.png";
import "../index.css";

const Card = () => {
  const [freeVideos, setFreeVideos] = useState([]);
  const [paidVideos, setPaidVideos] = useState([]);
  const [hasMoreFree, setHasMoreFree] = useState(true);
  const [hasMorePaid, setHasMorePaid] = useState(true);
  const [loadingFreeVideos, setLoadingFreeVideos] = useState(false);
  const [loadingPaidVideos, setLoadingPaidVideos] = useState(false);

  const fetchFreeVideos = useCallback(async () => {
    try {
      setLoadingFreeVideos(true);

      const response = await axios.get('http://localhost:8000/api/v2/videos/freeVideos');
      console.log("fetchFreeVideos response",response.data)
      setFreeVideos(response?.data)

      // if (response.status === 200) {
      //   const newFreeVideos = response.data || [];
      //   setFreeVideos((prevFreeVideos) => [...prevFreeVideos, ...newFreeVideos]);

      //   if (newFreeVideos.length === 0) {
      //     setHasMoreFree(false);
      //   }
      // } else {
      //   console.error('Failed to fetch free videos. Status:', response.status);
      // }
    } catch (error) {
      console.error('Error fetching free videos:', error.message);
    } finally {
      setLoadingFreeVideos(false);
    }
  }, []);

  const fetchPaidVideos = useCallback(async () => {
    try {
      setLoadingPaidVideos(true);

      const response = await axios.get('http://localhost:8000/api/v2/videos/paidVideos');
      console.log("response",response.data)
      setPaidVideos(response.data)

      // if (response.status === 200) {
      //   const newPaidVideos = response.data || [];
      //   setPaidVideos((prevPaidVideos) => [...prevPaidVideos, ...newPaidVideos]);

      //   if (newPaidVideos.length === 0) {
      //     setHasMorePaid(false);
      //   }
      // } else {
      //   console.error('Failed to fetch paid videos. Status:', response.status);
      // }

      setLoadingPaidVideos(false);
    } catch (error) {
      setLoadingPaidVideos(false);
      console.error('Error fetching paid videos:', error.message);
    } 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFreeVideos();
      await fetchPaidVideos();
    };

    fetchData();
  }, [fetchFreeVideos, fetchPaidVideos]);

  const formatLikeCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatDuration = (duration) => {
    // console.log("prop duration",duration)
    // let formattedDuration = '';

    // if(duration) {
    //     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    //     console.log("prop match", match)

    //   const hours = match[1] ? parseInt(match[1], 10) : 0;
    //   console.log("prop hours", hours)
      
    //   const minutes = match[2] ? parseInt(match[2], 10) : 0;
    //   console.log("prop minutes", minutes)

    //   if (hours > 0) {
    //     formattedDuration += `${hours}h `;
    //   }

    //   if (minutes > 0) {
    //     formattedDuration += `${minutes}min`;
    //   }

      return duration;
    // }
  };

  return (
    <div className="Home">
      {/* Free Videos */}
      {freeVideos&&
      <InfiniteScroll
        dataLength={freeVideos.length}
        next={fetchFreeVideos}
        hasMore={hasMoreFree}
        loader={loadingFreeVideos && <h4>Loading Free Videos...</h4>}
      >
        <div className="Cards">
          {freeVideos?.map((video) => {
            console.log("video", video)
            return(<div className="FreeCard" key={video._id}>
              <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                <div className="video">
                  <img className="image" src={video.thumbnailURL} alt="Video Thumbnail" />
                  <div className="icons">
                    <div className="one">
                      <span className="star">
                        <FaThumbsUp />
                      </span>
                      <span className="rating">{video.likes}</span>
                    </div>
                    <div className="two">
                      <span className="clock">
                        <FaClock />
                      </span>
                      <span className="time">{video.duration}</span>
                    </div>
                  </div>
                </div>
              </a>
              <div className="info">
                <div className="logo">
                  <img src={logo} alt="Channel Logo" />
                </div>
                <div className="title">
                  <span>{video.title}</span>
                </div>
                <div className="like">
                  <span>
                    <FaHeart />
                  </span>
                </div>
              </div>
            </div>
            
          )})}
        </div>
      </InfiniteScroll>}

      {/* Paid Videos */}
      {/* <InfiniteScroll
        dataLength={paidVideos.length}
        next={fetchPaidVideos}
        hasMore={hasMorePaid}
        loader={loadingPaidVideos && <h4>Loading Paid Videos...</h4>}
      >
        <div className="Cards">
          {paidVideos.map((video) => (
            <div className="PaidCard" key={video._id}>
              <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                <div className="video">
                  <img className="image" src={video.thumbnailURL} alt="Video Thumbnail" />
                  <div className="icons">
                    <div className="one">
                      <span className="star">
                        <FaThumbsUp />
                      </span>
                      <span className="rating">{formatLikeCount(video.likes)}</span>
                    </div>
                    <div className="two">
                      <span className="clock">
                        <FaClock />
                      </span>
                      <span className="time">{formatDuration(video.duration)}</span>
                    </div>
                  </div>
                </div>
              </a>
              <div className="info">
                <div className="logo">
                  <img src={logo} alt="Channel Logo" />
                </div>
                <div className="title">
                  <span>{video.title}</span>
                </div>
                <div className="like">
                  <span>
                    <FaDollarSign />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll> */}
    </div>
  );
};

export default Card;
