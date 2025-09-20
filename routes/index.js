const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async(req, res) => {
    const suppliers = await Supplier.find();
    const products = await Product.find().populate('supplier');

    const selectedSupplier = req.query.supplierId || ''; // query param từ form
    const searchQuery = req.query.search || '';

    let filteredProducts = products;

    if (selectedSupplier) {
        filteredProducts = filteredProducts.filter(p => p.supplier && p.supplier._id.toString() === selectedSupplier);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    res.render('index', {
        products: filteredProducts,
        suppliers,
        selectedSupplier,
        searchQuery
    });
});


module.exports = router;