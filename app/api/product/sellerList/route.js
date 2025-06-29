import authSeller from "../../../../lib/authSeller";
import Product from "../../../../models/product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "../../../../config/db";

export async function GET(request) {
    try {
        
        const { userId } = getAuth(request)

        const isSeller = authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success: false, message: "Unauthorized"})
        } 
        await dbConnect()
        const products = await Product.find({userId})
        return NextResponse.json({ success: true, products})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}