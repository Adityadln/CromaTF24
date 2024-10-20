import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation"; // Import the TypeAnimation component

const About = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen">
      {/* Home Section */}
      <div className="pt-24 md:pt-32 container mx-auto px-4 md:px-8 lg:px-24 flex flex-col-reverse lg:flex-row-reverse items-center justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          {/* Typing Animation for the title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            <TypeAnimation
              sequence={[
                'Croma Intelligent Solutions', // Text to display
                1500, // Delay before changing text
                'Uncovering Competitive Insights', // Second text
                2000, // Delay before looping back
              ]}
              wrapper="span"
              cursor={true} // Show cursor
              repeat={Infinity} // Loop the animation infinitely
              className="inline-block" // Additional styling if needed
            />
          </h1>

          <h3 className="text-base md:text-lg text-gray-600 mb-6 mt-8">
            Our platform helps you gain competitive insights into India’s electronics retail sector. We provide detailed comparisons of major players in the market, including Reliance Digital, Vijay Sales, Aditya Vision, and more. Whether you’re looking to understand business models, product portfolios, geographical presence, or customer feedback, we’ve got you covered.
          </h3>

          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <a
              href=""
              className="w-full sm:w-auto px-6 py-2 md:px-8 md:py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-gray-700 mb-2 sm:mb-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about our solution
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="relative">
            <img src="../assets/home.png" alt="Illustration" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
