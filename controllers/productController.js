const Product = require("../models/Product");

// Hiển thị danh sách sản phẩm
exports.index = async(req, res) => {
    try {
        const products = await Product.find();
        res.render("products/index", { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Form thêm mới
exports.newForm = (req, res) => {
    res.render("products/new");
};

// Tạo mới
exports.create = async(req, res) => {
    try {
        await Product.create(req.body);
        res.redirect("/products");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Form chỉnh sửa
exports.editForm = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render("products/edit", { product });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Cập nhật
exports.update = async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/products");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Xóa
exports.delete = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    } catch (err) {
        res.status(500).send(err.message);
    }
};