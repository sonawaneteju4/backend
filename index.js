const connectToMongo = require('./db.js');
const express = require('express')
const multer = require('multer')
const Gallery = require('./Models/Gallery')
require("dotenv").config();



connectToMongo ();
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



app.use("/api/contactus" , require('./routes/client/contactus.js')) 
app.use("/api/auth", require('./routes/client/auth.js'))
app.use("/api/authAdmin", require('./routes/admin/auth.js'))
app.use("/api/services", require('./routes/client/services.js'))
app.use("/api/gallery", require('./routes/client/gallery.js'))
app.use("/api/product", require('./routes/client/product.js'))
app.use("/api/cart", require('./routes/client/cart.js'))
app.use("/api/orders", require('./routes/client/Order.js'))
app.use("/api/userAddress", require('./routes/client/userAddress.js'))



app.post("/upload", (req, res)=>{
  upload(req, res,(err)=>{
    if(err){
      console.log(err)
    }
    const newImage = new Gallery({
      name : req.body.name,
      image :{
        data : req.file.filename,
        containtType : 'image/png/jpg'
      }

    })
    newImage.save()
    .then(()=>res.send("sucessfully Upload")).catch(err=>console.log(err))
  })
})


app.get('/', (req, res) =>{
  res.send("Welcome To Ar Coustom")
})


//storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename:(req, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({
  storage:Storage
}).single('testImage')

//available Route 
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))  

const start = async() =>{
  try {
    await connectToMongo(process.env.MONGODB_URL);
    app.listen(PORT, 
      
      // () => {
      //   console.log(`Example app listening on port http://localhost:${PORT}`)
      //   // app.listen(PORT, "192.168.0.101")
      //   //     app.listen(PORT, "192.168.0.101")
      // }
      )
  } catch (error) {
    
  }
}

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})