const mongoose = require("mongoose")
const {Schema} = mongoose
const ContactUsSchema = new Schema({
    name : {
        type:String,
        required  : true
    },
    mobile : {
        type: String,
        required : true
    },
    message:{
        type:String,
        required:true
    },
     Date :{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contactUs', ContactUsSchema)

