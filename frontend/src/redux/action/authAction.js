import axios from "axios"
import { BACKEND_URL, GET_CONFIG, POST_CONFIG } from "../store"

export const signup = (name, email, password) => async (dispatch) => {
    try{
        dispatch({ type: "SIGNUP_REQUEST" })
        const { data } = await axios.post(`${BACKEND_URL}/signup`, {
            name,email,password
        }, POST_CONFIG)
        dispatch({ type: "SIGNUP_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "SIGNUP_FAIL", payload: error.message })
        }
    }
}

export const getOTP = (email) => async (dispatch) => {
    try{
        dispatch({ type: "FETCH_OTP_REQUEST" })
        const { data } = await axios.post(`${BACKEND_URL}/get_otp`, {
            email
        }, POST_CONFIG)
        dispatch({ type: "FETCH_OTP_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "FETCH_OTP_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "FETCH_OTP_FAIL", payload: error.message })
        }
    }
}

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({ type: "LOGIN_REQUEST" })
        const { data } = await axios.post(`${BACKEND_URL}/login`, {
            email,password
        }, POST_CONFIG)
        dispatch({ type: "LOGIN_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "LOGIN_FAIL", payload: error.message })
        }
    }
}

export const fetchMyProfileData = () => async (dispatch) => {
    try{
        dispatch({ type: "GET_MY_DATA_REQUEST" })
        const { data } = await axios.get(`${BACKEND_URL}/me`, GET_CONFIG)
        dispatch({ type: "GET_MY_DATA_SUCCESS", payload: data.user })
    }catch(error){
        if(error.response){
            dispatch({ type: "GET_MY_DATA_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "GET_MY_DATA_FAIL", payload: error.message })
        }
    }
}

export const logout = () => async (dispatch) => {
    try{
        dispatch({ type: "LOGOUT_REQUEST" })
        const { data } = await axios.get(`${BACKEND_URL}/logout`, GET_CONFIG)
        dispatch({ type: "LOGOUT_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "LOGOUT_FAIL", payload: error.message })
        }
    }
}

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try{
        dispatch({ type: "CHANGE_PASSWORD_REQUEST" })
        const { data } = await axios.put(`${BACKEND_URL}/change_password`, {
            oldPassword, newPassword
        }, POST_CONFIG)
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "CHANGE_PASSWORD_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "CHANGE_PASSWORD_FAIL", payload: error.message })
        }
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try{
        dispatch({ type: "FORGOT_PASSWORD_REQUEST" })
        const { data } = await axios.post(`${BACKEND_URL}/forgot_password`, {
            email
        }, POST_CONFIG)
        dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.message })
        }
    }
}

export const resetPassword = (id, password) => async (dispatch) => {
    try{
        dispatch({ type: "RESET_PASSWORD_REQUEST" })
        const { data } = await axios.put(`${BACKEND_URL}/reset_password/${id}`, {
            password
        }, POST_CONFIG)
        dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.message })
    }catch(error){
        if(error.response){
            dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.message })
        }
    }
}