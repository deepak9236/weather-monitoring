import dotenv from 'dotenv';
dotenv.config();

export const apiConfig = {
  apiKey: process.env.OPENWEATHERMAP_API_KEY,
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
};
