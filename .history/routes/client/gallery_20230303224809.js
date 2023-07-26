const express = require("express");
const router = express.Router();
const Gallery = require("../Models/Gallery");
const { query } = require("express");

// Get Images//
router.get("/getimages", async (req, res) => {
  const { _id, name, category, sort, select} = req.query;
  const queryObject = {};
  if (_id) {
    queryObject._id = _id;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (category) {
    queryObject._category = category;
  }
  let apiData = Gallery.find(queryObject);

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
    const gallery = await apiData;
    if (gallery.length === 1) {
      res.json(gallery[0]);
    } else {
      res.json(gallery);
    }
  } catch (error) {
    console.log(error);
  }
});

//Upload Image Gallery
router.post("/postgallery", async (req, res) => {
  try {
    const { name, link, category } = req.body;

    const gallery = new Gallery({
      name,
      link,
      category,
    });

    const savedGallery = await gallery.save();
    res.json(savedGallery);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
    });
  }
});

module.exports = router;
