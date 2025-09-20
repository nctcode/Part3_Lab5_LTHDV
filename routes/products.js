const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const authMiddleware = require('../middleware/auth');

// Hiển thị danh sách sản phẩm (admin)
router.get('/', authMiddleware, async(req, res) => {
    try {
        const products = await Product.find().populate('supplier');
        res.render('products/index', { products });
    } catch (err) {
        res.send(err.message);
    }
});

// Form thêm sản phẩm
router.get('/create', authMiddleware, async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
});

// Xử lý thêm sản phẩm
router.post('/create', authMiddleware, async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.create({
        name,
        price,
        quantity,
        supplier: supplier || null
    });
    res.redirect('/products');
});

// Form sửa sản phẩm
router.get('/edit/:id', authMiddleware, async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
});

// Xử lý sửa sản phẩm
router.post('/edit/:id', authMiddleware, async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        quantity,
        supplier: supplier || null
    });
    res.redirect('/products');
});

// Xóa sản phẩm
router.get('/delete/:id', authMiddleware, async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});

module.exports = router;