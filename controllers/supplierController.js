const Supplier = require("../models/Supplier");

exports.index = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("suppliers/index", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.newForm = (req, res) => {
  res.render("suppliers/new");
};

exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.editForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
