
import React from 'react';
import './Navbar.css'; // นำเข้าไฟล์ CSS

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/" className="navbar-logo">Logo</a>
            </div>
            <ul className="navbar-menu">
                <li><a href="/" className="navbar-link">Home</a></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;
