const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Quản lý nhà cung cấp
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Lấy danh sách nhà cung cấp
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Danh sách nhà cung cấp
 */
router.get('/', async(req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
});
/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Tạo nhà cung cấp mới
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhà cung cấp tạo thành công
 */
router.post('/', auth, async(req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
});

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID nhà cung cấp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã được cập nhật
 */
router.put('/:id', auth, async(req, res) => {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSupplier);
});
// GUI: danh sách nhà cung cấp
router.get('/list', auth, async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
});

// GUI: form thêm nhà cung cấp
router.get('/add', auth, (req, res) => {
    res.render('suppliers/form', { supplier: {} });
});

// GUI: xử lý thêm nhà cung cấp
router.post('/add', auth, async(req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.redirect('/suppliers/list');
});

// GUI: form sửa nhà cung cấp
router.get('/edit/:id', auth, async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { supplier });
});

// GUI: xử lý sửa nhà cung cấp
router.post('/edit/:id', auth, async(req, res) => {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers/list');
});

// API: Xóa nhà cung cấp
/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Xóa nhà cung cấp
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID nhà cung cấp
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã xóa
 */
router.delete('/:id', auth, async(req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted' });
});

module.exports = router;