import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");
  const navigate = useNavigate();
  return (
    <footer className='bg-[#1F2230] py-10 text-white text-center w-full mt-auto'>
      <div className='mx-auto 2xl:max-w-screen-xl py-10 px-2 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='flex items-center '>
          <div className='pr-3'>
            <h1 className='text-4xl mb-1 no-underline text-white font-sans font-bold text-right'>
              TMSN
            </h1>
            <button className='bg-blue-700 h-[46px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-1 rounded-full hover:shadow' onClick={() => navigate('/register')}>
              Join the community
            </button>
          </div>
          <ul className='flex flex-col gap-2 text-left pl-3'>
            <li className='mx-3'>
              <Link to='/' className="hover:underline">Home</Link>
            </li>
            <li className='mx-3'>
              <Link to='/Search' className="hover:underline">Search</Link>
            </li>
            <li className='mx-3'>
              {/* if logged in go to profile and reload page*/}
              {token ? (
                <Link to={`/${username}`} className="hover:underline">
                  Profile
                </Link>
              ) : (
                <Link to='/login' className="hover:underline">Login</Link>
              )}
            </li>
          </ul>
        </div>
        <p className='text-gray-500 text-xs mt-6'>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p className=' text-gray-400 mt-5'>© The Movie Social Network</p>
      </div>
    </footer>
  );
};

export default Footer;
