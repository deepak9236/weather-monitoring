import axios from 'axios';
import { WeatherSummary } from '../models/WeatherSummary.js';
import { apiConfig } from '../config/api.js';
import { convertTemperature } from '../utils/temperature.js';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Fetch weather data for all cities
export const fetchWeatherData = async () => {
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const response = await axios.get(`${apiConfig.baseUrl}?q=${city}&appid=${apiConfig.apiKey}`);
      return {
        city,
        temp: convertTemperature(response.data.main.temp),
        feels_like: convertTemperature(response.data.main.feels_like),
        condition: response.data.weather[0].main,
        timestamp: response.data.dt,
      };
    })
  );
  return weatherData;
};

// Calculate daily summary for all cities
export const calculateDailySummary = async () => {
  const summary = await WeatherSummary.aggregate([
    {
      $group: {
        _id: { city: "$city", date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
        averageTemp: { $avg: "$averageTemp" },
        maxTemp: { $max: "$maxTemp" },
        minTemp: { $min: "$minTemp" },
        dominantCondition: { $first: "$dominantCondition" },
      },
    },
  ]);
  return summary;
};

export const saveWeatherData = async (weatherData) => {
  try {
    await Promise.all(
      weatherData.map(async (data) => {
        const weatherSummary = new WeatherSummary({
          city: data.city,
          date: new Date(data.timestamp * 1000), // Convert Unix timestamp to Date
          averageTemp: data.temp,
          maxTemp: data.temp, // Update based on actual max/min calculation logic
          minTemp: data.temp, // Update based on actual max/min calculation logic
          dominantCondition: data.condition,
        });
        await weatherSummary.save();
      })
    );
  } catch (error) {
    console.error('Error saving weather data:', error);
  }
};


const temperatureThreshold = 35; // Example threshold
export const checkWeatherAlerts = async () => {
  const weatherData = await WeatherSummary.find(); // Fetch saved weather data
  const alerts = weatherData.map((data) => {
    const alertMessages = [];

    // Check if temperature exceeds threshold
    if (data.maxTemp > temperatureThreshold) {
      alertMessages.push({ city: data.city, message: `Temperature exceeded ${temperatureThreshold}°C` });
    }

    // Additional alert checks can be added here (e.g., rain, storm)

    return alertMessages;
  });

  return alerts.flat();
};
