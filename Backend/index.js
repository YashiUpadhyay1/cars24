// Backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// routes
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// api routes
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reviews', reviewRoutes);

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// error handler (last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
