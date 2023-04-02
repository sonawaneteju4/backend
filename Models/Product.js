const mongoose = require("mongoose");
const { Schema } = mongoose;

// const url1 = new Schema({
//   uri1: {
//     type: String,
//   },
// });
// const url2 = new Schema({
//   uri2: {
//     type: String,
//   },
// });
// const url3 = new Schema({
//   uri3: {
//     type: String,
//   },
// });
// const mat = new Schema({
//   type: String,
// });
// const glose = new Schema({
//   type: String,
// });
// const ppf = new Schema({
//   type: String,
// });

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: Array,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    // mat : [mat],
    // glose : [glose],
    // ppf : [ppf]
    type: String,
    required: true,
    enum: {
      values: ["mat", "gloss", "ppf"],
      message: "{VALUE} is Not Supported",
    },
  },
  color: {
    type: String,
  },
  shiping: {
    type: Boolean,
    default: true,
  },
  featureProduct: {
    type: Boolean,
    default: false,
  },
  stock : {
    type : Number,
    default : 5
  },
  rating :{
      type : Number,
      min : 1,
      max : 5,
      default: 4.5
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", ProductSchema);
