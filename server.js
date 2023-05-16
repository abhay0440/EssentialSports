const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // The port your proxy server will run on

app.use(cors());

app.get('/rss', async (req, res) => {
  try {
    const response = await axios.get('https://www.essentiallysports.com/feed/');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching RSS feed');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
