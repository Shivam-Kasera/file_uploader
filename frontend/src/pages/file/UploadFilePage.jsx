import React, { Fragment, useState } from 'react'
import { FaDownload } from 'react-icons/fa6'
import { useDispatch } from "react-redux"
import { uploadFileToServer } from '../../redux/action/fileAction'

const UploadFilePage = () => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    
    const handleUploadFile = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileSize", file.size)
        await dispatch(uploadFileToServer(formData))
        setLoading(false)
    }

    return (
        <div className='w-full flex flex-col items-center lg:pt-5 pt-20'>
            <h1 className='uppercase text-red-600 text-5xl font-bold'>file upload</h1>
            <div
                className='w-[90%] lg:w-1/2 flex items-center justify-center'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    setFile(e.dataTransfer.files[0]);
                }}
            >
                <label htmlFor='fileInput' className='w-full h-80 cursor-pointer border border-red-400 rounded-lg flex flex-col items-center justify-center'>
                    {
                        !file ? (
                            <Fragment>
                                <FaDownload className='w-10 h-10 text-red-600' />
                                <p className='uppercase text-red-600'>Select or drag a file</p>
                                <p className='inline-block px-10 py-2 bg-red-500 text-white uppercase font-semibold rounded-lg my-3'>
                                    Select a file
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span>{file.name}</span>
                            </Fragment>
                        )
                    }
                </label>
                <input
                    type='file'
                    id='fileInput'
                    className='hidden'
                    accept='/*'
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
            <button
                className={`w-[90%] lg:w-1/2 flex items-center justify-center px-4 lg:py-1 py-3 text-white ${ loading ? "bg-red-400" : "bg-red-600" } rounded-lg my-3 lg:my-1 cursor-pointer uppercase`}
                onClick={handleUploadFile}
                disabled={loading}
            >
                {
                    loading ? "please wait..." : "upload"
                }
            </button>
        </div>
    )
}

export default UploadFilePage