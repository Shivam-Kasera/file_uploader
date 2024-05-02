import "../../App.css"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa6"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/action/authAction"

const Header = ({ isAuthenticated }) => {
    const [active, setActive] = useState(false)
    const menuBoxRef = useRef(null)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        const headerClickOutside = (event) => {
            if (menuBoxRef.current && !menuBoxRef.current.contains(event.target)) {
                setActive(false)
            }
        }
        document.addEventListener("click", headerClickOutside)
        return () => {
            document.removeEventListener("click", headerClickOutside)
        }
    }, [active, setActive, menuBoxRef])

    return (
        <header className="sticky top-0 z-10 bg-white w-full flex items-center px-3 py-2 shadow shadow-gray-400">
            <nav className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link to={"/"} className="font-bold text-red-600 uppercase text-3xl">
                        Imagfy
                    </Link>
                    <ul className="hidden lg:flex items-center mx-5">
                        <li className="mx-3">
                            <Link to={"/"} className="w-full flex items-center justify-center capitalize text-black hover:text-red-600 cursor-pointer font-semibold">home</Link>
                        </li>
                        <li className="mx-3">
                            <Link to={"/file/upload"} className="w-full flex items-center justify-center capitalize text-black hover:text-red-600 cursor-pointer font-semibold">upload</Link>
                        </li>
                        <li className="mx-3">
                            <Link to={"/about"} className="w-full flex items-center justify-center capitalize text-black hover:text-red-600 cursor-pointer font-semibold">about</Link>
                        </li>
                    </ul>
                </div>
                {
                    !isAuthenticated ? (
                        <Fragment>
                            <div className="hidden lg:flex items-center">
                                <Link to={"/auth/login"} className="w-20 flex items-center justify-center p-2 rounded-lg mr-1 font-semibold uppercase hover:text-red-600">
                                    login
                                </Link>
                                <Link to={"/auth/signup"} className="w-20 lg:flex items-center justify-center p-2 rounded-lg bg-red-600 text-white font-semibold uppercase">
                                    signup
                                </Link>
                            </div>
                            <div className="lg:hidden flex items-center">
                                <Link to={"/auth/login"} className="flex items-center justify-center p-2 rounded-lg bg-red-600 text-white font-semibold uppercase">
                                    login
                                </Link>
                            </div>
                        </Fragment>
                    ) : (
                        <div ref={menuBoxRef} className={`rounded-full w-10 h-10 flex items-center justify-center ${active && "bg-red-200"} cursor-pointer relative`} onClick={() => setActive(!active)}>
                            <FaUser className="w-8 h-8 p-1 border border-red-200 bg-white rounded-full" />
                            {
                                active && (
                                    <ul className="absolute top-14 right-0 flex flex-col w-48 bg-white shadow shadow-gray-400 p-2 space-y-2 rounded-md">
                                        <li className="w-full px-3 hover:bg-red-600 hover:text-white rounded-md py-1 uppercase font-semibold">
                                            <Link className="flex items-center w-full" to={"/profile/me"}>my profile</Link>
                                        </li>
                                        <li className="w-full px-3 hover:bg-red-600 hover:text-white rounded-md py-1 uppercase font-semibold">
                                            <Link className="flex items-center w-full" to={"/file/upload"}>upload</Link>
                                        </li>
                                        <li className="w-full px-3 hover:bg-red-600 hover:text-white rounded-md py-1 uppercase font-semibold">
                                            <Link className="flex items-center w-full" to={"/file/me/allFiles"}>my files</Link>
                                        </li>
                                        <li onClick={logoutHandler} className="w-full px-3 hover:bg-red-600 hover:text-white rounded-md py-1 uppercase font-semibold">
                                            <Link className="flex items-center w-full" to={"/"}>
                                                logout
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    )
                }
            </nav>
        </header>
    )
}

export default Header