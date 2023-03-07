import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const token = { value: sessionStorage.getItem("token") };
  const navigate = useNavigate();

  const getUser = async () => {
    if (!token.value) {
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='mx-auto max-w-screen-xl px-8'>
      <div>
        <h1 className='text-[2rem] text-white font-bold'>Profile Page</h1>
        <div className="pt-4">
          <p className='text-white'>User ID: {user.id}</p>
          <p className='text-white'>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
