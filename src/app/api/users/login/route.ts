import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "No user found"}, {status: 400});
        }

        //verifying password
        const validatePassword = await bcryptjs.compare(password, user.password);
        if(!validatePassword) {
            return NextResponse.json({error: "Something went wrong"}, {status: 400});
        }

        //creating token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        });
        response.cookies.set("token", token,{
            httpOnly: true,
        })

        return response;
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}