import React from 'react';

const AboutPage = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='w-full text-center bg-red-600 text-white uppercase px-5 py-3 font-bold'>
                About "fileUploader" Web App
            </h2>
            <p className='text-center text-xl font-semibold py-2'>
                "fileUploader" is your trusted solution for secure document uploads. Designed with a focus on privacy and data protection, our cutting-edge web application ensures that your sensitive documents are uploaded and stored in a safe and secure environment.
            </p>
            <h3 className='w-full text-center bg-red-600 text-white uppercase px-5 py-3 font-bold'>Key Features</h3>
            <ul>
                <li className='flex flex-col text-center my-3 uppercase border-b border-b-red-200'>
                    <strong>
                        Secure Document Uploads
                    </strong>
                    <span className='my-2'>
                        With advanced encryption techniques and robust security measures, "fileUploader" provides a secure platform for uploading your documents.
                    </span>
                </li>
                <li className='flex flex-col text-center my-3 uppercase border-b border-b-red-200'>
                    <strong>
                        User-Friendly Interface
                    </strong>
                    <span className='my-2'>
                        Our intuitive interface makes it easy for you to navigate and upload your documents hassle-free, ensuring a seamless user experience.
                    </span>
                </li>
                <li className='flex flex-col text-center my-3 uppercase border-b border-b-red-200'>
                    <strong>
                        Privacy Protection
                    </strong>
                    <span className='my-2'>
                        We prioritize the confidentiality of your data and implement strict privacy protocols to safeguard against unauthorized access. Your information remains confidential and protected at all times.
                    </span>
                </li>
                <li className='flex flex-col text-center my-3 uppercase border-b border-b-red-200'>
                    <strong>
                        Efficient File Management
                    </strong>
                    <span className="my-2">
                        "fileUploader" offers efficient file management capabilities, allowing you to organize and access your documents effortlessly.
                    </span>
                </li>
                <li className='flex flex-col text-center my-3 uppercase'>
                    <strong>
                        Reliable Support
                    </strong>
                    <span className="mt-2">
                        Our dedicated team provides exceptional customer support to address any queries or concerns promptly, ensuring a smooth and satisfying user experience.
                    </span>
                </li>
            </ul>
            <p className='text-center uppercase font-semibold px-5 py-3 text-white bg-red-600'>
                Whether you're uploading documents for personal or professional use, "fileUploader" empowers you to securely store and manage your important files with confidence.
            </p>
        </div>
    );
};

export default AboutPage;