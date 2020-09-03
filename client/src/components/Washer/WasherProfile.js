import React from 'react';
import { Link } from 'react-router-dom';

const WasherProfile = () => {
    return(
        <div>
            <h1>Washer Profile Page</h1>
            <ul>
            <li><Link to="/api/washers/myAccount">My Account</Link></li>
            <li><Link to="/api/washers/updateWasherPassword">Update Password</Link></li>
            <li><Link to="/api/washers/myOrders">My Orders</Link></li>
            </ul>
        </div>
    )
}

export default WasherProfile;