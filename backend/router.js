import express from "express"
import dotenv from "dotenv"
import {
    changePassword,
    forgotPassword,
    getMyData,
    getOtp,
    login,
    logout,
    register,
    resetPassword
} from "./action/userAction.js";
import {isAuthenticated} from "./middleware.js";
import multer from "multer"
import fs from "fs"
import { deleteFile, downloadFile, searchFile, uploadFile } from "./action/fileAction.js";

dotenv.config({
    path: "./backend/config.env"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user._id;
        const userDir = `backend/${userId}`;
        req.user = { ...req.user._doc, fileName: file.originalname }
        fs.mkdirSync(userDir, { recursive: true })
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export const router_1 = express.Router()
export const router_2 = express.Router()

router_1.route("/").get((req, res) => {
    return res.status(200).json({
        success: true,
        message: "🎉🎉🎉welcome🎉🎉🎉"
    })
})

router_2.route("/signup").post(register)
router_2.route("/login").post(login)
router_2.route("/logout").get(isAuthenticated, logout)
router_2.route("/get_otp").post(getOtp)
router_2.route("/me").get(isAuthenticated, getMyData)
router_2.route("/change_password").put(isAuthenticated, changePassword)
router_2.route("/forgot_password").post(forgotPassword)
router_2.route("/reset_password/:id").put(resetPassword)

router_2.route("/upload").post(isAuthenticated, upload.single("file"), uploadFile);
router_2.route("/file/download/:fileName").get(isAuthenticated, downloadFile)
router_2.route("/file/search/:fileName").get(isAuthenticated, searchFile)
router_2.route("/file/delete/:id/:fileName").delete(isAuthenticated, deleteFile)