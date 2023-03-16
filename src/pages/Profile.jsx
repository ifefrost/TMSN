import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortraitSlider from "../components/PortraitSlider";

const Profile = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [user, setUser] = useState({});
  const token = { token: sessionStorage.getItem("token") };
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);

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
      };
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

  return (
    <div className='mx-auto max-w-screen-xl px-8 text-white my-20'>
      {user.username ? (
      <div>
          <h1 className='text-[3.25rem] font-bold'>{`${user.username}'s profile`}</h1>
        <div className="pt-4">
          <p><span className="font-bold">Email:</span> {user.email}</p>

          {/* liked movies */}
          {user.likedMovie && user.likedMovie.length > 0 ? (
            <PortraitSlider heading="Favourited Movies" media="movie" resultArray={movieList} styling={"mt-10"} />
          ) : (
            <p className="text-[1.5rem] font-bold my-5">No favourited movies</p>
          )}
          {/* liked tv shows */}
          {user.likedTV && user.likedTV.length > 0 ? (
            <PortraitSlider heading="Favourited TV Shows" media="tv" resultArray={tvList} styling={"mt-10"} />
          ) : (
            <p className="text-[1.5rem] font-bold my-5">No favourited TV shows</p>
          )}
          
        </div>
      </div>
      ) : (
        <h1 className='text-[2rem] font-bold'>Loading profile...</h1>
      )}
    </div>
  );
};

export default Profile;
