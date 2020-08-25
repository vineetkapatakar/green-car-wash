import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav>
            <div className="nav-wrapper" style={{background: "#42f566"}}>
            <a href="/" className="brand-logo">Green Car Wash</a>
            <ul id="nav-mobile" className="right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/api/users/login">User</Link></li>
                <li><Link to="/api/washers/login">Washer</Link></li>
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;