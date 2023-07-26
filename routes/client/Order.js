const express = require("express");
const router = express.Router();
const Cart = require("../../Models/Cart");
const Order = require("../../Models/Order");
var featchuser = require("../../middleware/client/fetchuser");
const { Request, Response } = require("express");
const { Resend } = require("resend");
const resend = new Resend("re_CxePWGSD_MPtnpwTs8vfedhkAurVd5mFC");

router.post("/placeorder", featchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { cartId, userAddress } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    let total = cart.total;
    let shippingCharges = 0;

    if (total >= 0) {
      // Apply shipping charges of 50 Rs
      shippingCharges = 0;
      total += shippingCharges;
    }

    const orderStatus = "pending";

    // Create the new order
    const order = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        brand: item.brand,
        device: item.device,
        quantity: item.quantity,
        price: item.price,
      })),
      address: userAddress,
      shippingCharges: shippingCharges,
      total: total,
      status: orderStatus,
    });

    await order.save();
    console.log(userEmail);
    // try {
    //   await resend.emails.send({
    //     from: "Acme <onboarding@resend.dev>",
    //     to: "sonawaneteju4@gmail.com",
    //     name : "Tejas",
    //     subject: "hello world",
    //     message: "<strong>it works!</strong>",
    //   });
    //   res
    //   .status(200)
    //   .json({ message: "Order placed successfully and email sent." });
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }

    res.json(order);
    await Cart.findByIdAndDelete(cartId);

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/order/:orderId", featchuser, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
      return res.status(400).json({ error: "Order Not Found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/orderhistory", featchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let orders = await Order.find({ user: userId });
    

    // If a single order is returned, convert it to an array
    if (!Array.isArray(orders)) {
      orders = [orders];
    }

    res.json(orders);
    console.log(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
