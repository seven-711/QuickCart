
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../../config/db";
import { NextResponse } from "next/server";
import Product from "../../../../models/product";
import { inngest } from "../../../../config/inngest";
import User from "../../../../models/User";

export async function POST(request){
    try {
        const {userId} = getAuth(request)
        const {address, cartItems} = await request.json()
         
        if(!address || cartItems.length === 0){
            return NextResponse.json({success: false, message: "Invalid data"})
        }

        //calculate amount using items
        const amount = await cartItems.reduce(async(acc, item) => {
            const product = await Product.findById(item.product)
            return acc + product.offerPrice * item.quantity
        }, 0)

        await inngest.send({
            name: "order.created",
            data: {
                userId,
                address,
                cartItems,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        })

        // Clear user cart
        const user = await User.findById(userId) 
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success: true, message: "Order created successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error.message})
    }
}