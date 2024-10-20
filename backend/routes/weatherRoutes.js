import express from 'express';
import { getWeatherData, generateDailySummary, getWeatherAlerts, testTemperatureConversion, getRawWeatherData } from '../controllers/weatherController.js';

const router = express.Router();

// Route to fetch weather data and save it
router.get('/data', getWeatherData);

// Route to generate daily weather summary
router.get('/summary', generateDailySummary);

// Route to get weather alerts based on thresholds
router.get('/alerts', getWeatherAlerts);

// Route to test temperature conversion
router.post('/testTempConversion', testTemperatureConversion);

// Route to get raw weather data
router.get('/raw', getRawWeatherData);

export default router;
