const express = require("express");
const router = express.Router();
const ContactUs = require("../Models/ContactUs");



//get Contactus
router.get("/fetchcontactus", async (req, res)=>{
  try{
    const contactUs = await ContactUs.find().sort({ $natural: -1 });
    res.json(contactUs);
    console.log(contactUs)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error Occured");
  }
})

//Post ContactUs
router.post(
    "/postcontactus", 
    async (req, res) => {
        try { 
            const {name, mobile, message} = req.body;
        const contactUs = new ContactUs({
            name,
            mobile,
            message
          });
    
          const savedContactUs = await contactUs.save();
          res.json(savedContactUs);
          console.log(savedContactUs)
        } catch (error) {
          console.error(error.message);
          console.log(error)
         
    }
  }
    )


module.exports = router;