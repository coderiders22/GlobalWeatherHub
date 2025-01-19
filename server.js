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
    
    const BEARER_TOKEN = 'sC1790GIvlBJA7pqoEossCEIZPhMumMLd3FAXdjh7Zf1B/5UtC32T5jurg6tN1LX9AThk4rTikKhxVvk0WNpX8Dq/NcMRdKAFjpZ5jynl2K3NPFfNAtreTi9kbXuXd8Eq2ILF4H/Tqy8odTUUnSNVLSOeoLn80iSkAaV0YplQM8aNVE/zhkaJCYfLLCWEDQnBf/V4Bnp1x3fn8xo3glHicfI4ORUfFZxVPe59NSI+1K3mKII8PYQWWx5KM4+EM7m6hLuRm6v9LTwFiT7HFpLe92X1hgnB3KPrSYYhQVzlGxQHhqPiXIcPIN2pNwI8QnGWTm3sjR6nkkRdtNMPHrBHbVD6xlP9N7/sEbu+wRKn+CMhaFNrpVXpmINt0wDgGkQdIKESkrAls4Jsyy8InWuGOIT4DOxV852FxaqCSttoY+ngEhb3/EkMtPj5ndpLdAkcNchfdZPogTaMzeJgaMU/LxNRFkGWIxnh2SIswMBpe6iTuSXVWXtxeeomC8I4xFI7LO0K+lhxY4KkZVYLZkpkB5acOIoe0AjUTcuElVAA5/z4wjbs9y8b4k4rDJsseiEMpoqG2zX5rgl9K4DpujSTzKNHQJegB/M3OoKqYxDqOmB3YuLaQ9v8YqNu0abfjmqqs8w7rgSO26bWAbCUSBQMNbwGz26EPJ1LsvK+/VooJk=';
    
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