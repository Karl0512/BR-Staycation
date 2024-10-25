import { Link, NavLink } from 'react-router-dom';
import "../style/sidenav.css"

export default function SideNav() {
    return (
        <div className='side-nav'>
            <div className='side-nav-heading'>
                <img src="/img/brstaycationLogo.jpg" alt="" />
                <h1>Staycation</h1>
            </div>
            <div className='side-nav-link'>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/dashboard" 
                    >
                        <img src="/img/calendar.svg" alt="" />
                        Booking Overview
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/roommanagement" 
                    >
                        <img src="/img/management.svg" alt="" />
                        Room Management
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/housekeepingschedule" 
                    >
                        <img src="/img/schedule.svg" alt="" />
                        Housekeeping Schedule
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/customer" 
                    >
                        <img src="/img/customer.svg" alt="" />
                        Customer Management
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/paymentinvoices" 
                    >
                        <img src="/img/invoice.svg" alt="" />
                        Payment & Invoices
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/reportAnalytics" 
                    >
                        <img src="/img/analytics.svg" alt="" />
                        Report & Analytics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={({ isActive }) => (isActive ? 'active-link' : '')} 
                        to="/message" 
                    >
                        <img src="/img/caht.svg" alt="" />
                        Message Center/Chat
                    </NavLink>
                </li>
            </div>
            <div>
                <li><Link to="/">Sign out</Link></li>
            </div>
        </div>
    )
}