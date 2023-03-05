import React from "react";
import { Link } from "react-router-dom";
import {MdPersonOutline} from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token');

  const logout = () => {
    if (token) {
      sessionStorage.removeItem('token');
      navigate('/');
    } else {
      navigate('/login')
    }
  }
    return (
        <nav className="bg-[#11131B] sticky top-0 z-10">
          <div className="mx-auto 2xl:max-w-screen-xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-2xl no-underline text-white hover:text-blue-dark font-sans font-bold">TMSN</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/"}>Home</Link>
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/search"}>Search</Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="ml-3 relative">
                  <div>
                    <button
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => logout()}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{token ? 'Logout' : 'Login'}</span>
                        <MdPersonOutline className="h-8 w-8 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
    )
}

export default Nav;