const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'your-secret-api-key') {
    return res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }
  next(); // Pass control to the next middleware
};

module.exports = authMiddleware;