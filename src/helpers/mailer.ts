import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId} : any) => {
    try {
        //creating a hashed token by using bcryptjs
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            const user = await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            const user = await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = await nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER_MAILTRAP?.toString(),
                pass: process.env.PASS_MAILTRAP?.toString()
            }
        });

        const mailOptions = {
            from: "avichalgoyal2105@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste this url below in your browser:
            <br />
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error : any) {
        throw new Error(error.message);
    }

}