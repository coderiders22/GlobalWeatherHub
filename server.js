const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function getReverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const data = await response.json();
        return data.address?.city || data.address?.town || data.address?.village || data.address?.suburb;
    } catch (error) {
        console.error('Geocoding Error:', error);
        return null;
    }
}

app.get('/Weather_Info', async (req, res) => {
    const { lt, ln } = req.query;
    
    if (!lt || !ln) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required parameters: lt (latitude) and ln (longitude) are required'
        });
    }
    
    const latitude = parseFloat(lt);
    const longitude = parseFloat(ln);
    
    const BEARER_TOKEN = 'f4a9rnY/Kza+IcKq+bF+UxklXE2G0m+6TlbgyWDFrgX/PPPnVTAgVK4d50uLMAhJ5vsx/xQTt7z+ljbYBz1VEyvECMRUPXrXLESWaGjAca56kTCZBHjzGRyIHSRkco0EgH/3f8tEhpXOShtY4ujE7h5+lb0wXyXiKwMj7yC49ZROc4sqgfkCNRbf3Hru1FCNMJFyorzv3Toaha/vD18dv9Qu9aJU3KB9Uz8XfpQ32mUn9y79w27Tj5tUYIpNfvkMoc38HgYspFZDHbU3nuEJNPqvk0v30AE7wJc2U465UqyN9rFVSJQETnWjbk46EXhzCFFtQyMLFYSkRYDkekv2dIvMHTGuqHKj5SIAggbuEsdazfPVjQbjm6kqivjSgJG+gaa+R8asmfl5ebyWjA75TT39HzLyPyNwansEJD13mWbNWJwE5seYeCd/U3HRuIDKM6IwE+771/fbsaLWO/aNTYNVJ1SpFX1Z8fupoRp7LH6rRS2xJOV3bulH7BGddZJQ+doPc/2SYg7N3DmdGMB9f/98Kgw9CBEKdeAOnSa9C/2K5CyJmrIVneKZTBGTwS0hlWNOmKF5KfB5D+yXpCeoevJwnSdwXi0WHcurKZCS//ofDEgw+BopqJvIqNuym/ZLWYFH9LSaW2UJjAip5jk3M/TfOexHtePi6KSEZW816rQ=';
    
    try {
      
        const locationName = await getReverseGeocode(latitude, longitude);
        
        const response = await fetch(
            `https://cloud.syncloop.com/tenant/1737057817390/packages.PEC_training.api.Weather_Info.main?lt=${latitude}&ln=${longitude}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.response?.jsonDoc?.cod !== 200) {
            throw new Error(data.response?.jsonDoc?.message || 'Failed to fetch weather data');
        }

    
        if (locationName && data.response?.jsonDoc) {
            data.response.jsonDoc.name = locationName;
        }

        res.json(data);
    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({
            status: 'error',
            message: `Failed to fetch weather data: ${error.message}`
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});