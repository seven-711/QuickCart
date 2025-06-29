import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true, ref: "user"},
    address: {type: Object, required: true},
    cartItems: [{
        product: {type: String, required: true, ref: "product"},
        quantity: {type: Number, required: true}
    }],
    totalAmount: {type: Number, required: true},
    status: {type: String, required: true},
    date: {type: Number, required: true}
})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order
