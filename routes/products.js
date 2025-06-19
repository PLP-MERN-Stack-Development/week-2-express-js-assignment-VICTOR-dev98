const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { NotFoundError, ValidationError } = require('../errors');

// GET /api/products: List all products with filtering and pagination
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      products,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id: Get a specific product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products: Create a new product
router.post('/', async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const product = new Product({ name, description, price, category, inStock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id: Update an existing product
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, inStock },
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id: Delete a product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// GET /api/products/search: Search products by name
router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Missing "name" query parameter' });
    }

    const matchingProducts = await Product.find({
      name: { $regex: name, $options: 'i' },
    });

    res.json(matchingProducts);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats: Get product statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json(stats);
  } catch (err) {
    next(err);
  }
});


module.exports = router;