import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Light from "./pages/Light";
import TemperHumi from "./pages/TemperHumid";
import Notification from "./pages/Notification";
import User from "./pages/User";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import firebase from "firebase/compat/app";
import  "firebase/compat/auth";

const API_KEY = "AIzaSyDkg6T_z2SyvQxU2BIv1bJcfddlhEGqNR4";
const AUTH_DOMAIN = "smart-home-1dabb.firebaseapp.com";
const DB_URL =
  "https://smart-home-1dabb-default-rtdb.asia-southeast1.firebasedatabase.app";
const PROJ_ID = "smart-home-1dabb";
const BUCKET = "smart-home-1dabb.appspot.com";
const SENDER_ID = 653274004114;
const APP_ID = "1:653274004114:web:4a60ff484610d413c4c44b";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJ_ID,
  storageBucket: BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [token,setToken]=useState(null)
  let data

  const changeinfo=useCallback((data)=>setUserinfo(data),[])
 useEffect(() => {
    auth.onAuthStateChanged( async (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const fetchUserInfo = async () => {
          const idToken = await auth.currentUser.getIdToken();
          setToken(idToken)
          const res = await axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/api/user/`,
            {
              params: {
                token: idToken,
              },
            }
          );
          // console.log(res.data)
          data = res.data
        };
       await  fetchUserInfo();
        console.log(data)
setUserinfo(data);
        setIsAuth(true);
      } else {
        // User is signed out
        setIsAuth(false);
        const signOut = async () => await auth.signOut();
        signOut();
        setUser(null);
        setToken(null);
        setUserinfo(null)
      }
    });
  }, []);
  
  // auth.signOut();
  // setIsAuth(false)
  return isAuth ? (
    <Router>
      <Routes>
        <Route element={<DefaultLayout auth={auth} user={userinfo} />}>
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/light" element={<Light token={token} />} />
          <Route path="/temperhumi" element={<TemperHumi token={token} />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<User user={userinfo} auth={auth} firebase={firebase} />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Login auth={auth} setUser={setUser} />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
