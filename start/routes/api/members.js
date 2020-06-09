const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");
const Product = require("../../models/product");
const mongoose = require("mongoose");

// Gets All Members
router.get("/", (req, res) => {
  Product.find({})
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => console.log(err));
});

// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("from database", doc);
      res.status(200).json(doc);
    })
    .catch(err => console.log(err));
});

// Create Member
router.post("/", (req, res) => {
  const product = new Product({
    title: req.body.title,
    content: req.body.content
  });

  if (!product.title || !product.content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "handling post requests",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update Member
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }

  Product.findOneAndUpdate(
    { _id: id },
    { $set: { title, content } },
    { new: true }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  const id = req.params.id;
  Product.findOneAndRemove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
