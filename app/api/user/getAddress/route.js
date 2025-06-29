import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../../config/db";
import { NextResponse } from "next/server";
import Address from "../../../../models/address";

export async function GET(request){
    try {
        
        const {userId} = getAuth(request)

        await dbConnect()
        
        const addresses = await Address.find({userId})

        return NextResponse.json({success: true, addresses})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}