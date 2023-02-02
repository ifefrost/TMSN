import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {
  return (
    <div className="bg-[#11131B] h-full">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Search />} />
          <Route path='/tv' element={<Search />} />
          <Route path='/search' element={<Search />} />
          <Route path='/movie' element={<Movie />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
