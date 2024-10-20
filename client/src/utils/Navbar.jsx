import React from 'react';
import { Link } from 'react-router-dom'; // Added useLocation
import cromaLogo from '../../assets/croma.png'; // Import the logo

const Navbar = () => {

  return (
    <nav className="bg-white py-6 px-4 md:px-8 fixed shadow-sm w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-xl font-bold text-blue-600 flex items-center">
          <img src={cromaLogo} alt="Croma Logo" className="h-8 mr-2" />
        </Link>

        {/* Links for Desktop and Mobile */}
        <div className={`md:flex md:items-center space-x-6`}>
          <div className={`flex flex-col md:flex-row items-center md:space-x-6`}>
            <Link to = "/"
              className={`navmenu transition duration-300 cursor-pointer`}
              
            >
              Home
            </Link>

            <button
              className={`navmenu transition duration-300 cursor-pointer`}
              
            >
              Profile
            </button>

            <button
              className={`navmenu transition duration-300 cursor-pointer`}
              
            >
              Logout
            </button>
 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
