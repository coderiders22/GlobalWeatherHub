# GlobalWeatherHub 🌍

A dynamic web application that provides real-time weather information for any location on Earth, built as part of an assignment to demonstrate REST API integration using Syncloop. Users can interact with a leaflet map to get detailed weather data for specific coordinates.

## Assignment Overview 📝

This project was created to fulfill the following requirements:
1. Create REST APIs on Syncloop
2. Develop a GUI to consume these APIs
3. Integrate Leaflet JavaScript Map
4. Implement functionality to:
   - Capture coordinates on map click
   - Fetch weather information using those coordinates

## Features 🌟

- Integration with Syncloop REST API for weather data
- Interactive map interface using Leaflet.js
- Real-time weather data fetching
- Location search functionality
- Detailed weather information including:
  - Current temperature and conditions
  - Atmospheric conditions (humidity, wind, pressure)
  - Sun and moon information (sunrise, sunset)
  - Local time display
- Weather alerts for extreme conditions
- Responsive design with glass-morphism UI
- Coordinates display for clicked locations

## Prerequisites 📋

Before running this application, make sure you have:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- A modern web browser

## Quick Start Guide 🚀

1. Clone the repository:
```bash
git clone https://github.com/coderiders22/GlobalWeatherHub.git
cd GlobalWeatherHub
```

2. Install required dependencies:
```bash
npm install
npm install express cors path
```

3. Start the application:
```bash
node server.js
```

4. Open your web browser and navigate to:
```
http://localhost:3000
```

That's it! The application is now running with all necessary configurations already set up in the code.

## How to Use 🎯

1. When you first open the application, you'll see a welcome screen with basic instructions
2. You can interact with the application in two ways:
   - Click anywhere on the map to get weather information for that location
   - Use the search bar to find a specific location
3. The application will display:
   - Current weather conditions
   - Temperature details
   - Wind speed and direction
   - Humidity and pressure
   - Sunrise and sunset times
   - Local time at the selected location

## Tech Stack 💪

- Frontend:
  - HTML5
  - CSS3 with Tailwind CSS
  - JavaScript
  - Leaflet.js for mapping
  - Font Awesome for icons
  - Chart.js for data visualization

- Backend:
  - Node.js
  - Express.js
  - Syncloop API for weather data
  - OpenStreetMap for geocoding

## API Integration 🔌

### Syncloop API
- Custom REST API built on Syncloop
- Returns comprehensive weather data for specified coordinates
- Authentication and endpoints are pre-configured in the application

### Local API Endpoints
#### GET `/Weather_Info`
- Parameters:
  - `lt`: Latitude
  - `ln`: Longitude
- Returns: Weather information from Syncloop API

#### GET `/`
- Serves the main HTML page

## Error Handling ⚠️

The application includes comprehensive error handling for:
- Invalid coordinates
- Failed API requests
- Geocoding failures
- Network issues

## Author ✍️

Manav Rai
manavrai454@gmail.com
+91 8054776034
Punjab Engineering College,Chd
---

For any additional questions or issues, please open an issue in the repository: https://github.com/coderiders22/GlobalWeatherHub/issues
