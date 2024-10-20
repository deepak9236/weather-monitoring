// Dashboard.js
import React, { useEffect, useState } from 'react';
import WeatherSummary from '../components/WeatherSummary';
import Alerts from '../components/Alerts';

const Dashboard = () => {
  const [weatherSummary, setWeatherSummary] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch weather summary and alerts from the backend
  const fetchWeatherData = async () => {
    try {
      setLoading(true);

      // Fetch weather summary data
      const summaryResponse = await fetch('/api/weather/summary');
      if (!summaryResponse.ok) throw new Error('Failed to fetch weather summary');
      const summaryData = await summaryResponse.json();
      setWeatherSummary(summaryData);

      // Fetch weather alerts data
      const alertsResponse = await fetch('/api/weather/alerts');
      if (!alertsResponse.ok) throw new Error('Failed to fetch alerts');
      const alertsData = await alertsResponse.json();
      setAlerts(alertsData);

      // Show popup if there are alerts
      if (alertsData.length > 0) {
        setShowPopup(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchWeatherData on page load and at regular intervals
  useEffect(() => {
    fetchWeatherData();

    // Auto-update data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 300000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 drop-shadow-lg">
        Weather Monitoring Dashboard
      </h1>
      <p className="text-center text-gray-600 italic mb-6">
        Data updates automatically every 5 minutes.
      </p>
      <WeatherSummary summary={weatherSummary} />
      <Alerts alerts={alerts} />

      {/* Alert Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Weather Alerts</h2>

            {/* Render actual alerts inside the popup */}
            <div className="text-left">
              <Alerts alerts={alerts} />
            </div>

            <button
              onClick={() => setShowPopup(false)} // Manually close the popup
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
