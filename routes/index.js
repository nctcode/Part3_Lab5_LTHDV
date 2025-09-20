const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async(req, res) => {
    const suppliers = await Supplier.find();
    let products = await Product.find().populate('supplier');

    const { supplierId, search } = req.query;
    if (supplierId) products = products.filter(p => p.supplier._id.toString() === supplierId);
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    res.render('index', { products, suppliers });
});

module.exports = router;