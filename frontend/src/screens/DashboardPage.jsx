import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const ObservationForm = ({ gorillaId, onCreateObservation }) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    onCreateObservation({ 
      notes,
      observedAt: new Date().toISOString(),
      gorilla: gorillaId
    });
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add a new observation..."
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
        rows="3"
      ></textarea>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
        Submit Observation
      </button>
    </form>
  );
};

const GorillaCard = ({ gorilla, onCreateObservation }) => {
  return (
    <div key={gorilla.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <img 
        src={gorilla.photo?.thumbnail || `https://via.placeholder.com/400x300/CCCCCC/FFFFFF?text=${gorilla.name}`}
        alt={gorilla.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{gorilla.name}</h3>
        <p className="text-sm font-medium text-blue-600 mb-2">{gorilla.species}</p>
        <p className="text-gray-700 mb-4 h-20 overflow-y-auto">{gorilla.bio}</p>
        
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-2">Observations ({gorilla.observations?.length || 0})</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {gorilla.observations && gorilla.observations.length > 0 ? (
              gorilla.observations.map(obs => (
                <div key={obs.id} className="bg-gray-100 p-3 rounded-md text-sm">
                  <p className="text-gray-800">{obs.notes}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    - {obs.observer?.name || 'Unknown'} on {new Date(obs.observedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No observations yet.</p>
            )}
          </div>
           <ObservationForm gorillaId={gorilla.id} onCreateObservation={onCreateObservation} />
        </div>
      </div>
    </div>
  );
};

const DashboardPage = ({ user, gorillas, onLogout, onLoadGorillas, onCreateObservation }) => {
  useEffect(() => {
    onLoadGorillas();
  }, [onLoadGorillas]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GorillaTracker Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {user.name} ({user.role})!</p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition text-sm"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {gorillas.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Loading gorillas or none have been added yet...</p>
                <p className="text-sm text-gray-400 mt-2">Visit the Admin Panel to add the first gorilla.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gorillas.map(gorilla => (
                <GorillaCard key={gorilla.id} gorilla={gorilla} onCreateObservation={onCreateObservation} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
