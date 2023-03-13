import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PortraitSlider from "../components/PortraitSlider";

const Profile = () => {
  const [user, setUser] = useState({});
  const token = { token: sessionStorage.getItem("token") };
  const navigate = useNavigate();

  const getUser = async () => {
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
  };

  const showLiked = (title, likedValue)=> {
    if (likedValue.length > 0) {
      return (
        <PortraitSlider heading={`Liked ${title}`} media={title} resultArray={likedValue} styling={""} />
      )
    } else {
      return (
        <p className="text-[1.5rem] font-bold my-5">No liked {title}</p>
      )
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='mx-auto max-w-screen-xl px-8 text-white my-20'>
      {user.username ? (
      <div>
          <h1 className='text-[3.25rem] font-bold'>{`${user.username}'s profile`}</h1>
        <div className="pt-4">
          <p><span className="font-bold">ID:</span> {user.id}</p>
          <p><span className="font-bold">Email:</span> {user.email}</p>
          {showLiked("Movies", user.likedMovie)}
          {showLiked("TV shows", user.likedTV)}
        </div>
      </div>
      ) : (
        <h1 className='text-[2rem] font-bold'>Loading profile...</h1>
      )}
    </div>
  );
};

export default Profile;
