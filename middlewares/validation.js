const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "name"' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "description"' });
  }
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid or missing "price"' });
  }
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "category"' });
  }
  if (inStock === undefined || typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'Invalid or missing "inStock"' });
  }

  next(); // Pass control to the next middleware
};

module.exports = validateProduct;