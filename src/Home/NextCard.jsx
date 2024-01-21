import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShare, FaHeart, FaDollarSign, FaDownload } from 'react-icons/fa';
import logo from '../images/raj-removebg-preview.png';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import "../index.css";


const formatViews = (views) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k';
  } else {
    return views.toString();
  }
};

const formatLikes = (likes) => {
  if (likes >= 1000000) {
    return (likes / 1000000).toFixed(1) + 'M';
  } else if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + 'k';
  } else {
    return likes.toString();
  }
};

const extractVideoIdFromUrl = (url) => {
  // Example URL: https://www.youtube.com/watch?v=C5-AuvqFFys
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\/|v=)([^&?]+)/i);
  return match ? match[1] : null;
};

const NextCard = () => {
  const location = useLocation();

  const [otherVideos, setOtherVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasShuffled, setHasShuffled] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchOtherVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v2/videos`);
        const data = await response.json();
        // Set state with the fetched data
        setOtherVideos(data);
        // Set the flag to true after fetching data
        setHasShuffled(false); 
      } catch (error) {
        setError('Error fetching other videos: ' + error.message);
      }
    };

    fetchOtherVideos();
  }, [location.state]);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle the array after it has been fetched and state is updated
  useEffect(() => {
    if (!hasShuffled && otherVideos.length > 0) {
      setOtherVideos((prevOtherVideos) => shuffleArray(prevOtherVideos));
      setHasShuffled(true); // Set the flag to true after shuffling
    }
  }, [hasShuffled, otherVideos]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!location.state) {
    console.error("Video information not available.");
    return <div>Video information not available.</div>;
  }

  const { videoInfo } = location.state;
  const videoId = extractVideoIdFromUrl(videoInfo.videoURL);

  return (
    <>
    <Header />
    <div className='NextPage'>
      <div className='nextCard'>
        <iframe
          title={videoInfo.title}
          width="60%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <div className='nextCardInfo'>
          <div className='nextCardIcon'>
            <img src={logo} alt='Logo' />
          </div>

          <div className='nextCardTitle'>
            <span>{videoInfo.title}</span>
          </div>

          <div className='nextCardLike'>
            <span>
              <FaHeart />
            </span>
            <span>{formatLikes(videoInfo.likes)}</span>
          </div>

          <div className='nextCardShare'>
            <span>
              <FaShare />
            </span>
            <span>Share</span>
          </div>

          <div className='nextCardDownload'>
            <span>
              <FaDownload />
            </span>
          </div>
        </div>

        <div className='nextCardDescription'>
          <div className='allSpans'>
            <span className='pSpan'>{formatViews(videoInfo.views)} views</span>
            <br />
            <span  className='pSpan'>Description:</span>
            <span className='cSpan'>{videoInfo.description}</span>
            <br />
            <span className='pSpan'>Language:</span>
            <span className='cSpan'>{videoInfo.language}</span>
            <br />
            <span className='pSpan'>Category:</span>
            <span className='cSpan'>{videoInfo.Category}</span>
            <br />
          </div>
        </div>

        {otherVideos.length > 0 && (
          <div className='otherCards'>
            {otherVideos.map((otherVideo) => (
              <div key={otherVideo.id} className='vd'>

                <button
                  onClick={() => navigate(`/nextCard`, { state: { videoInfo: otherVideo } })}
                >

                  <Link to={{
                    pathname: '/nextCard',
                    state: { videoInfo: otherVideo }
                  }} key={otherVideo._id}>

                    <div className='othervideos'>
                      <div className='othervideosImage'>
                        <img src={otherVideo.thumbnailURL} alt="Video Thumbnail" />
                      </div>

                      <div className='othervideosinfo'>
                        <div className='othervideosTitle'>
                          <span>{otherVideo.title}</span>
                        </div>

                        <div className='divide'>
                          <div className='othervideosViews'>
                            <span>{formatViews(otherVideo.views)} views</span>
                          </div>

                          <div className="freeOrpaid2">
                            <span>
                              {otherVideo.isPaid ? <FaDollarSign /> : <FaHeart />}
                            </span>
                          </div>
                      </div>
                      
                    </div>
                    </div>

                    </Link>

                </button>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
    </>
  );

};

export default NextCard;













