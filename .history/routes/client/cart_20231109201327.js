const express = require("express");
const router = express.Router();
const Cart = require("../../Models/Cart");
var featchuser = require("../../middleware/client/fetchuser");
const fetchuser = require("../../middleware/client/fetchuser");


// GET CartDetails ?login Req.
router.get("/cartuser", featchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error.message);
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Add Item To Cart
router.post("/addtocart", featchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, price, brand, device } = req.body; // assuming the client sends productId, quantity, and price in the request body
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
    const newCart = new Cart({
        user: userId,
        items: [{ productId, quantity, price, brand, device }],
        total: price * quantity,
      });
      await newCart.save();
      res.json(newCart);
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex === -1) {
        cart.items.push({ productId, quantity, price, brand, device });
        cart.total += price * quantity;
      } else {
        const existingItem = cart.items[existingItemIndex];
        const oldQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.price = price;
        cart.total += price * (quantity - oldQuantity);
      }
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});


//remove from cart

router.delete("/removefromcart/:itemId", featchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      const item = cart.items.find((i) => i._id.toString() === itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found in cart" });
      } else {
        const itemTotal = item.quantity * item.price;
        cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
        cart.total -= itemTotal;
        await cart.save();
        res.json(cart);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updatecart/:itemId", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      const item = cart.items.find((i) => i._id.toString() === itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found in cart" });
      } else {
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        const itemTotal = item.price * quantity;
        cart.total += itemTotal - item.price * oldQuantity;
        await cart.save();
        res.json(cart);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deletecart", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      res.json({ message: "Cart deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
