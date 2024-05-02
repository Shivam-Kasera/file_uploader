import React, { useEffect, useRef, useState } from 'react'
import { FormButton, FormHeading, FormInput } from "../../components"
import { changePasswordFormValidation } from '../../formValidation'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../redux/action/authAction'

const ChangePasswordModal = ({ modalOpen, setModalOpen, changePasswordButtonRef }) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const formRef = useRef(null)

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault()
        const formValidate = changePasswordFormValidation(oldPassword, newPassword)
        if(formValidate){
            setError(formValidate)
        }else{
            setError(null)
            setOldPassword("")
            setNewPassword("")
            dispatch(changePassword(oldPassword, newPassword))
        }
        setLoading(false)
    }

    useEffect(() => {
        const handleModalOutSideClick = (event) => {
            if (
                (changePasswordButtonRef.current &&
                    formRef.current) &&
                (!changePasswordButtonRef.current.contains(event.target) &&
                    !formRef.current.contains(event.target))
            ) {
                setModalOpen(false)
            }
        }
        document.addEventListener("click", handleModalOutSideClick)
        return () => {
            document.removeEventListener("click", handleModalOutSideClick)
        }
    }, [modalOpen, setModalOpen, changePasswordButtonRef, formRef])

    return (
        <div className={`${!modalOpen ? "hidden" : "flex"} absolute w-full h-full items-center justify-center bg-gray-400 bg-opacity-30`}>
            <form onSubmit={handleSubmit} ref={formRef} className='bg-white p-10 rounded-lg w-[90%] lg:w-1/2'>
                <FormHeading
                    title={"Change Password"}
                    desc={"Use your old password to set a new password."}
                />
                <div className='my-3'>
                    <FormInput
                        id={"old_password"}
                        label={"old password"}
                        type={"text"}
                        placeholder={"Enter Old Password"}
                        isRequired={true}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        error={error?.oldPasswordError}
                    />
                    <FormInput
                        id={"new_password"}
                        label={"new password"}
                        type={"text"}
                        placeholder={"Enter New Password"}
                        isRequired={true}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={error?.newPasswordError}
                        className='mt-2'
                    />
                </div>
                <FormButton
                    type={"submit"}
                    label={"Change Password"}
                    disable={loading}
                />
            </form>
        </div>
    )
}

export default ChangePasswordModal
