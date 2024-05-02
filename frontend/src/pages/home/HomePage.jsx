import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="w-full max-h-full flex flex-col items-center justify-center pt-32">
            <h1 className="text-4xl lg:text-5xl uppercase text-black font-bold text-center">
                free cloud storage for your date
            </h1>
            <Link to={"/file/upload"} className="px-10 py-3 bg-red-600 text-white uppercase cursor-pointer rounded-lg mt-10">
                start uploading files now
            </Link>
        </div>
    )
}

export default HomePage