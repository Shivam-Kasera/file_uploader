import React, { useState } from 'react'
import { FormButton, FormHeading, FormInput } from "../../components"
import { Link, Navigate } from 'react-router-dom'
import { loginFormValidation } from '../../formValidation'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/action/authAction'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const formErrors = loginFormValidation(email, password)
        if (formErrors) {
            setError(formErrors)
        } else {
            setError(null)
            await dispatch(login(email, password))
        }
        setLoading(false)
    }
    return (
        isAuthenticated ? (
            <Navigate to={"/"} />
        ) : (
            <div className='w-full h-full flex justify-center py-28 lg:pt-20'>
                <form onSubmit={handleSubmit} className='w-[90%] lg:w-1/2 bg-white lg:shadow-lg rounded-lg p-4 flex flex-col items-center'>
                    <FormHeading
                        title={"Log in your account"}
                        desc={"Enter your email and password to access your iLovePDF account. You are one step closer to boosting your document productivity."}
                    />
                    <div className='my-2 w-full'>
                        <FormInput
                            id={"login_email"}
                            label={"Email Id"}
                            type={"email"}
                            placeholder={"Enter your email id"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isRequired={true}
                            error={error?.emailError}
                        />
                        <FormInput
                            id={"login_password"}
                            label={"password"}
                            type={"password"}
                            placeholder={"Enter your password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isRequired={true}
                            error={error?.passwordError}
                            className='mt-2'
                            redirectLink={"/password/forgot"}
                            redirectText={"forgot password?"}
                        />
                    </div>
                    <FormButton
                        type={"submit"}
                        label={"login"}
                        disable={loading}
                        className={"w-full"}
                    />
                    <Link to={"/auth/signup"} className='my-3 capitalize font-semibold text-sm'>
                        Don't have and account? <span className='text-red-600 uppercase'>signup</span>
                    </Link>
                </form>
            </div>
        )
    )
}

export default LoginPage
