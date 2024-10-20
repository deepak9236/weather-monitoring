# Real-Time Weather Monitoring System

[[Deployed Application](https://your-deployed-app-link)](https://your-deployed-app-link)

## Overview

This real-time weather monitoring system leverages the OpenWeatherMap API to collect, process, and display weather data from major metros in India. The system includes daily weather summaries and a threshold-based alerting mechanism. It is designed to offer real-time data rollups, aggregates, and user-configurable thresholds for alerts.

---

## Key Features

1. **Real-Time Data Fetching**: Continuously retrieves weather data from the OpenWeatherMap API at configurable intervals.
2. **Weather Data Aggregation**: Calculates daily average, maximum, minimum temperatures, and determines the dominant weather condition.
3. **Alert System**: Triggers alerts based on user-defined thresholds for temperature and weather conditions.
4. **Responsive Dashboard**: Displays real-time weather summaries and triggered alerts with a clean, responsive UI.
5. **Auto-Refresh**: Weather data is updated every 5 minutes to ensure up-to-date insights.

## API Usage

This system uses the [OpenWeatherMap API](https://openweathermap.org/). You need to sign up and obtain an API key to run the application.

### Weather Parameters Used
- `main`: Main weather condition (Rain, Snow, Clear, etc.)
- `temp`: Current temperature (in Celsius)
- `feels_like`: Perceived temperature (in Celsius)
- `dt`: Timestamp of the data update (Unix format)

## API Routes

- **GET** `/api/weather/data`: Fetches real-time weather data from the API.
- **GET** `/api/weather/summary`: Provides daily weather summaries with aggregates.
- **GET** `/api/weather/alerts`: Returns any alerts based on user-configured thresholds.
- **POST** `/api/weather/testTempConversion`: Tests temperature conversion from Kelvin to the desired unit.
- **GET** `/api/weather/raw`: Retrieves raw weather data from the API.

### Route Implementation

```javascript
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
```

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB
- React

### Steps to Run the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/weather-monitoring-system.git
   cd weather-monitoring-system
    ```
2. Backend Setup:
    - Install dependencies
    ```bash
    cd backend
    npm install
    ```

    - Configure environment variables in `.env`:
    ```bash
    OPENWEATHER_API_KEY=your_api_key
    MONGO_URI=mongodb://localhost:27017/weather
    ```

    - Run the backend:
    ```bash
    npm start
    ```

3. Frontend Setup:
    - Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```
    - Run the frontend:
    ```bash
    npm start
    ```

## Postman Collection

For testing API routes, I have included a Postman collection file. Use it to verify the weather data fetching, summary, and alerting functionalities.

```json
{
	"info": {
		"_postman_id": "e1038c69-4124-4eec-b823-5bd031f75081",
		"name": "weather-monitoring",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "19349818"
	},
	"item": [
		{
			"name": "Fetch Weather Data",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5001/api/weather/fetch",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"weather",
						"fetch"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Daily Weather Summary",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5001/api/weather/summary",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"weather",
						"summary"
					]
				}
			},
			"response": []
		},
		{
			"name": "alerts",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5001/api/weather/alerts",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5001",
					"path": [
						"api",
						"weather",
						"alerts"
					]
				}
			},
			"response": []
		},
		{
			"name": "testTempConversion",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n  \"tempInKelvin\": 298.15,\n  \"unit\": \"Celsius\"\n}\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5001/api/weather/testTempConversion",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5001",
					"path": [
						"api",
						"weather",
						"testTempConversion"
					]
				}
			},
			"response": []
		},
		{
			"name": "Raw",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	]
}
