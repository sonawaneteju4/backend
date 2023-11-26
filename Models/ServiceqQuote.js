const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceQouteSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  vehicleType: {
    type: String,
    enum: {
      values: ["car", "bike", "other"],
      message: "{VALUE} is Not Supported",
    },
  },
  vehicleBrand: {
    type: String,
  },
  vehicleModal: {
    type: String,
  },
  serviceType: {
    type: String,
  },
  color: {
    type: String,
  },
  finishing: {
    type: String,
  },
});

module.exports = mongoose.model("serviceQoute", ServiceQouteSchema);
