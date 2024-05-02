import { User } from "../model/userModel.js"
import { sendError } from "../sendError.js"
import { __dirname } from "../server.js"
import path from 'path';
import fs from "fs"

export const uploadFile = async (req, res) => {
    try {
        let userData = req.user;
        const { fileSize } = req.body
        const user = await User.findById(userData._id);
        if (!user.myFiles.some(file => file.fileName === userData.fileName)) {
            const fileType = userData.fileName.split('.')[1]
            user.myFiles.unshift({
                fileType: fileType,
                fileName: userData?.fileName,
                fileSize: fileSize,
                upload_date: new Date(Date.now())
            });
            await user.save();
        }
        return res.status(200).json({
            success: true,
            message: "File successfully uploaded",
            user
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const searchFile = async (req, res) => {
    try {
        const { fileName } = req.params;
        const user = await User.findById(req?.user?._id)
        if(fileName.length >= 3){
            const matchedFiles = await User.find({
                _id: user?._id,
                "myFiles.fileName": { $regex: fileName, $options: "i" }
            }, { "myFiles.$": 1 });
            if(matchedFiles.length === 0){
                return res.status(200).json({
                    files: [
                        {
                            myFiles: user?.myFiles
                        }
                    ]
                })
            }else{
                return res.status(200).json({
                    files: matchedFiles
                })
            }
        }else{
            return res.status(200).json({
                files: [
                    {
                        myFiles: user?.myFiles
                    }
                ]
            })
        }
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}


export const downloadFile = async (req, res) => {
    try {
        const user = req.user;
        const { fileName } = req.params;
        const filePath = path.join(__dirname, `/${user?._id}/${fileName}`);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({
                    success: false,
                    message: "File not found",
                    filePath
                });
            }
        })
        return res.download(filePath)
    } catch (error) {
        return sendError(res, 500, error.message);
    }
}

export const deleteFile = async (req, res) => {
    try {
        const user = req.user;
        const { fileName, id } = req.params;
        const filePath = path.join(__dirname, `backend/${user?._id}/${fileName}`);
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }
        await fs.promises.unlink(filePath);
        const updatedUser = await User.findByIdAndUpdate(user?._id, {
            $pull: { myFiles: { _id: id } }
        }, { new: true });
        return res.status(200).json({ success: true, user: updatedUser, message: "File deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}