import dbConnect from "../../../../config/db";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request);
        console.log('Auth userId:', userId);

        if (!userId) {
            console.error('No userId found in auth');
            return NextResponse.json({success: false, message: "User not authenticated"}, {status: 401});
        }

        await dbConnect();
        console.log('Searching for user with ID:', userId);
        
        const user = await User.findById(userId);
        console.log('Found user:', user ? 'Yes' : 'No');

        if (!user) {
            // Log all users for debugging (remove in production)
            const allUsers = await User.find({});
            console.log('All users in database:', allUsers.map(u => ({id: u._id.toString(), email: u.email})));
            
            return NextResponse.json(
                {success: false, message: `User with ID ${userId} not found`},
                {status: 404}
            );
        }

        return NextResponse.json({success: true, user});
    } catch (error) {
        console.error('Error in /api/user/data:', error);
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
}