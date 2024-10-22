import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Gallery from './components/Gallery'
import Book from './components/Book'
import ContactUs from './components/ContactUs'
import Login from './components/Login'
import Signup from './components/Signup'

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