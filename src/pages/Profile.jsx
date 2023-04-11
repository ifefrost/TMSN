import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PortraitSlider from "../components/PortraitSlider";
import { MdAdd, MdPersonAdd, MdPersonRemove } from "react-icons/md";
import PopUpModal from "../components/PopUpModal";

const Profile = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { username } = useParams();
  const [user, setUser] = useState({});
  const token = { token: sessionStorage.getItem("token") };
  const profileUsername = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [showFollow, setShowFollow] = useState(false);

  const getUser = useCallback(async () => {
    if (!token.token) {
      navigate("/login");
    } else {
      const response = await fetch(
        `http://localhost:8000/profile/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token),
        }
      );
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

  //update the followed state and the user when followed is changed
  useEffect(() => {
    checkFollowing();
    getUser();
  }, [followed]);

  useEffect(() => {
    getLikedDetails(user.likedMovie, "movie");
    getLikedDetails(user.likedTV, "tv");
  }, [user]);

  const handleClose = () => setShowFollow(false);

  const handleFollow = useCallback(async () => {
    if (!token.token) {
      navigate("/login");
    } else {
      const response = await fetch(`http://localhost:8000/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.token,
          username: username,
        }),
      });
      const data = await response.json();
      console.log(data);
    }
    // runs checkFollowing to update the followed state
    checkFollowing();
  }, [token, username]);

  const checkFollowing = useCallback(async () => {
    // console.log(username, 'username');
    if (!token.token) {
      navigate("/login");
    } else {
      const response = await fetch(`http://localhost:8000/check-following`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.token,
          username: username,
        }),
      });
      const data = await response.json();
      // console.log(data, 'followers');
      // console.log(profileUsername, 'user');
      if(data.includes(profileUsername)) {
        setFollowed(false);
      } else {
        setFollowed(true);
      }
    }
  }, [token, username]);

  return (
    <div className='my-20 text-white mx-auto px-2 md:px-8 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs max-w-sm'>
      {user.username ? (
        <div>
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
              <img
                src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${user.username}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="mx-auto sm:text-5xl text-[2.5rem] sm:w-min md:w-auto font-bold">{`${user.username}'s profile`}</h1>
              <p
                className="px-5 py-3 mt-5 sm:mx-0 mx-auto w-min bg-[#1F2230] hover:bg-[#303446] rounded-lg truncate cursor-pointer"
                onClick={() => setShowFollow(true)}
              >
                <span className="font-bold">Followers</span>{" "}
                {user.followers.length}{" "}
                <span className="font-bold ml-2">Following</span>{" "}
                {user.following.length}
              </p>
            </div>

            {!user.currentUser && (
              <button
                className="flex h-[50px] bg-[#303446] text-white focus:outline-none hover:bg-gray-300 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                aria-expanded="false"
                aria-haspopup="false"
                onClick={handleFollow}
              >
                <div className="flex items-center">
                  <span className="mr-3">
                    {followed ? (
                      <div className="flex items-center">
                        <span className="px-3 py-2 rounded-md text-sm font-medium">
                          Follow
                        </span>
                        <MdPersonAdd className="h-8 w-8" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="px-3 py-2 rounded-md text-sm font-medium">
                          Unfollow
                        </span>
                        <MdPersonRemove className="h-8 w-8" />
                      </div>
                    )}
                  </span>
                </div>
              </button>
            )}
          </div>

          <div className="pt-4">

            {/*if user is current user show email*/}
            {user.currentUser && (
              <div className="w-full flex flex-col">
                <p className="mt-4 mx-auto sm:mx-0">
                  <span className="font-bold">Email:</span> {user.email}
                </p>
              </div>
            )}

            {/* liked movies */}
            {user.likedMovie && user.likedMovie.length > 0 ? (
              <PortraitSlider
                heading="Favourite Movies"
                media="movie"
                resultArray={movieList}
                styling={"mt-10"}
              />
            ) : (
              <p className="text-[1.5rem] font-bold my-5">
                No favourite movies
              </p>
            )}
            {/* liked tv shows */}
            {user.likedTV && user.likedTV.length > 0 ? (
              <PortraitSlider
                heading="Favourite TV Shows"
                media="tv"
                resultArray={tvList}
                styling={"mt-10"}
              />
            ) : (
              <p className="text-[1.5rem] font-bold my-5">
                No favourite TV shows
              </p>
            )}
          </div>

          <PopUpModal
            visible={showFollow}
            close={handleClose}
            followers={user.followers}
            following={user.following}
          />
        </div>
      ) : (
        <h1 className="text-[2rem] font-bold">Loading profile...</h1>
      )}
    </div>
  );
};

export default Profile;
