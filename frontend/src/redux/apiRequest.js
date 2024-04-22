import axios from "axios"
import {
    updatelightStart, updatelightSuccess, updatelightFailed,
    updatetemperhumidStart, updatetemperhumidSuccess, updatetemperhumidFailed
} from "./IoTSlice"
import {
    loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed, logoutFailed, logoutStart, logoutSuccess,
    changeAvatarStart, changeAvatarSuccess, changeAvatarFailed, changeInforStart, changeInforSuccess, changeInforFailed,
    changePassStart, changePassSuccess, changePassFailed
} from "./authSlice"

export const login = async (user, dispatch, navigate,setToken) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/user/login`, user);
        dispatch(loginSuccess(res.data))
        setToken(res.data)
        localStorage.setItem('token',res.data)
        navigate("/dashboard")
    }
    catch (err) {
        dispatch(loginFailed())
        alert("Login failed")
        console.log(err)
    }
}
export const register = async (user, dispatch, navigate,setToken) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/user/new`, user)
        setToken(res.data);
        localStorage.setItem("token", res.data);
        dispatch(registerSuccess())
        return res
    }
    catch (err) {
        dispatch(registerFailed())
    }
}
export const logout = async (dispatch, navigate) => {
    dispatch(logoutStart())
    try {
        // await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/logout`, {
        //     withCredentials: true
        // })
        localStorage.setItem('token','')
        dispatch(logoutSuccess())
        navigate('/')
    } catch (err) {
        dispatch(logoutFailed())
    }
}
export const updatelight = async (uid, dispatch, date) => {
    dispatch(updatelightStart())
    try {
        let light = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/light`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        const res = {
            light: light.data.message.payload
        }
        if (light === undefined || light.data.message.payload === undefined) {
            res.light = []
            dispatch(updatelightSuccess(res))
            return 0
        }
        else {
            dispatch(updatelightSuccess(res))
            return light.data.message.latest.value
        }
    }
    catch (err) {
        dispatch(updatelightFailed())
        return 0
    }
}

export const updatetemperhumid = async (uid, dispatch, date) => {
    dispatch(updatetemperhumidStart())
    try {
        let temp = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/temp`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        let humid = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/humid`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        const res = {
            humid: humid.data.message.payload,
            temp: temp.data.message.payload,
        }
        const result = {
            temp: temp.data.message.latest.value,
            humid: humid.data.message.latest.value
        }
        if (temp === undefined || temp.data.message.payload === undefined) {
            res.temp = []
            result.temp = 0
        }
        if (humid === undefined || humid.data.message.payload === undefined) {
            res.humid = []
            result.humid = 0
        }
        dispatch(updatetemperhumidSuccess(res))
        return result
    }
    catch (err) {
        dispatch(updatetemperhumidFailed())
        console.log("Failed", err)
        const result = {
            temp: 0,
            humid: 0
        }
        return result
    }
}
export const changeavatar = async (uid, new_avatar, dispatch, id) => {
    dispatch(changeAvatarStart())
    try {
        const new_user = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/user/changeAvatar?id=${id}`, new_avatar, {
            withCredentials: true
        })
        dispatch(changeAvatarSuccess(new_user.data.data))
        alert("Change Avatar success")
    } catch (err) {
        dispatch(changeAvatarFailed())
        alert("Change Avatar failed")
    }
}
export const changeinfor = async (uid, new_infor, dispatch, id) => {
    dispatch(changeInforStart())
    try {
        const new_user = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/user/update/info?id=${id}`, new_infor, {
            withCredentials: true
        })
        console.log(new_user)
        dispatch(changeInforSuccess(new_user.data.message))
        alert("Change User's Information Success")
    } catch (err) {
        dispatch(changeInforFailed())
        alert("Change User's Information Failed")
    }
}
export const changepass = async (uid, changepass, dispatch, id) => {
    dispatch(changePassStart())
    try {
        const new_user = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/user/update/pass?id=${id}`, changepass, {
            withCredentials: true
        })
        console.log(new_user)
        dispatch(changePassSuccess())
        alert("Change Password Success")
    } catch (err) {
        dispatch(changePassFailed())
        alert("Change Password Failed")
    }
}
export const putmessage = async (uid, message, id) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/noty/push?id=${id}`, message, {
            withCredentials: true
        })
    } catch (err) {
        console.log(err)
    }
}
export const getmessage = async (uid, id) => {
    try {
        const data = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/noty/get?id=${id}`, {
            withCredentials: true
        })
        return data.data
    } catch (err) {
        console.log(err)
    }
}

export const getlight = async (uid, date) => {
    try {
        let light = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/light`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        return light.data.message.payload
    }
    catch (err) {
        console.log(err)
        return []
    }
}
export const gettemper = async (uid, date) => {
    try {
        let temper = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/temp`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        return temper.data.message.payload
    }
    catch (err) {
        console.log(err)
        return []
    }
}
export const gethumid = async (uid, date) => {
    try {
        let humid = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/humid`, {
            responseType: 'json',
            withCredentials: true,
            uid
        })
        return humid.data.message.payload
    }
    catch (err) {
        console.log(err)
        return []
    }
}

