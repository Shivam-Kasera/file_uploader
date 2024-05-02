import React, { useState } from 'react'
import { FormButton, FormHeading, FormInput } from "../../components"
import { forgotPasswordFormValidation } from '../../formValidation'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { forgotPassword } from '../../redux/action/authAction'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.user)

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formErrors = forgotPasswordFormValidation(email)
        if (formErrors) {
            setError(formErrors)
        } else {
            await dispatch(forgotPassword(email))
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
                            id={"forgot_email"}
                            label={"Email Id"}
                            type={"email"}
                            placeholder={"Enter your email id"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired={true}
                            error={error?.emailError}
                            className='my-2'
                        />
                    </div>
                    <FormButton
                        type={"submit"}
                        label={"get reset link"}
                        disable={loading}
                        className={"w-full"}
                    />
                </form>
            </div>
        )
    )
}

export default ForgotPasswordPage
