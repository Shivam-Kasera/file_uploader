import React, { useState } from 'react'
import { FaDownload, FaTrashCan } from 'react-icons/fa6'
import { formatFileSize } from '../../utils'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BACKEND_URL } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { deleteFile } from '../../redux/action/fileAction'

const FileViewCard = ({
    id,
    fileName,
    fileType,
    fileSize,
    upload_date,
    isPublic
}) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const downloadFile = async () => {
        window.open(`${BACKEND_URL}/file/download/${fileName}`)
    };

    const handleDeleteFile = async () => {
        setLoading(true)
        await dispatch(deleteFile(fileName, id))
        setLoading(false)
    }

    return (
        <div className='flex items-center mb-4 py-2 px-4 w-full border border-red-600 rounded-lg'>
            <div className='w-full flex flex-col'>
                <h1
                    className='w-full uppercase text-2xl font-semibold my-1'
                >
                    {fileName}
                </h1>
                <div className='flex items-center space-x-5 text-xs text-gray-400'>
                    <span>#{id}</span>
                    <span>{fileType}</span>
                </div>
                <div className='w-full flex flex-col lg:flex-row lg:items-center justify-between'>
                    <div className='flex items-center justify-between lg:justify-normal space-x-4'>
                        <span className='uppercase text-gray-600'>
                            {formatFileSize(fileSize)}
                        </span>
                        <span className='uppercase text-gray-600'>
                            {upload_date?.split('T')[0]}
                        </span>
                        <span className='uppercase text-gray-600'>
                            {isPublic ? "public" : "private"}
                        </span>
                    </div>
                    <div className='hidden lg:flex items-center justify-between space-x-4'>
                        <button
                            title='download file'
                            className='flex items-center justify-center cursor-pointer text-black hover:text-red-600'
                            onClick={downloadFile}
                        >
                            <FaDownload />
                        </button>
                        <button
                            title='delete file'
                            className='flex items-center justify-center cursor-pointer text-black hover:text-red-600'
                            disabled={loading}
                            onClick={handleDeleteFile}
                        >
                            {
                                loading ?
                                    <AiOutlineLoading3Quarters /> :
                                    <FaTrashCan />
                            }
                        </button>
                    </div>
                    <button
                        className='lg:hidden w-full px-5 py-2 mt-3 bg-green-600 rounded-lg font-semibold text-white uppercase'
                        onClick={downloadFile}
                    >
                        download
                    </button>
                    <button
                        className='lg:hidden w-full px-5 py-2 mt-3 bg-red-600 rounded-lg font-semibold text-white uppercase'
                        onClick={downloadFile}
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FileViewCard
