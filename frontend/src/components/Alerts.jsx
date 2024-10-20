import React from 'react';

// Utility function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Alerts = ({ alerts }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <p key={index} className="text-lg mb-2">
            <span className="font-semibold">{alert.city}:</span>{" "}
            <span>{alert.message}</span>
            {/* Displaying the date */}
            <span className="text-gray-600 italic ml-2">
              ({formatDate(alert.date)})
            </span>
          </p>
        ))
      ) : (
        <p>No alerts triggered.</p>
      )}
    </div>
  );
};

export default Alerts;
