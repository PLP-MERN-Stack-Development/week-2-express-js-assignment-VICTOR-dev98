const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const resourceRoutes = require('./routes/resource');
const logger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(logger);
app.use(authMiddleware);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Use the products routes
app.use('/api/products', productsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;