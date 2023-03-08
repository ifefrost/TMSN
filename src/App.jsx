import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/inter/variable-full.css";
import ScrollReset from "./components/ScrollReset";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Person from "./pages/Actor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className='bg-[#11131B] min-h-screen flex flex-col'>
      <BrowserRouter>
        <Nav />
        <ScrollReset>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/person/:id' element={<Person />} />
            <Route path='/details/:media_type/:id' element={<Details />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </ScrollReset>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
