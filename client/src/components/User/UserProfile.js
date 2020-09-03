import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    return(
        <div>
            <h1>User Profile Page</h1>
            <ul>
            <li><Link to="/api/users/myAccount">My Account</Link></li>
            <li><Link to="/api/users/updateMyPassword">Update Password</Link></li>
            <li><Link to="/api/users/myOrders">My Orders</Link></li>
            </ul>
        </div>
    )
}

export default UserProfile;