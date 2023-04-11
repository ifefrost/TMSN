import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopUpModal = ({ visible, close, followers, following }) => {
    if (!visible) return null;
    const handleInvisible = (e) => {
      if (e.target === e.currentTarget) close();
    };
    const [activeTab, setActiveTab] = useState(true);

    const navigate = useNavigate();

    const navigateToUser = (user) => {
      navigate(`/${user}`);
      window.location.reload();
  }

    return (
      <div
        className='fixed inset-0 bg-black bg-opacity-50 text-white backdrop-blur flex justify-center items-center z-10'
        onClick={handleInvisible}>
        <div className='relative w-[25rem] h-[30rem] bg-[#1F2230] rounded-xl p-5'>
           <div className="font-[1.5rem] text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-5">
            <div className="flex">
                  <a href="#" className={`w-full inline-block p-4 border-b-2 border-transparent rounded-t-lg  ${activeTab ? "text-blue-500 border-blue-700" : "hover:text-white hover:border-gray-300"}`} onClick={()=>setActiveTab(true)}>Followers</a>
                  <a href="#" className={`w-full inline-block p-4 border-b-2 border-transparent rounded-t-lg  ${!activeTab ? "text-blue-500 border-blue-700" : "hover:text-white hover:border-gray-300"}`} aria-current="page" onClick={()=>setActiveTab(false)}>Following</a>
            </div>
           </div>
          <div className='absolute top-0 right-0 p-4'>
            <button className='text-3xl font-bold leading-none' onClick={close}>
              &times;
            </button>
          </div>
          {(activeTab ? followers : following).map((item) => (
            <div className='flex flex-row items-center p-2 rounded-md hover:cursor-pointer hover:bg-gray-700 hover:text-white' key={item} onClick={()=>{navigateToUser(item)}}>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                <img
                  src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${item}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="ml-2">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PopUpModal;
  