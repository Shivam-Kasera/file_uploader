import React from 'react'
import { Link } from "react-router-dom"

const FormHeading = ({ icon, title, desc }) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <Link to="/">
        {icon}
      </Link>
      <h1 className='text-xl lg:text-4xl text-center uppercase font-semibold'>
        {title}
      </h1>
      <p className='text-[8px] lg:text-xs my-1 text-center lg:px-14'>
        {desc}
      </p>
    </div>
  )
}

export default FormHeading
