import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChangePasswordModal } from '../../components'

const MyProfilePage = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const changePasswordButtonRef = useRef(null)

    const { user } = useSelector(state => state.user)

    return (
        <div
            className='w-full div-height flex flex-col lg:flex-row pt-10 lg:pt-0'
        >
            <div className='w-full flex flex-col items-center justify-center space-y-3'>
                <div className='w-40 h-40 lg:w-80 lg:h-80 rounded-full bg-red-600 uppercase text-white flex items-center justify-center text-[5rem]'>
                    <span>
                        {user?.name?.slice(0, 2)}
                    </span>
                </div>
                <button
                    ref={changePasswordButtonRef}
                    onClick={() => setModalOpen(!modalOpen)}
                    className='flex items-center justify-center bg-red-600 text-white uppercase rounded-lg px-5 py-3 cursor-pointer'
                >
                    change password
                </button>
            </div>
            <div className='w-full flex flex-col justify-around'>
                <div className="flex flex-col items-center lg:items-start mt-12 lg:mt-0">
                    <h1 className='uppercase text-2xl font-semibold text-red-500'>{user?.name}</h1>
                    <p className='uppercase text-xs text-red-400'>{user?._id}</p>
                </div>
                <div className="flex flex-col items-center lg:items-start mt-12 lg:mt-0">
                    <h1 className='uppercase text-2xl font-semibold text-red-500'>email</h1>
                    <p className='uppercase text-xs text-red-400'>{user?.email}</p>
                </div>
                <div className="flex flex-col items-center lg:items-start mt-12 lg:mt-0">
                    <h1 className='uppercase text-2xl font-semibold text-red-500'>password (encrypted)</h1>
                    <p className='uppercase text-xs text-red-400'>{user?.password}</p>
                </div>
                <div className="flex flex-col items-center lg:items-start mt-12 lg:mt-0">
                    <h1 className='uppercase text-2xl font-semibold text-red-500'>created at</h1>
                    <p className='uppercase text-xs text-red-400'>{user?.createdAt?.split("T")[0]}</p>
                </div>
                <div className="flex flex-col items-center lg:items-start mt-12 lg:mt-0">
                    <h1 className='uppercase text-2xl font-semibold text-red-500'>updated at</h1>
                    <p className='uppercase text-xs text-red-400'>{user?.updatedAt?.split("T")[0]}</p>
                </div>
            </div>
            <ChangePasswordModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                changePasswordButtonRef={changePasswordButtonRef}
            />
        </div>
    )
}

export default MyProfilePage
