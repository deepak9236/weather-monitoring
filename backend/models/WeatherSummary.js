import mongoose from 'mongoose';

const WeatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  averageTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
});

export const WeatherSummary = mongoose.model('WeatherSummary', WeatherSummarySchema);
