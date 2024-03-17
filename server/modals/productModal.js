const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name :{ 
        type : String,
        required : true
    },
    slug:{
        type: String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    category : {
        type : mongoose.ObjectId,
        ref: 'Category'
    },
    quantity:{
        type: Number,
        required:true
    },
    photoAlt:{
        type : String,
        required : true
    },
    // photo:{
    //     type : Buffer,
    //     contentType: String
    // },
    shipping:{
        type: Boolean
    }

},  {timestamps : true});



module.exports = mongoose.model('Product', productSchema)