const mongoose = require("mongoose");
const { Schema } = mongoose;

const GetQuoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  type : {
    type: Number,
    require: true,
  },
  email: {
    type: String,
  },
  Brand: {
    type: String,
    require: true,
  },
  Model: {
    type: String,
    require: true,
  },
  service: {
    type: String,
    require: true,
  },
  service_category: {
    type: String,
    require: true,
  },
  message:{
    type: String,
    require: true
},
  stauts: {
    type: String,
    default: recived,
    enum: {
      values: ["Recived", "Accepted", "Connected", "Working"],
      message: "{VALUE} is Not Supported",
    },
  },
});

module.exports = mongoose.model("getQuote", GetQuoteSchema);
