import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        //checking whether the user already exists
        const user = await User.findOne({email})
        if(user) NextResponse.json({error: "User already exists"}, {status: 400});

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //creatin a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        //verifying the user email id
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    }
    catch (error : any) {
        return NextResponse.json({"error" : error.message}, {status: 500})
    }
}