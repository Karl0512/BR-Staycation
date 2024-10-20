import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Home from './home/Home';
import Gallery from './gallery/Gallery'
import Book from './book/Book'
import ContactUs from './contact/ContactUs'
import Login from './login/Login'
import Signup from './signup/Signup'

export default function App() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/book' element={<Book />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}