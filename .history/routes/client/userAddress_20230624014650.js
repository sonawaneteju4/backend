const express = require("express");
const router = express.Router();
const UserAddress = require("../../Models/UserAddress");
const fetchuser = require("../middleware/fetchuser");

//Fetch Address

router.get("/getUserAddress", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userAddress = await UserAddress.findOne({ user: userId });
    if (!userAddress) {
      res.status(404).json({ error: "Cart not found" }); // return a 404 error if the cart is not found
    } else {
      res.json(userAddress); // return the cart as JSON
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//   Incomplet 
router.post('/postUserAddress', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone, pin_code, state, line_2, line_1, city, addressType } = req.body;

    // Check if the user already has an address
    let userAddress = await UserAddress.findOne({ user: userId });

    if (!userAddress) {
      // Create a new user address if the user doesn't have one yet
      const newUserAddress = new UserAddress({
        user: userId,
        address: [{ phone, pin_code, state, line_2, line_1, city, addressType }],
      });

      await newUserAddress.save();
      userAddress = newUserAddress;
    } else {
      // Add the new address to the user's existing address
      userAddress.address.push({ phone, pin_code, state, line_2, line_1, city, addressType });
      await userAddress.save();
    }

    // Return the new user address
    res.json(userAddress);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







module.exports = router;
