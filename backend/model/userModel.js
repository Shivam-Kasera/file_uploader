import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    myFiles: [
        {
            fileType: String,
            fileName: String,
            fileSize: Number,
            upload_date: Date,
            public: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true })

export const User = mongoose.model("users", userSchema)