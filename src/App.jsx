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
import Dashboard from './components/Dashboard'
import RoomManagement from './components/RoomManagement'
import HousekeepingSchedule from './components/HousekeepingSchedule.jsx'
import PaymentInvoices from './components/PaymentInvoices'
import ReportAnalytics from './components/ReportAnalytics'
import Message from './components/Message'
import SideNav from './components/SideNav.jsx';
import Customer from './components/Customer.jsx';

export default function App() {
  const location = useLocation();

  // Check if the current path is a dashboard-related path
  const dashboardPaths = [
    '/dashboard', 
    '/roommanagement', 
    '/housekeepingschedule', 
    '/paymentinvoices', 
    '/reportanalytics', 
    '/message',
    '/customer'
  ];

  const isDashboardPath = dashboardPaths.includes(location.pathname.toLowerCase());

  return (
    <>


      {/* Show Navbar if not on dashboard-related paths and not on login/signup */}
      {!isDashboardPath && location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}

      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/book' element={<Book />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/roommanagement' element={<RoomManagement />} />
        <Route path='/housekeepingschedule' element={<HousekeepingSchedule />} />
        <Route path='/paymentinvoices' element={<PaymentInvoices />} />
        <Route path='/reportanalytics' element={<ReportAnalytics />} />
        <Route path='/message' element={<Message />} />
        <Route path='/customer' element={<Customer />} />
      </Routes>
    </>
  )
}