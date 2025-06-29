import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {type: String, required: true, ref: "user"},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    offerPrice: {type: Number, required: true},
    category: {type: String, required: true},
    image: {type: Array, required: true},
    date: {type: Number, required: true}
}, {minimize: false})

const Product = mongoose.models.Product|| mongoose.model('Product', productSchema)
export default Product
