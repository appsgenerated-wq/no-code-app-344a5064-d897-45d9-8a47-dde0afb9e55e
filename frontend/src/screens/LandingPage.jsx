import React from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1591035186597-6a73a340b5a4?q=80&w=2070&auto=format&fit=crop')"}}></div>
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to GorillaTracker
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore the lives of the world's gorillas. Track individuals, view observations from researchers, and contribute to conservation efforts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onLogin('researcher@manifest.build', 'password')} // Using default user for demo
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Researcher Demo Login
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition duration-300 ease-in-out"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
