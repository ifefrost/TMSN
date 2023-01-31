import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <div className="bg-gray-800 h-screen">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Search />} />
          <Route path='/tv' element={<Search />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
