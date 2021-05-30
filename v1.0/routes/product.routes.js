const express = require("express");
const { extend } = require("lodash");
const { logger } = require("../../middlewares/logger.js");
const { Product } = require("../models/product.model.js");

const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(logger);

// Routes
router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products: products,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "Error while fetching products",
      });
    }
  })
  .post(async (req, res) => {
    try { 
      const NewProduct = new Product(req.body);
      const savedProduct = await NewProduct.save();
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: savedProduct,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "Error while creating product",
      });
    }
  });

router
  .route("/home")
  .get(async(req, res) => {
    
  })

router.param("id", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({
        success: false,
        message: "Product with the given id not found",
      });
    }
    req.product = product;
    next();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Error while fetching product",
    });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    const { product } = req;
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product: product,
    });
  })
  .post(async (req, res) => {
    const productUpdates = req.body;
    let { product } = req;
    product = extend(product, productUpdates);
    try {
      product = await product.save();
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: product,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Error while updating product",
      });
    }
  })
  .delete(async (req, res) => {
    const { product } = req;
    try {
      // await product.remove();
      product = await Product.findByIdAndRemove(product.id);
      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
        product: product,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Error while updating product",
      });
    }
  });

module.exports = router;