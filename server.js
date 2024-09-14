const express = require('express');

require('dotenv').config();
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('./logger');  // Import the logger



const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests
app.use(cookieparser());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    app.get('/', (req, res) => {
        res.send('Welcome to the API');
    });
    

// User registration and login routes
app.use('/ap2', userRoutes);

// Protect routes using roles
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
