{/* {otherVideos.length > 0 && (
          <div className='othervideos'>
            {otherVideos.map((otherVideo) => (
              <div key={otherVideo.id} className='vd'>

              <div className='othervideosImage'>
                  <img src={otherVideo.thumbnailURL} alt="Video Thumbnail" />
              </div>

              <div className='othervideosinfo'>
                <div className='othervideosTitle'>
                    <span>{otherVideo.title}</span>
                  </div>

                  <div className='othervideosViews'>
                    <span>{formatViews(otherVideo.views)} views</span>
                  </div>

                  {otherVideo.isPaid && (
                    <div className='Buy'>
                      <span>
                        <FaDollarSign />
                      </span>
                    </div>
                  )}
              </div>

              </div>
            ))}
          </div>  
        )} */}



  // const [otherVideos, setOtherVideos] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchOtherVideos = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8000/api/v2/videos`);
  //       const data = await response.json();
  //       setOtherVideos(data);
  //     } catch (error) {
  //       setError('Error fetching other videos: ' + error.message);
  //     }
  //   };

  //   fetchOtherVideos();
  // }, [location.state]);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!location.state) {
  //   console.error("Video information not available.");
  //   return <div>Video information not available.</div>;
  // }