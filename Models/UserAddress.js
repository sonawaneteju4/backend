const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserAddress = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  address: [
    {
      addressType:{
        type : String,
        default  : "other"
      },
      line_1: {
        type:String,
        required: true,
      },
      line_2:{
        type: String
      },
      city:{
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pin_code: {
        type: Number,
        required: true,
      },
      phone : {
        type: Number,
        required: true,
      }
    },
  ],
})
module.exports = mongoose.model("userAddress", UserAddress);
