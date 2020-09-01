import React from 'react';
import { Link } from 'react-router-dom';

const WasherHome = () => {
    return(
        <div>
            <h1>Washer Home Page</h1>
            <ul>
            <li><Link to="/api/washers/bookings">Bookings</Link></li>
            <li><Link to="/api/washers/logout">Logout</Link></li>
            </ul>
        </div>
    )
}

export default WasherHome;