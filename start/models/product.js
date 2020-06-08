const mongoose = require('mongoose');
const productSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String
})
module.exports=mongoose.model('product', productSchema);
