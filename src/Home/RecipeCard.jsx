// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaEye, FaClock, FaHeart, FaDollarSign } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from "../images/raj-removebg-preview.png";
// import "../index.css";

// const formatViews = (views) => {
//   if (views >= 1000000) {
//     return (views / 1000000).toFixed(1) + 'M';
//   } else if (views >= 1000) {
//     return (views / 1000).toFixed(1) + 'k';
//   } else {
//     return views.toString();
//   }
// };

// const RecipeCard = () => {
//   const [freeVideos, setFreeVideos] = useState([]);
//   const [paidVideos, setPaidVideos] = useState([]);
//   const [loadingFreeVideos, setLoadingFreeVideos] = useState(false);
//   const [loadingPaidVideos, setLoadingPaidVideos] = useState(false);
//   const navigate = useNavigate();

//   const fetchFreeVideos = useCallback(async () => {
//     try {
//       setLoadingFreeVideos(true);
//       const response = await axios.get('http://localhost:8000/api/v2/videos/free');
//       setFreeVideos(prevFreeVideos => [...prevFreeVideos, ...response.data]);
//     } catch (error) {
//       console.error('Error fetching free videos:', error.message);
//     } finally {
//       setLoadingFreeVideos(false);
//     }
//   }, []);

//   const fetchPaidVideos = useCallback(async () => {
//     try {
//       setLoadingPaidVideos(true);
//       const response = await axios.get('http://localhost:8000/api/v2/videos/paid');
//       setPaidVideos(prevPaidVideos => [...prevPaidVideos, ...response.data]);
//     } catch (error) {
//       console.error('Error fetching paid videos:', error.message);
//     } finally {
//       setLoadingPaidVideos(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchFreeVideos();
//       await fetchPaidVideos();
//     };
//     fetchData();
//   }, [fetchFreeVideos, fetchPaidVideos]);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   };

//   // Shuffle the videos when the component mounts
//   useEffect(() => {
//     shuffleArray(freeVideos);
//     shuffleArray(paidVideos);
//   }, [freeVideos, paidVideos]);

//   return (
//     <div className='Home'>

//       <div className="Cards">
//         {/* Free Videos */}
//         {freeVideos.map((video) => (
//           <div key={video._id}>
//             {/* Use a button or any clickable element to handle the click event */}
//             <button
//               onClick={() => navigate(`/nextCard`, { state: { videoInfo: video } })}
//             >
//               <Link to={{
//                 pathname: '/nextCard',
//                 state: { videoInfo: video }
//               }} key={video._id}>
//                 <div className="FreeCard" key={video._id}>
//                   <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
//                     <div className="video">
//                       <img className="image" src={video.thumbnailURL} alt="Video Thumbnail" />
//                       <div className="icons">
//                         <div className="one">
//                           <span className="star">
//                             <FaEye />
//                           </span>
//                           <span className="rating">{formatViews(video.views)}</span>
//                         </div>
//                         <div className="two">
//                           <span className="clock">
//                             <FaClock />
//                           </span>
//                           <span className="time">{video.duration}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </a>
//                   <div className="info">
//                     <div className="logo">
//                       <img src={logo} alt="Channel Logo" />
//                     </div>
//                     <div className="title">
//                       <span>{video.title}</span>
//                     </div>
//                     <div className="like">
//                       <span>
//                         <FaHeart />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </button>
//           </div>
//         ))}

//         {/* Paid Videos */}
//         {paidVideos.map((video) => (
//           <div key={video._id}>
//             {/* Use a button or any clickable element to handle the click event */}
//             <button
//               onClick={() => navigate(`/nextCard`, { state: { videoInfo: video } })}
//             >
//               <Link to={{
//                 pathname: '/nextCard',
//                 state: { videoInfo: video }
//               }} key={video._id}>
//                 <div className="PaidCard" key={video._id}>
//                   <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
//                     <div className="video">
//                       <img className="image" src={video.thumbnailURL} alt="Video Thumbnail" />
//                       <div className="icons">
//                         <div className="one">
//                           <span className="star">
//                             <FaEye />
//                           </span>
//                           <span className="rating">{formatViews(video.likes)}</span>
//                         </div>
//                         <div className="two">
//                           <span className="clock">
//                             <FaClock />
//                           </span>
//                           <span className="time">{video.duration}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </a>
//                   <div className="info">
//                     <div className="logo">
//                       <img src={logo} alt="Channel Logo" />
//                     </div>
//                     <div className="title">
//                       <span>{video.title}</span>
//                     </div>
//                     <div className="purchase">
//                       <span>
//                         <FaDollarSign />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default RecipeCard;



import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEye, FaClock, FaHeart, FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/raj-removebg-preview.png";
import "../index.css";

const RecipeCard = () => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  const navigate = useNavigate();

  const fetchVideos = useCallback(async () => {
    try {
      setLoadingVideos(true);
      const response = await axios.get('http://localhost:8000/api/v2/videos');
      setVideos(response.data);
      setHasShuffled(false); 
    } catch (error) {
      console.error('Error fetching videos:', error.message);
    } finally {
      setLoadingVideos(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

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
    if (!hasShuffled && videos.length > 0) {
      setVideos((prevOtherVideos) => shuffleArray(prevOtherVideos));
      setHasShuffled(true); // Set the flag to true after shuffling
    }
  }, [hasShuffled, videos]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    } else {
      return views.toString();
    }
  };

  return (
    <div className='HomePage'>
      <div className="Cards">
        {videos.map((video) => (
          <div key={video._id}>
            <button
              onClick={() => navigate(`/nextCard`, { state: { videoInfo: video } })}
            >
              <Link to={{
                pathname: '/nextCard',
                state: { videoInfo: video }
              }} key={video._id}>
                <div className="Card" key={video._id}>
                  <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                    <div className="video">
                      <img className="videoImage" src={video.thumbnailURL} alt="Video Thumbnail" />
                      <div className="icons">
                        <div className="one">
                          <span className="eye">
                            <FaEye />
                          </span>
                          <span className="views">{formatViews(video.views)}</span>
                        </div>
                        <div className="two">
                          <span className="clock">
                            <FaClock />
                          </span>
                          <span className="duration">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="cardInfo">
                    <div className="cardLogo">
                      <img src={logo} alt="Channel Logo" />
                    </div>
                    <div className="cardTitle">
                      <span>{video.title}</span>
                    </div>
                    <div className="freeOrpaid">
                      <span>
                        {video.isPaid ? <FaDollarSign /> : <FaHeart />}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;

