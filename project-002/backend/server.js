require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Satellite = require('./models/Satellite');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001;
// Enable CORS for all routes
app.use(cors());

// Replace the following with your MongoDB connection string
const uri = process.env.MONGODB_URI

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/latest-data', async (req, res) => {
  try {
    const satellites1 = await Satellite.find({name:'UNID'})
    .sort({ _id: -1 }) // Sort by _id in descending order
     .limit(1);         // Limit the result to the last 2 documents
     const satellites2 = await Satellite.find({name:'SL-1 R/B'})
    .sort({ _id: -1 }) // Sort by _id in descending order
     .limit(1);         // Limit the result to the last 2 documents
     const satellites = [satellites1[0],satellites2[0]]
    console.log(satellites);
    res.json(satellites);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
