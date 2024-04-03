import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logoutStart: (state) => {
            state.login.isFetching = true
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false
            state.login.currentUser = null
            state.login.error = false
        },
        logoutFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        changeAvatarStart: (state) => {
            state.login.isFetching = true
        },
        changeAvatarSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser.data = action.payload;
            state.login.error = false
        },
        changeAvatarFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        changeInforStart: (state) => {
            state.login.isFetching = true
        },
        changeInforSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser.data = action.payload;
            state.login.error = false
        },
        changeInforFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        changePassStart: (state) => {
            state.login.isFetching = true
        },
        changePassSuccess: (state) => {
            state.login.isFetching = false
            state.login.error = false
        },
        changePassFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        }
    }
})

export const {
    loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, logoutStart, logoutSuccess, logoutFailed
    , changeAvatarStart, changeAvatarSuccess, changeAvatarFailed, changeInforStart, changeInforSuccess, changeInforFailed
    , changePassStart, changePassSuccess, changePassFailed
} = authSlice.actions;

export default authSlice.reducer