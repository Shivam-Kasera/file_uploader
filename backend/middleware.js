import {sendError} from "./sendError.js";
import jwt from "jsonwebtoken";
import {User} from "./model/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token){
            return sendError(res, 400, "Please log in")
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id)
        if(!user){
            return sendError(res, 404, "Token expired")
        }
        req.user = user
        next()
    }catch (error){
        return sendError(res, 500, error.message)
    }
}