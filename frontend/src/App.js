import './App.css';
import { Header } from "./components"
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  AboutPage,
  AllFilesPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  MyProfilePage,
  ResetPasswordPage,
  SignupPage,
  UploadFilePage
} from "./pages";
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProfileData } from './redux/action/authAction';

function App() {
  const [fetchData, setFetchData] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { error, message, isAuthenticated } = useSelector(state => state.user)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: "CLEAR_ERROR" })
    }
    if (message) {
      toast.success(message)
      dispatch({ type: "CLEAR_MESSAGE" })
    }
    if (location.pathname !== "/auth/login" &&
      location.pathname !== "/auth/signup" &&
      location.pathname !== "/password/forgot" &&
      !location.pathname.includes("/password/reset") &&
      !isAuthenticated) {
      navigate('/auth/login')
    }
  }, [dispatch, error, message, navigate, location, isAuthenticated])

  if (!fetchData) {
    dispatch(fetchMyProfileData())
    setFetchData(!fetchData)
  }

  return (
    <Fragment>
      {
        location.pathname !== "/auth/login" &&
        location.pathname !== "/auth/signup" &&
        location.pathname !== "/password/forgot" &&
        !location.pathname.includes("/password/reset") &&
        <Header isAuthenticated={isAuthenticated} />
      }
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route exact path="/auth/signup" element={<SignupPage />} />
        <Route exact path="/password/forgot" element={<ForgotPasswordPage />} />
        <Route exact path="/password/reset/:userId" element={<ResetPasswordPage />} />
        <Route exact path="/file/upload" element={<UploadFilePage />} />
        <Route exact path="/file/me/allFiles" element={<AllFilesPage />} />
        <Route exact path="/profile/me" element={<MyProfilePage />} />
      </Routes>
      <Toaster />
    </Fragment>
  );
}

export default App;
