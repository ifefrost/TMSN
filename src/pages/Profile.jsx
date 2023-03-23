import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortraitSlider from "../components/PortraitSlider";
import { MdAdd, MdPersonAdd, MdPersonRemove } from "react-icons/md";
import PopUpModal from "../components/PopUpModal";

const Profile = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [user, setUser] = useState({});
  const token = { token: sessionStorage.getItem("token") };
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [showFollow, setShowFollow] = useState(false);

  const getUser = useCallback(async () => {
    if (!token.token) {
      navigate("/login");
    } else {
      const response = await fetch("http://localhost:8000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });
      const data = await response.json();
      setUser(data.data);
    }
  }, [token]);

  // for every liked movie, get the details from the API and add it to an array
  const getLikedDetails = useCallback(async (likedArray, mediaType) => {
    //console.log(likedArray);
    const likedDetails = [];
    if (likedArray) {
      for (let i = 0; i < likedArray.length; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${likedArray[i]}?api_key=${apiKey}&language=en-US`
        );
        const json = await response.json();
        likedDetails.push(json);
      }
    }
    if (mediaType === "movie") {
      setMovieList(likedDetails);
    }
    if (mediaType === "tv") {
      setTvList(likedDetails);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getLikedDetails(user.likedMovie, "movie");
    getLikedDetails(user.likedTV, "tv");
  }, [user]);

  const handleClose = () => setShowFollow(false);

  return (
    <div className='mx-auto max-w-screen-xl px-8 text-white my-20'>
      {user.username ? (
        <div>
          <h1 className='text-[3.25rem] font-bold'>{`${user.username}'s profile`}</h1>
          <button
            className='flex focus:outline-none  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            aria-expanded='false'
            aria-haspopup='false'
            onClick={() => setFollowed(!followed)}
          >
            <div className='flex items-center'>
              <span className='mr-3'>
                {followed ? (
                  <div className='flex items-center'>
                    <span className='px-3 py-2 rounded-md text-sm font-medium'>
                      Follow
                    </span>
                    <MdPersonAdd className='h-8 w-8 text-white' />
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <span className='px-3 py-2 rounded-md text-sm font-medium'>
                      Unfollow
                    </span>
                    <MdPersonRemove className='h-8 w-8 text-white' />
                  </div>
                )}
              </span>
            </div>
          </button>
          <div className='pt-4'>
            <p className='mb-2' onClick={()=>setShowFollow(true)}>
              <span className='font-bold'>Followers</span> {0}{" "}
              <span className='font-bold ml-2'>Following</span> {0}
            </p>
            <p>
              <span className='font-bold'>Email:</span> {user.email}
            </p>

            {/* liked movies */}
            {user.likedMovie && user.likedMovie.length > 0 ? (
              <PortraitSlider
                heading='Favourited Movies'
                media='movie'
                resultArray={movieList}
                styling={"mt-10"}
              />
            ) : (
              <p className='text-[1.5rem] font-bold my-5'>
                No favourited movies
              </p>
            )}
            {/* liked tv shows */}
            {user.likedTV && user.likedTV.length > 0 ? (
              <PortraitSlider
                heading='Favourited TV Shows'
                media='tv'
                resultArray={tvList}
                styling={"mt-10"}
              />
            ) : (
              <p className='text-[1.5rem] font-bold my-5'>
                No favourited TV shows
              </p>
            )}
          </div>

          <PopUpModal visible={showFollow} close={handleClose} />
        </div>
      ) : (
        <h1 className='text-[2rem] font-bold'>Loading profile...</h1>
      )}
    </div>
  );
};

export default Profile;
