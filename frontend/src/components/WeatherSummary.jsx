import React from "react";

// Utility function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

// Group and sort weather summary by city, then sort each city's data by date
const groupByCity = (summary) => {
  const grouped = summary.reduce((acc, citySummary) => {
    const cityName = citySummary?._id?.city || 'Unknown City';
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(citySummary);
    return acc;
  }, {});

  // Sort each city's summary by date (ascending order)
  Object.keys(grouped).forEach((city) => {
    grouped[city].sort((a, b) => new Date(a._id.date) - new Date(b._id.date));
  });

  return grouped;
};

const WeatherSummary = ({ summary }) => {
  const groupedByCity = groupByCity(summary || []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 drop-shadow-lg tracking-wide">
        Weather Summary
      </h2>

      {summary && summary.length > 0 ? (
        <div className="space-y-10">
          {Object.keys(groupedByCity).map((city, cityIndex) => (
            <div key={cityIndex}>
              {/* City Name */}
              <h3 className="text-3xl font-bold mb-6 text-teal-600">
                {city}
              </h3>

              {/* Display each day's summary for the city, sorted by date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedByCity[city].map((citySummary, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <p className="text-gray-600">
                      Date:{" "}
                      <span className="font-medium">
                        {citySummary?._id?.date
                          ? formatDate(citySummary._id.date)
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Average Temp:{" "}
                      <span className="font-medium">
                        {citySummary?.averageTemp
                          ? `${citySummary.averageTemp.toFixed(2)}°C`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Max Temp:{" "}
                      <span className="font-medium">
                        {citySummary?.maxTemp
                          ? `${citySummary.maxTemp.toFixed(2)}°C`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Min Temp:{" "}
                      <span className="font-medium">
                        {citySummary?.minTemp
                          ? `${citySummary.minTemp.toFixed(2)}°C`
                          : "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Dominant Condition:{" "}
                      <span className="font-medium">
                        {citySummary?.dominantCondition || "N/A"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherSummary;
