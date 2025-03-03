require('dotenv').config(); // Loads environment variables from .env
const express = require('express');
const app = express();
const ratingRoutes = require('./routes/ratingRoutes'); // Import routes

const port = process.env.PORT || 3001;

app.use(express.json());

// Use rating routes
app.use('/rating', ratingRoutes);

app.listen(port, () => {
  console.log(`Rating Engine running at http://localhost:${port}`);
});
