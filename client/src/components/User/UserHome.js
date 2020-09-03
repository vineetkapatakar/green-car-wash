import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
    return(
        <div>
            <h1>User Home Page</h1>
            <ul>
            <li><Link to="/api/users/userProfile">My Profile</Link></li>
            <li><Link to="/api/bookings/carwashBooking">Car Wash Booking</Link></li>
            <li><Link to="/api/users/bookings">Bookings</Link></li>
            <li><Link to="/api/users/logout">Logout</Link></li>
            </ul>
        </div>
    )
}

export default UserHome;