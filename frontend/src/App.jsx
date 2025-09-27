import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';

const manifest = new Manifest();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [gorillas, setGorillas] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setBackendConnected(true);
          console.log('✅ Backend connection successful.');
          // Check for existing user session
          const user = await manifest.from('User').me();
          if (user) {
            setCurrentUser(user);
            setCurrentScreen('dashboard');
          }
        } else {
          throw new Error('Backend not healthy');
        }
      } catch (error) {
        setBackendConnected(false);
        console.error('❌ Backend connection failed:', error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  const loadGorillas = async () => {
    try {
      const response = await manifest.from('Gorilla').find({ 
        include: ['observations', 'observations.observer'],
        sort: { name: 'asc' }
      });
      setGorillas(response.data);
    } catch (error) {
      console.error('Failed to load gorillas:', error);
    }
  };

  const createObservation = async (observationData) => {
    try {
      await manifest.from('Observation').create(observationData);
      loadGorillas(); // Refresh the list to show the new observation
    } catch (error) {
      console.error('Failed to create observation:', error);
    }
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-600'}`}>
          {backendConnected ? 'API Connected' : 'API Disconnected'}
        </span>
      </div>
      
      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          gorillas={gorillas} 
          onLogout={handleLogout} 
          onLoadGorillas={loadGorillas}
          onCreateObservation={createObservation}
        />
      )}
    </div>
  );
}

export default App;
