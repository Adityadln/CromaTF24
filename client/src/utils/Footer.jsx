import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-around px-4 font-semibold">
        {/* Left Side */}
        <div className="flex flex-col space-y-4 text-center md:text-left md:mr-10">
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </div>
        
        {/* Second Column */}
        <div className="flex flex-col space-y-4 text-center md:text-left md:mr-10">
        <Link to="/about" className="hover:text-gray-400">Profile</Link>
          {/* <Link to="/resources" className="hover:text-gray-400">Logout</Link> */}
          {/* <Link to="/contact" className="hover:text-gray-400">Contact</Link> */}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-8 text-gray-200 font-bold">
        Made By Team NeuronOps
      </div>
    </footer>
  );
};

export default Footer;
