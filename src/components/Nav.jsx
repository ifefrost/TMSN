import React from "react";
import { Link, Router } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-2xl no-underline text-white hover:text-blue-dark font-sans font-bold">TMSN</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/"}>Home</Link>
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/movies"}>Movies</Link>
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/tv"}>TV Shows</Link>
                    <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={"/search"}>Search</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
    )
}

export default Nav;