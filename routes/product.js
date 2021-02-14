const express = require('express');

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, listAll }  = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);  // products/10


module.exports = router;