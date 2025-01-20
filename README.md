# GlobalWeatherHub 🌍

A dynamic web application that provides real-time weather information for any location on Earth, built as part of an assignment to demonstrate REST API integration using Syncloop. Users can interact with a leaflet map to get detailed weather data for specific coordinates.

> [!IMPORTANT]
Live Application 🔗

Explore the deployed version of GlobalWeatherHub here: [GlobalWeatherHub Live Platform](https://globalweatherhub.koyeb.app/)

> [!NOTE]
> ## Syncloop API Integration 🔌

The Syncloop API, which provides the weather data for this application, is included in the repository. You can download the API package by clicking the link below:

[Download Syncloop API Package](https://github.com/coderiders22/GlobalWeatherHub/blob/5806618e5f236e42f4850e3f784cb797d4fc0b17/Syncloop%20Weather%20Api%20.zip)

Once downloaded, please extract the contents and follow the setup instructions provided in the package to integrate the API into the application.

### Syncloop API
- Custom REST API built on Syncloop
- Returns comprehensive weather data for specified coordinates
- Authentication and endpoints are pre-configured in the application

## Prerequisites 📋

Before running this application, make sure you have:

- Node.js (v12 or higher)
- npm (Node Package Manager)
- A modern web browser

> [!TIP]
> ## Quick Start Guide 🚀

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
http://localhost:8000
```
5. Add the token to your application**:
   In the project, find the following line of code in server.js file:

   ```javascript
   const BEARER_TOKEN = 'Replace existing token with your token generated through the platform';
   ```

   Replace `'Insert Bearer Token Here'` with the token you generated from Syncloop API Dashboard.

Once you have added your token, the application will authenticate API requests using that token.

That's it! The application is now running with all necessary configurations set up in the code.

### Local API Endpoints
#### GET `/Weather_Info`
- Parameters:
  - `lt`: Latitude
  - `ln`: Longitude
- Returns: Weather information from Syncloop API

#### GET `/`
- Serves the main HTML page

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

  ## Screenshots 📸

Here are some screenshots of the application:

### Desktop Views:

- **Welcome Screen**  
  This is the first screen that greets users.  
  ![Welcome Screen](https://github.com/coderiders22/GlobalWeatherHub/blob/f1efbb240b20f1207eac04e98d13c40b4b8b78dd/Screenshots/welcome%20screen.png)

- **Before Selecting Map Coordinates**  
  The screen before any interaction with the map.  
  ![Before Selecting Coordinates](https://github.com/coderiders22/GlobalWeatherHub/blob/f1efbb240b20f1207eac04e98d13c40b4b8b78dd/Screenshots/before%20selecting%20.png)

- **After Selecting Map Coordinates**  
  The updated screen after selecting a location on the map.  
  ![After Selecting Coordinates](https://github.com/coderiders22/GlobalWeatherHub/blob/f1efbb240b20f1207eac04e98d13c40b4b8b78dd/Screenshots/after%20selecting.png)

- **Features a weather alert system for extreme conditions**
   ![Alert Message](https://github.com/coderiders22/GlobalWeatherHub/blob/72784d577f0ae1df070fe729e73dbe0dcc2db6ce/Screenshots/alert%20message.png)

### Mobile & Tablet View:

- **Tablet View**  
  A responsive view on tablet device.  
  ![Tablet View](https://github.com/coderiders22/GlobalWeatherHub/blob/4ee1a29a3e88b730ef411b66218b165abe3d0d0c/Screenshots/tablet%20view.png)

- **Mobile View**  
  A responsive view on mobile device.  
  ![Mobile View](https://github.com/coderiders22/GlobalWeatherHub/blob/4ee1a29a3e88b730ef411b66218b165abe3d0d0c/Screenshots/mobile%20view.png)

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

## Error Handling ⚠️

The application includes comprehensive error handling for:
- Invalid coordinates
- Failed API requests
- Geocoding failures
- Network issues

## Author ✍️

**Manav Rai**  
Email: [manavrai454@gmail.com](mailto:manavrai454@gmail.com)  
College: Punjab Engineering College, Chandigarh


---

For any additional questions or issues, please open an issue in the repository: https://github.com/coderiders22/GlobalWeatherHub/issues






