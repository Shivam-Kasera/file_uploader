import nodemailer from 'nodemailer';
import { google } from "googleapis"
import dotenv from "dotenv";
import { sendError } from "./sendError.js"

dotenv.config({
    path: "./backend/config.env"
})

const OAuthClient = new google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URL
})

OAuthClient.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
})

export const sendEmail = async (res, options) => {
    try{
        const access_token = await OAuthClient.getAccessToken()
        const transport = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                type: process.env.GMAIL_TYPE,
                user: process.env.SMTP_USER,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: access_token
            }
        })
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: options.email,
            subject: options.subject,
            text: options.message
        }
        await transport.sendMail(mailOptions)
    }catch (error){
        return sendError(res, 500, error.message)
    }
}