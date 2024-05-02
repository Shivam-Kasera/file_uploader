import React from 'react'

const FormButton = ({ type, label, onClick, disable, className }) => {
    return (
        <div className={`${className}`}>
            {
                !disable ? (
                    <button
                        type={type}
                        onClick={onClick}
                        disabled={disable}
                        className={`bg-red-600  w-full px-2 py-1 rounded-sm cursor-pointer text-white font-semibold uppercase`}
                    >
                        {label}
                    </button>
                ) : (
                    <button
                        type={type}
                        onClick={onClick}
                        disabled={disable}
                        className={`bg-red-400 w-full px-2 py-1 rounded-sm cursor-pointer text-white font-semibold uppercase`}
                    >
                        {
                            "please wait..."
                        }
                    </button>
                )
            }
        </div>
    )
}

export default FormButton
