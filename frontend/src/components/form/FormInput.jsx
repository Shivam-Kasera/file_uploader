import React from 'react'
import { Link } from 'react-router-dom'

const FormInput = ({ id, label, type, placeholder, value, onChange, isRequired, error, className = "", inputClassName, redirectLink, redirectText }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label
                htmlFor={id}
                className={`cursor-pointer font-semibold text-sm uppercase ${isRequired && "input_required"} ${error ? "text-red-600" : "text-black"}`}
            >
                {label}
            </label>
            <input
                id={id}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`my-1 px-2 py-1 outline-none border ${error ? "border-red-600" : "border-gray-200"} ${inputClassName}`}
            />
            <div className='flex items-center justify-between'>
                <p className='text-red-600 uppercase text-xs'>
                    {error}
                </p>
                <Link to={redirectLink} className={`uppercase text-xs hover:text-red-600 font-[600]`}>
                    {redirectText}
                </Link>
            </div>
        </div>
    )
}

export default FormInput
