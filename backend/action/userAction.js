import {sendError} from "../sendError.js";
import {User} from "../model/userModel.js";
import {compare, genSalt, hash} from "bcrypt";
import {sendToken} from "../jwtToken.js";
import {sendEmail} from "../email.js";
import fs from "fs"

export const register = async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return sendError(res, 404, "All fields are required")
        }
        let user = await User.findOne({ email: email })
        if(user){
            return sendError(res, 400, "User already exists")
        }
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)
        user = await User.create({
            name, email, password: hashPassword
        })
        return await sendToken(res, user, true, "register successfully")
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return sendError(res, 404, "Invalid email or password")
        }
        const isMatched = await compare(password, user.password)
        if(!isMatched){
            return sendError(res, 404, "Invalid email or password")
        }
        return await sendToken(res, user, true, "login successfully")
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const getOtp = async (req, res) => {
    try{
        const { email } = req.body
        if(!email){
            return sendError(res, 404, "All fields are required")
        }
        const otp = Math.floor(1000 + Math.random() * 9000)
        await sendEmail(res, {
            email: email,
            subject: "verify your email id",
            message: `You otp code is : ${otp}`
        })
        return res.status(200).json({
            success: true,
            message: "otp send to your email id",
            otp
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const getMyData = async (req, res) => {
    try{
        const user = req.user
        return res.status(200).json({
            success: true,
            user
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const logout = (req, res) => {
    try{
        sendToken(res, null, false, "logout sucessfully")
    }catch(error){
        return sendError(res, 500, error.message)
    }
}

export const changePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body
        if(!oldPassword || !newPassword){
            return sendError(res, 404, "All fields are required")
        }
        const userData = req.user
        const user = await User.findById(userData._id)
        const matchOldPassword = await compare(oldPassword, user.password)
        if(!matchOldPassword){
            return sendError(res, 404, "Invalid old password")
        }
        const salt = await genSalt(10)
        const hashNewPassword = await hash(newPassword, salt)
        user.password = hashNewPassword
        await user.save()
        return res.status(200).json({
            success: true,
            message: "password successfully changed",
            user
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body
        if(!email){
            return sendError(res, 404, "All fields are required")
        }
        const user = await User.findOne({ email })
        if(!user){
            return sendError(res, 404, "User not exists")
        }
        const options = {
            email,
            subject: "Reset your password",
            message: `Your reset password link is : ${process.env.RESET_PASSWORD_URL}/${user._id}`
        }
        await sendEmail(res, options)
        return res.status(200).json({
            success: true,
            message: "reset password link is send to your email id"
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}

export const resetPassword = async (req, res) => {
    try{
        const { id } = req.params
        const { password } = req.body
        if(!id || !password){
            return sendError(res, 404, "All fields are required")
        }
        const user = await User.findById(id)
        const salt = await genSalt(10)
        const hashPass = await hash(password, salt)
        user.password = hashPass
        await user.save()
        return res.status(200).json({
            success: true,
            message: "password is changed"
        })
    }catch (error){
        return sendError(res, 500, error.message)
    }
}