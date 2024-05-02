import React, { useState } from 'react'
import { FormButton, FormHeading, FormInput } from "../../components"
import { resetPasswordFormValidation } from '../../formValidation'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../redux/action/authAction'

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const params = useParams()

    const [loading, setLoading] = useState(false)

    const { isAuthenticated } = useSelector(state => state.user)

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formErrors = resetPasswordFormValidation(newPassword, confirmPassword)
        if (formErrors) {
            setError(formErrors)
        } else {
            await dispatch(resetPassword(params.userId, confirmPassword))
        }
        setLoading(false)
    }
    return (
        isAuthenticated ? (
            <Navigate to={"/"} />
        ) : (
            <div className='w-full flex justify-center py-28 lg:pt-20'>
                <form onSubmit={handleSubmit} className='w-[90%] lg:w-1/2 bg-white lg:shadow-lg rounded-lg p-4 flex flex-col items-center'>
                    <FormHeading
                        title={"Forgot your password"}
                        desc={"Enter your email and check your inbox for instructions. Please also check your spam folder."}
                    />
                    <div className='my-2 w-full'>
                        <FormInput
                            id={"new_password"}
                            label={"new password"}
                            type={"text"}
                            placeholder={"Enter New Password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            isRequired={true}
                            error={error?.newPasswordError}
                            className='my-2'
                        />
                        <FormInput
                            id={"confirm_password"}
                            label={"confirm password"}
                            type={"password"}
                            placeholder={"Confirm Password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isRequired={true}
                            error={error?.confirmPasswordError}
                            className='my-2'
                        />
                    </div>
                    <FormButton
                        type={"submit"}
                        label={"reset password"}
                        disable={loading}
                        className={"w-full"}
                    />
                </form>
            </div>
        )
    )
}

export default ResetPasswordPage
