import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../../config/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        
        const {userId} = getAuth(request)
        const {cartData} = await request.json()

        await dbConnect()
        const user = await User.findById(userId)

        user.cartItems = cartData
        await user.save()

        return NextResponse.json({success: true, message: "Cart updated successfully"})
    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }    
}
