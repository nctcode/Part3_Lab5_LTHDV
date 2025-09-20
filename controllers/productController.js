const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const suppliers = await Supplier.find();
    const selectedSupplier = req.query.supplierId || '';
    const searchQuery = req.query.search || '';
    let filter = {};
    if (selectedSupplier) {
        filter.supplier = selectedSupplier;
    }
    if (searchQuery) {
        filter.name = { $regex: searchQuery, $options: 'i' };
    }
    // Populate supplier, but handle missing supplier gracefully
    let products = await Product.find(filter).populate('supplier');
    // If supplier is deleted, set supplier to null
    products = products.map(p => {
        if (!p.supplier) {
            p.supplier = null;
        }
        return p;
    });
    res.render('index', { products, suppliers, selectedSupplier, searchQuery });
};

exports.create = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/form', { product: {}, suppliers });
};

exports.store = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    // Check if supplier exists (if provided)
    if (supplier) {
        const supplierExists = await Supplier.findById(supplier);
        if (!supplierExists) {
            const suppliers = await Supplier.find();
            return res.render('products/form', { product: req.body, suppliers, error: 'Selected supplier does not exist.' });
        }
    }
    await Product.create({ name, price, quantity, supplier: supplier || null });
    res.redirect('/products');
};

exports.edit = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { product, suppliers });
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    // Check if supplier exists (if provided)
    if (supplier) {
        const supplierExists = await Supplier.findById(supplier);
        if (!supplierExists) {
            const product = await Product.findById(req.params.id);
            const suppliers = await Supplier.find();
            return res.render('products/form', { product: {...product.toObject(), name, price, quantity, supplier }, suppliers, error: 'Selected supplier does not exist.' });
        }
    }
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier: supplier || null });
    res.redirect('/products');
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};