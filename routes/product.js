const express = require('express');

const router = express.Router();

// middleware
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, listAll, remove, read, update, list, productsCount, productStar, listRelated, searchFilters }  = require('../controllers/product');

// routes
router.get('/products/total', productsCount);
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);  // products/10
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', list);
// rating
router.put('/product/star/:productId', authCheck, productStar);
// related
router.get('/product/related/:productId', listRelated);
// search
router.post('/search/filters', searchFilters) // easier to send params using post



module.exports = router;