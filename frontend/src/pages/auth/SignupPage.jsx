import React, { useState } from 'react'
import { FormButton, FormHeading, FormInput } from "../../components"
import { Link, Navigate } from 'react-router-dom'
import { signUpFormValidation } from '../../formValidation'
import { useDispatch, useSelector } from 'react-redux'
import { getOTP, signup } from '../../redux/action/authAction'
import toast from 'react-hot-toast'

const SignupPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const { otp: stateOtp, isAuthenticated } = useSelector(state => state.user)

    const [otp, setOtp] = useState(null)
    const [isOTPInState, setIsOTPInState] = useState(false)

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formErrors = signUpFormValidation(name, email, password)
        if (formErrors) {
            setError(formErrors)
        } else {
            setError(null)
            await dispatch(getOTP(email));
            setIsOTPInState(!isOTPInState)
        }
        setLoading(false)
    }

    const submitOtp = async () => {
        if (Number(otp) === Number(stateOtp)) {
            await dispatch(signup(name, email, password))
            setName("")
            setEmail("")
            setPassword("")
        } else {
            toast.error("Wrong OTP")
        }
    }

    return (
        isAuthenticated ? (
            <Navigate to={"/"} />
        )
            : (
                <div className='w-full flex justify-center py-28 lg:pt-20'>
                    <form onSubmit={handleSubmit} className='w-[90%] lg:w-1/2 bg-white lg:shadow-lg rounded-lg p-4 flex flex-col items-center'>
                        <FormHeading
                            title={"Create new account"}
                            desc={"Thank you for choosing our file uploader service! Creating your account is quick and easy. Follow these simple steps to get started"}
                        />
                        <div className='my-2 w-full'>
                            <FormInput
                                id={"userName"}
                                label={"Name"}
                                type={"text"}
                                placeholder={"Enter your name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isRequired={true}
                                error={error?.nameError}
                            />
                            <FormInput
                                id={"signup_email"}
                                label={"Email Id"}
                                type={"email"}
                                placeholder={"Enter your email id"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired={true}
                                error={error?.emailError}
                                className='mt-2'
                            />
                            <FormInput
                                id={"signup_password"}
                                label={"password"}
                                type={"password"}
                                placeholder={"Create password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isRequired={true}
                                error={error?.passwordError}
                                className='mt-2'
                            />
                        </div>
                        <FormButton
                            type={"submit"}
                            label={"signup"}
                            disable={loading}
                            className={"w-full"}
                        />
                        {
                            isOTPInState && (
                                <div className='flex flex-col lg:flex-row items-center w-full'>
                                    <FormInput
                                        id={"otp_input"}
                                        type={"number"}
                                        placeholder={"Enter OTP Here"}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className='w-full'
                                    />
                                    <button
                                        type='button'
                                        onClick={submitOtp}
                                        className='px-3 py-1 flex items-center justify-center bg-red-600 lg:rounded-r-sm text-white uppercase font-semibold border lg:border-red-600 w-full lg:w-1/2'
                                    >
                                        Submit
                                    </button>
                                </div>
                            )
                        }
                        <Link to={"/auth/login"} className='my-3 capitalize font-semibold text-sm'>
                            Already have and account? <span className='text-red-600 uppercase'>login</span>
                        </Link>
                    </form>
                </div>
            )
    )
}

export default SignupPage