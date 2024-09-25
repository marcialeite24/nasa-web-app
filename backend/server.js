const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/apod', async (req, res) => {
    const { start_date, end_date } = req.query
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}`);
        const data =  await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});