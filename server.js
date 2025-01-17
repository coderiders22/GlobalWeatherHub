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
    
    const BEARER_TOKEN = 'WcN31HtXg7SG6lg7DmBy5RXxvRmdMUn3U4Ost5sBg3SkN1XhMO4W7mypPZgoGkFPUz2CrWcU+VNnUF1yVA0qEhO08KAngLNxZmxeOfzxwsBE2aJtAhhjXj59OLJZexgJX86qYbS1WlvPxMX5vgKM0QLz4zDofv9VsJcDNRNpBIPWNGwl7Q1W1Edh2XLwAoyeuFejbkpKxcqCHlL60MgXiaoF6Dcymivvye5TdpxzKVqE617WEGfTbOIjKX+fXXRAzMeMxmWBG1qiIz5++qJml3kD5n5lfPPZnVfIzvy3NYj7NESn2gJJXnc8tJRwxmGd2OUbdiSwuDcjKlAQ3ijmQnW78QAVOzmNa6WY2++yrdPZRj6SIBWc4EDqfeNr0789CGKARfXfm1E9cuGCqloNSYgCkzRql/+9zeZ6Offdjiqox6+LHwSzrbXs2YKSjZ0YROcIpYFjcU037Q27Z8alTJjItezvHtTuBzPVOjQSg7Rj6N7FkH2IiRrSOtXWfsV0WUlrej9vR6qouYfHIrJ3n+JkEsbGNyEIBEc6/pLKaFZTpg6bJ9he1RqSH+TsefPtj0WT7bTYQFPFejRuLQRea4rF520qNy0OQELQaZcods7UXKKQY2XZ+tmeabu31idRwO9rR+cd2PP9QKOG3eE38N2Fpd+2vXWxAarWEavizfk=';
    
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