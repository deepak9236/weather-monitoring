import { fetchWeatherData, calculateDailySummary } from '../services/weatherService.js';
import { saveWeatherData,checkWeatherAlerts } from '../services/weatherService.js';
import { convertTemperature } from '../utils/temperature.js';
// import { fetchWeatherData } from '../services/weatherService.js';

// Function to fetch and store weather data
export const getWeatherData = async (req, res) => {
  try {
    const weatherData = await fetchWeatherData();
    await saveWeatherData(weatherData); 
    res.status(200).json(weatherData);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Function to generate daily summaries
export const generateDailySummary = async (req, res) => {
  try {
    // Fetch the latest weather data
    const weatherData = await fetchWeatherData();

    // Save the data to the database for future reference
    await saveWeatherData(weatherData);

    // Calculate and generate the daily summary
    const summary = await calculateDailySummary();

    res.status(200).json(summary);
  } catch (err) {
    console.error('Error generating summary:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};

export const getWeatherAlerts = async (req, res) => {
  try {
    const alerts = await checkWeatherAlerts();
    res.status(200).json(alerts);
  } catch (err) {
    console.error('Error fetching weather alerts:', err);
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
};

export const testTemperatureConversion = async (req, res) => {
  const { tempInKelvin, unit = 'Celsius' } = req.body;
  try {
    const convertedTemp = convertTemperature(tempInKelvin, unit);
    res.status(200).json({ temperature: convertedTemp });
  } catch (err) {
    console.error('Error converting temperature:', err);
    res.status(500).json({ error: 'Failed to convert temperature' });
  }
};

export const getRawWeatherData = async (req, res) => {
  try {
    const rawData = await fetchWeatherData(); // Get raw weather data
    res.status(200).json(rawData);
  } catch (err) {
    console.error('Error fetching raw weather data:', err);
    res.status(500).json({ error: 'Failed to fetch raw weather data' });
  }
};
