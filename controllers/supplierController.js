const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
};

exports.create = (req, res) => {
    res.render('suppliers/form', { supplier: {} });
};

exports.store = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect('/suppliers');
};

exports.edit = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { supplier });
};

exports.update = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect('/suppliers');
};

exports.delete = async(req, res) => {
    // Prevent deleting supplier if referenced by products
    const Product = require('../models/Product');
    const productCount = await Product.countDocuments({ supplier: req.params.id });
    if (productCount > 0) {
        const suppliers = await Supplier.find();
        return res.render('suppliers/index', { suppliers, error: 'Cannot delete supplier: It is referenced by products.' });
    }
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
};