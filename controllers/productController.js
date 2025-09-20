const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const products = await Product.find().populate('supplier');
    res.render('products/index', { products });
};

exports.create = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
};

exports.store = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.create({ name, price, quantity, supplier });
    res.redirect('/products');
};

exports.edit = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect('/products');
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};