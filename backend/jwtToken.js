import jwt from "jsonwebtoken"
import {sendError} from "./sendError.js";

export const sendToken = async (res, user, set, message) => {
    try{
        let token = null
        if(set){
            token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        }
        return res.status(200).cookie("token", set?token:null, {
            httpOnly: true,
            maxAge: set?24*60*60*1000:0
        }).json({
            success: true,
            message,
            user
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}