const mongoose  = require("mongoose");
const { Schema } = mongoose;

const ServicesSchema = new Schema({
    title:{
        type: String,
        required: true
    }
    ,
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    service_list : {
       type:Array ,
       required :true
    },
    img: {
        type: String,
        required: true
    },
    keyFeatures:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('services', ServicesSchema)
