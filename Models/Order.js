const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        device: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      addType: {
        type: String,
        enum: ["default", "home", "other"],
        default: "default",
      },
    },
    shippingCharges: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
    },
    paymentMethod: { type : String , default : "Cash On Delivery"},
    payment:{

    
      paymentId: {
       type : String,
       unique: true,

    },
    paymentGateway:{
      type: String,
    },paymentMethod: {
      type : String
    }
      
  },
    status: {
      type: String,
      enum: ["pending","Order Recived", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
