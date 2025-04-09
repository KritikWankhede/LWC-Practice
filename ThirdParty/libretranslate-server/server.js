const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the LibreTranslate API');
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    try {
        const response = await axios.post('http://localhost:5000/translate', {
            q: text,
            source: 'auto',
            target: targetLanguage
        });
        res.json({ translatedText: response.data.translatedText });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});