import React from 'react'

const AllFilesSideBar = ({ fileType, setFileType }) => {
  return (
    <div className='hidden lg:block h-[70vh] w-1/5'>
      <div className='w-full px-3 py-2'>
        <ul>
          <li
            onClick={() => setFileType("pdf")}
            id={fileType === "pdf" ? "selectedFolder" : ""}
            className='px-3 py-1 cursor-pointer w-full uppercase my-1 hover:bg-red-600 hover:text-white font-semibold rounded-md'
          >
            pdf
          </li>
          <li
            onClick={() => setFileType("docx")}
            id={fileType === "docx" ? "selectedFolder" : ""}
            className='px-3 py-1 cursor-pointer w-full uppercase my-1 hover:bg-red-600 hover:text-white font-semibold rounded-md'
          >
            word document
          </li>
          <li
            onClick={() => setFileType("ppt")}
            id={fileType === "ppt" ? "selectedFolder" : ""}
            className='px-3 py-1 cursor-pointer w-full uppercase my-1 hover:bg-red-600 hover:text-white font-semibold rounded-md'
          >
            powerpoint
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AllFilesSideBar
