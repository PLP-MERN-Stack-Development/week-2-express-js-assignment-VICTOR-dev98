const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get('/resource', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to resource!' });
});

module.exports = router;