import { createReducer } from "@reduxjs/toolkit"

export const userReducer = createReducer({ isAuthenticated: false }, (builder) => {
    builder
        .addCase("SIGNUP_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("SIGNUP_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.message = action.payload.message
        })
        .addCase("SIGNUP_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("FETCH_OTP_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("FETCH_OTP_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.otp = action.payload.otp
            state.message = action.payload.message
        })
        .addCase("FETCH_OTP_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("LOGIN_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("LOGIN_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.message = action.payload.message
        })
        .addCase("LOGIN_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("GET_MY_DATA_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("GET_MY_DATA_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
        })
        .addCase("GET_MY_DATA_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("LOGOUT_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("LOGOUT_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = action.payload.user
            state.message = action.payload.message
        })
        .addCase("LOGOUT_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("FORGOT_PASSWORD_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("FORGOT_PASSWORD_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.message = action.payload
        })
        .addCase("FORGOT_PASSWORD_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("RESET_PASSWORD_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("RESET_PASSWORD_SUCCESS", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.message = action.payload
        })
        .addCase("RESET_PASSWORD_FAIL", (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload
        })
        .addCase("UPLOAD_FILE_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("UPLOAD_FILE_SUCCESS", (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase("UPLOAD_FILE_FAIL", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("SEARCH_FILE_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("SEARCH_FILE_SUCCESS", (state, action) => {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    myFiles: action.payload
                }
            };
        })
        .addCase("SEARCH_FILE_FAIL", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("DELETE_FILE_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("DELETE_FILE_SUCCESS", (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase("DELETE_FILE_FAIL", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("CHANGE_PASSWORD_REQUEST", (state) => {
            state.loading = true
        })
        .addCase("CHANGE_PASSWORD_SUCCESS", (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase("CHANGE_PASSWORD_FAIL", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("CLEAR_ERROR", (state) => {
            state.error = null
        })
        .addCase("CLEAR_MESSAGE", (state) => {
            state.message = null
        })
})