const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8000;

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
    
    const BEARER_TOKEN = 'T+Ir41dyonvxfAkTTwPCgK1ia3WOebgmN8jfiWMqVNADwaUcZ94ngOD3ARWY79ieW5/JMO5yzhknxmbLZcgVENiPehttWMH5OpJ60l44fX8po/vJ/QBj9OMItqqAz++vYbei/XnjJuws490szaJDYQHFg5RCllrAzCi0utN5BFIR3AMoPYq2KXEsmrahOxyt49SxGzXYSDqtcfudxYX0P3lwLZOyZUTZcEz1diCcesaGa0HGA0nMH4LJS9G/Qe69XaQ5+yJbugBk0ZQ5YDBur+f1cP4awO9VxY/OS416rSVLMlXE13LgjAJGYhkIanEv15kTo31ICLS6jowTwpH18NDt3y4mQJkcCRPbzFXPUcmKLYzLoRquYui0X9lpUplFTtE1Z099OVvCRZpUK4COoYLTnsuvOG4UKEAoIw4NNiWv+7eins4rxdTYMBcb1eix2kM4c9WEvYh+Vg1zQXghagbewCR47YFe6dfuhIIZJAD0yCC6Zegms8USduYf/IhGhWXmPjrxIf5h8+4PfoG8KOijJLmKp0P5LWmVCktnKt8QbRCn7/n0qSKjAQdKldeboOGjYZNw2XYSPU0x5cUlqYaf2d/ne2RnuTH5oupDnnw/JK3v8SH4jdNlXxy03/HgWwQQi0Nq6hS7ujvR6zZ1peBOQjCyxN4QXVXDGkaNxW8=';
    
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
