const express = require("express");
const router = express.Router();
const Services = require("../Models/Services");

router.get("/getservices", async (req, res) => {
  const { _id, select, sort} = req.query;
  const queryObject = {};
  if (_id) {
    queryObject._id = _id;
  }
   
  let apiData = Services.find(queryObject);

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
    const services = await apiData;
    res.json(services);
  } catch (error) {
    console.log(error);
  }
});

//Service Post
router.post("/postservice", async (req, res) => {
  try {
    const { keyFeatures, img, service_list, description, title, category } = req.body;
    const service = new Services({ keyFeatures, img, service_list,category, description, title });
    const savedService = await service.save();
    res.json(savedService)
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
  }
});

module.exports = router;
