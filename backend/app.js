import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import weatherRoutes from './routes/weatherRoutes.js';
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors())
// Middleware for parsing JSON
app.use(express.json());

// Weather API routes
app.use('/api/weather', weatherRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  // console.log(process.env.PORT);
  console.log(`Server running on port ${PORT}`);
});
