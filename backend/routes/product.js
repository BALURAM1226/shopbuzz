const express = require('express');
require('dotenv').config();
const route = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const axios = require('axios');

// Get Categorized Products (Dynamic Filtering)
route.get('/products', async (req, res) => {
  try {
    const { category, type, subCategory, q } = req.query;
    let query = {};

    if (category) query.category = category.toLowerCase();
    if (type) query.productType = type.toLowerCase();
    if (subCategory) query.subCategory = subCategory;
    if (q) {
      query.$or = [
        { productName: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Legacy support for common types
route.get('/popular-products', async (req, res) => {
  try {
    const { type } = req.query;
    let products;

    if (type) {
      products = await Product.find({ productType: type.toLowerCase() }).sort({ createdAt: -1 });
    } else {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(30);
    }
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register Products
route.post('/register-products', async (req, res) => {
  try {
    const productData = req.body;

    if (!Array.isArray(productData)) {
      const duplicateExists = await Product.findOne({ productImage: productData.productImage });
      if (duplicateExists) {
        return res.status(400).json({
          error: "Product with this image already exists. Please use a unique image URL."
        });
      }
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return res.status(201).json({
        message: "Product created successfully",
        product: savedProduct
      });
    } else {
      // Bulk insert
      const result = await Product.insertMany(productData);
      return res.status(201).json({
        message: `Successfully inserted ${result.length} items!`,
        count: result.length
      });
    }
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get Cart Items
route.post('/getCartItems', async (req, res) => {
  try {
    const ids = req.body.body;
    if (!ids || !Array.isArray(ids)) return res.send([]);

    const allItems = await Product.find({ _id: { $in: ids } });
    res.send(allItems);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Product Details
route.get('/productDetails/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ error: "Product not found" });
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Virtual Try-On API (Real AI Engine v2 - Supporting Lower Body)
route.post('/virtual-try-on', upload.single('human_image'), async (req, res) => {
  try {
    const { garment_url, garment_description, category = "upper_body" } = req.body;
    const humanImageBuffer = req.file?.buffer;

    if (!humanImageBuffer || !garment_url) {
      return res.status(400).json({ error: "Missing required images" });
    }

    let client;
    try {
      const gradio = await import("@gradio/client");
      client = await gradio.client("levihsu/OOTDiffusion");
    } catch (err) {
      console.error("Gradio Client Handshake Failed:", err);
      throw new Error("Neural Hub Connection Refused");
    }
    const humanBlob = new Blob([humanImageBuffer]);

    const response = await axios.get(garment_url, { responseType: 'arraybuffer' });
    const garmentBlob = new Blob([response.data]);

    // Map internal categories to OOTDiffusion expected format
    let ootCategory = "Upper-body";
    if (category.toLowerCase().includes("bottom") || category.toLowerCase().includes("lower")) {
      ootCategory = "Lower-body";
    } else if (category.toLowerCase().includes("dress")) {
      ootCategory = "Dress";
    }

    const result = await client.predict("/predict", [
      gradio.handle_file(humanBlob),
      gradio.handle_file(garmentBlob),
      ootCategory,
      1,    // n_samples
      20,   // n_steps
      2,    // image_scale
      -1,   // seed
    ]);

    // OOTDiffusion returns a Gallery: list of {image: {url, path}, caption}
    if (result.data && result.data[0] && result.data[0][0]) {
      res.json({ result_image: result.data[0][0].image.url });
    } else {
      throw new Error("AI failed to generate immersive result");
    }

  } catch (err) {
    console.error("Neural Fitting Error:", err);
    res.status(500).json({ error: "Anatomical Mapping failed.", details: err.message });
  }
});

// Search
route.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.send([]);
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    }).limit(15);
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
})

// Update Product
route.put('/update-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
route.delete('/delete-product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = route;