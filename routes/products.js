const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 */
router.get('/', async(req, res) => {
    const products = await Product.find().populate('supplier');
    res.json(products);
});

// GUI: danh sách sản phẩm
router.get('/list', auth, async(req, res) => {
    const products = await Product.find().populate('supplier');
    res.render('products/index', { products });
});
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 */
router.put('/:id', auth, async(req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
});
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sản phẩm tạo thành công
 */
router.post('/', auth, async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

// GUI: form thêm sản phẩm
router.get('/add', auth, async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
});

// GUI: xử lý thêm sản phẩm
router.post('/add', auth, async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products/list');
});

// GUI: form sửa sản phẩm
router.get('/edit/:id', auth, async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
});

// GUI: xử lý sửa sản phẩm
router.post('/edit/:id', auth, async(req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products/list');
});

// API: Xóa sản phẩm
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Sản phẩm đã xóa
 */
router.delete('/:id', auth, async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;