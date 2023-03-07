import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ options, title, icon }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    let dropdownHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", dropdownHandler);

    return () => {
      document.removeEventListener("click", dropdownHandler);
    };
  });

  const handleClick = (action) => {
    if (action){
      action();
    }
    setOpen(!open);
  };

  return (
    <div className='ml-3 relative' ref={menuRef}>
      <button
        className={`flex focus:outline-none ${
          open
            ? "bg-gray-700 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }  px-3 py-2 rounded-md text-sm font-medium `}
        onClick={() => setOpen(!open)}
        id='user-menu'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='user-menu'
        aria-expanded='false'
        aria-haspopup='true'
      >
        <div className='flex items-center'>
          <span className='mr-3'>
            <div className='flex items-center'>
              <span className=' hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
                {title}
              </span>
              {icon}
            </div>
          </span>
        </div>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 rounded-md shadow-lg px-1 py-2 w-full bg-gray-700 ring-1 ring-black ring-opacity-5'>
          {options.map((option, index) => (
            <div key={index} className='text-center'>
              <Link
                to={option.link}
                className='block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-[#11131B]'
                role='menuitem'
                onClick={()=>handleClick(option.onClick)}
              >
                {option.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
