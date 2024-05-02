import React, { Fragment, useState } from 'react'
import { AllFilesSideBar, FileViewCard, FormInput } from "../../components"
import { useDispatch, useSelector } from 'react-redux'
import { searchFile } from '../../redux/action/fileAction'

const AllFilesPage = () => {
  const [fileType, setFileType] = useState("pdf")

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  return (
    <div className='w-full flex flex-col items-center lg:items-start lg:flex-row p-4 lg:p-0'>
      <AllFilesSideBar
        fileType={fileType}
        setFileType={setFileType}
      />
      <div className='lg:hidden w-full px-2'>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className='lg:hidden w-full px-3 py-1 rounded-lg outline-none bg-white text-red-600 border border-red-600'
        >
          <option value={"pdf"}>pdf</option>
          <option value={"docx"}>word file</option>
          <option value={"ppt"}>powerpoint</option>
        </select>
      </div>
      <div className='w-full py-3 px-2 h-[81vh]'>
        <div>
          <div className='flex w-full relative items-center mb-2'>
            <FormInput
              type={"text"}
              placeholder={"Search"}
              className='w-full'
              inputClassName={"border-none rounded-lg shadow shadow-red-400"}
              onChange={(e) => dispatch(searchFile(e.target.value))}
            />
          </div>
        </div>
        {
          fileType === "pdf" && (
            <div className='h-full overflow-auto no-scrollbar'>
              {
                user && user.myFiles && user.myFiles.map((fileInfo) => (
                  fileInfo?.fileType === "pdf" && (
                    <FileViewCard
                      key={fileInfo?._id}
                      id={fileInfo?._id}
                      fileName={fileInfo?.fileName}
                      fileType={fileInfo.fileType}
                      fileSize={fileInfo?.fileSize}
                      upload_date={fileInfo?.upload_date}
                      isPublic={fileInfo?.public}
                    />
                  )
                ))
              }
            </div>
          )
        }
        {
          fileType === "docx" && (
            <Fragment>
              {
                user && user.myFiles && user.myFiles.map((fileInfo) => (
                  fileInfo?.fileType === "docx" && (
                    <FileViewCard
                      key={fileInfo?._id}
                      id={fileInfo?._id}
                      fileName={fileInfo?.fileName}
                      fileType={fileInfo.fileType}
                      fileSize={fileInfo?.fileSize}
                      upload_date={fileInfo?.upload_date}
                      isPublic={fileInfo?.public}
                    />
                  )
                ))
              }
            </Fragment>
          )
        }
        {
          fileType === "ppt" && (
            <Fragment>
              {
                user && user.myFiles && user.myFiles.map((fileInfo) => (
                  fileInfo?.fileType === "pptx" && (
                    <FileViewCard
                      key={fileInfo?._id}
                      id={fileInfo?._id}
                      fileName={fileInfo?.fileName}
                      fileType={fileInfo.fileType}
                      fileSize={fileInfo?.fileSize}
                      upload_date={fileInfo?.upload_date}
                      isPublic={fileInfo?.public}
                    />
                  )
                ))
              }
            </Fragment>
          )
        }
      </div>
    </div>
  )
}

export default AllFilesPage