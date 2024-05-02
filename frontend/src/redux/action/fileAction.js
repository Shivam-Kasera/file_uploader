import axios from "axios"
import { BACKEND_URL, GET_CONFIG } from "../store"

export const uploadFileToServer = (formData) => async (dispatch) => {
    try{
        dispatch({ type: "UPLOAD_FILE_REQUEST" })
        const { data } = await axios.post(`${BACKEND_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        dispatch({ type: "UPLOAD_FILE_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "UPLOAD_FILE_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "UPLOAD_FILE_FAIL", payload: error.message })
        }
    }
}

export const searchFile = (fileName) => async (dispatch) => {
    try{
        dispatch({ type: "SEARCH_FILE_REQUEST" })
        const { data } = await axios.get(`${BACKEND_URL}/file/search/${fileName}`, GET_CONFIG)
        dispatch({ type: "SEARCH_FILE_SUCCESS", payload: data.files[0]?.myFiles })
    }catch(error){
        if(error.response){
            dispatch({ type: "SEARCH_FILE_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "SEARCH_FILE_FAIL", payload: error.message })
        }
    }
}

export const deleteFile = (fileName, id) => async (dispatch) => {
    try{
        dispatch({ type: "DELETE_FILE_REQUEST" })
        const { data } = await axios.delete(`${BACKEND_URL}/file/delete/${id}/${fileName}`,
        GET_CONFIG)
        dispatch({ type: "DELETE_FILE_SUCCESS", payload: data })
    }catch(error){
        if(error.response){
            dispatch({ type: "DELETE_FILE_FAIL", payload: error.response.data.message })
        }else{
            dispatch({ type: "DELETE_FILE_FAIL", payload: error.message })
        }
    }
}