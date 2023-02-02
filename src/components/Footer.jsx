const Footer = () => {
  return (
    <footer className='bg-[#1F2230] text-white text-center w-full'>
      <div className='mx-auto 2xl:max-w-screen-xl py-10 px-2 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='flex items-center '>
          <div className='pr-3'>
            <h1 className='text-4xl no-underline text-white font-sans font-bold text-right'>
              TMSN
            </h1>
            <button className='bg-blue-700 border-white border-2 hover:bg-black text-white font-bold py-1 px-4 mt-3 rounded-full'>
              Join the community
            </button>
          </div>
          <ul className='text-left pl-3'>
            <li className='mx-3'>
              <a href=''>Movies</a>
            </li>
            <li className='mx-3'>
              <a href=''>TV Shows</a>
            </li>
            <li className='mx-3'>
              <a href=''>Search</a>
            </li>
            <li className='mx-3'>
              <a href=''>Account</a>
            </li>
          </ul>
        </div>
        <p className='text-gray-500 text-xs pt-3'>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p className=' text-gray-400 p-1'>© The Movie Social Network</p>
      </div>
    </footer>
  );
};

export default Footer;
