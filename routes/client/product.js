const express = require("express");
const router = express.Router();
const Product = require("../../Models/Product");
const { body, validationResult } = require("express-validator");
const { query } = require("express");

//Fetch Product
router.get("/fetchproduct", async (req, res) => {
  const {
    name,
    description,
    featureProduct,
    select,
    category,
    price,
    type,
    color,
    _id,
    sort,
  } = req.query;
  const queryObject = {};
  if (_id) {
    queryObject._id = _id;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (description) {
    queryObject.description = { $regex: description, $options: "i" };
  }
  if (featureProduct) {
    queryObject.featureProduct = featureProduct;
  }
  if (type) {
    queryObject.type = type;
  }
  if (price) {
    queryObject.price = price;
  }
  if (category) {
    queryObject.category = category;
  }
  if (color) {
    queryObject.color = color;
  }
  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);
  try {
    const product = await apiData;
    if (product.length === 1) {
      res.json(product[0]);
    } else {
      res.json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("some Error Occured");
  }
});

//Post Product Detail
router.post(
  "/postproduct",
  [
    body("name", "Enter Product Name").isLength({ min: 5 }),
    body("description", "Enter Product description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    // const link = new Linkparamter({uri1,uri2,uri3})
    try {
      const {
        name,
        price,
        description,
        image,
        featureProduct,
        category,
        link,
        type,
        review,
        stock,
        color,
        Date,
      } = req.body;
      //If Error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = new Product({
        name,
        price,
        description,
        image,
        review,
        stock,
        featureProduct,
        category,
        link,
        type,
        color,
        Date,
      });

      const savedProduct = await product.save();
      res.json(savedProduct);
      console.log(savedProduct);
      // res.status(200).send("Product Post Successfully")
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
      });
      return;
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
