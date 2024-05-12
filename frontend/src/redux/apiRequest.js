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

export const login = async (token,dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/user/login`, {token});
        dispatch(loginSuccess(res.data))
        
        navigate("/dashboard")
    }
    catch (err) {
        dispatch(loginFailed())
        alert("Login failed")
        console.log(err)
    }
}
export const register = async (user,dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/user/new`, user)
        // setToken(res.data);
        // localStorage.setItem("token", res.data);
        if (res.data.msg === 'error')
            throw new Error('failed')
        navigate("/");
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

export const updategas = async (token, dispatch, date) => {
    try {
        let gas = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/gas`,
          {
            responseType: "json",
            withCredentials: true,
            params: {
              token,
            },
          }
        );
        return gas.data
    
    }
    catch (err) {
        return 0
    }
}





export const updatelux = async (token, dispatch, date) => {
    dispatch(updatelightStart())
    try {
        let light = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/lux`,
          {
            responseType: "json",
            withCredentials: true,
            params: {
              token,
            },
          }
        );
        return light.data
        // const res = {
        //     light: light.data.message.payload
        // }
        // if (light === undefined || light.data.message.payload === undefined) {
        //     res.light = []
        //     dispatch(updatelightSuccess(res))
        //     return 0
        // }
        // else {
        //     dispatch(updatelightSuccess(res))
        //     return light.data.message.latest.value
        // }
    }
    catch (err) {
        dispatch(updatelightFailed())
        return 0
    }
}


export const updatetemperhumid = async (token, dispatch, date) => {
    dispatch(updatetemperhumidStart())
    try {
        let temp = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/temp`,
          {
            responseType: "json",
            withCredentials: true,
            params: {
              token
            },
          }
        );
        let humid = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/data/stat/humid`,
          {
            responseType: "json",
            withCredentials: true,
            params: {
              token
            },
          }
        );
        if (temp.data === 'error' || humid.data === 'error'){
            return {temp:0,humid:0}
        }
        return {temp:temp.data,humid:humid.data}
        // const res = {
        //     humid: humid.data.message.payload,
        //     temp: temp.data.message.payload,
        // }
        // const result = {
        //     temp: temp.data.message.latest.value,
        //     humid: humid.data.message.latest.value
        // }
        // if (temp === undefined || temp.data.message.payload === undefined) {
        //     res.temp = []
        //     result.temp = 0
        // }
        // if (humid === undefined || humid.data.message.payload === undefined) {
        //     res.humid = []
        //     result.humid = 0
        // }
        // dispatch(updatetemperhumidSuccess(res))
        // return result
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
export const changeinfor = async (user,token,email, dispatch) => {
  dispatch(changeInforStart())
  try {
      const new_user = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/user`,{user,token,email})
      if (new_user.data.msg === 'error')
        throw new Error('failed')
      dispatch(changeInforSuccess(new_user.data.message))
  } catch (err) {
      dispatch(changeInforFailed())
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
export const putmessage = async (message,token) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/notifs`, {token,message:message.message,type:message.type}, {
            withCredentials: true
        })
    } catch (err) {
        console.log(err)
    }
}
export const writeLight = async (val) => {
    try {
        console.log(val)
        console.log(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/light`);
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/light`,{val})
    }
    catch (err){
        console.log(err)
    }
}

export const writeFan = async (val) => {
  try {
    console.log(val);
    console.log(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/fan`);
    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/fan`,{val})
  } catch (err) {
    console.log(err);
  }
};

export const writeDoor = async (val) => {
  try {
    console.log(val);
    console.log(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/door`);
    await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/equip/door`,
      { val }
    );
  } catch (err) {
    console.log(err);
  }
};

export const writeAlarm = async (val) => {
  try {
    console.log(val);
    console.log(`${process.env.REACT_APP_API_ENDPOINT}/api/equip/alarm`);
    await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/equip/alarm`,
      { val }
    );
  } catch (err) {
    console.log(err);
  }
};


export const getmessage = async (token, date) => {
    try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/notifs`,
          {
              withCredentials: true,
            params: {
                token,
                date
            },
          }
        );

        return data.data
    } catch (err) {
        console.log(err)
    }
}




export const getlight = async (token, date) => {
    try {

      let lux = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/activities`,
        {
          responseType: "json",
          withCredentials: true,
          params: {
              token,
              date,
              type:"lux"
          },
        }
      );
      console.log('lux=',lux.data)
      return lux.data
  }
  catch (err) {
      console.log(err)
      return []
  }
}
export const gettemper = async (token, date) => {
    try {

      let temp = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/activities`,
        {
          responseType: "json",
          withCredentials: true,
          params: {
              token,
              date,
              type:"temp"
          },
        }
      );
      console.log('temp=',temp.data)
      return temp.data
  }
  catch (err) {
      console.log(err)
      return []
  }
}
export const gethumid = async (token, date) => {
    try {
        let humid = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/activities`,
          {
            responseType: "json",
            withCredentials: true,
            params: {
                token,
                date,
                type:"humid"
            },
          }
        );
        console.log('humid=',humid.data)
        return humid.data
    }
    catch (err) {
        console.log(err)
        return []
    }
}

export const writeData = async (token, type,val) => {
  try {
    let humid = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/activities`,{token,type,val},
      {
        responseType: "json",
        withCredentials: true,
      }
    );
    console.log("humid=", humid.data,  val);
    return humid.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
