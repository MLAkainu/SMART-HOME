import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from './components/layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import Light from './pages/Light';
import TemperHumi from './pages/TemperHumid';
import Notification from './pages/Notification';
import User from './pages/User';



import { useSelector } from "react-redux"
import {  useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState()
  
  const setTokenToNull = () => {
  setToken('')
  }


  useEffect(() => {
    const auth = async () => {
      setToken(localStorage.getItem('token'))
      if (token === null || token === '') {
        setIsAuth(false);
        return
      }
      console.log(token)
      const res = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/verify`,
        { token });
      if (res.data.msg === 'false') {
        setIsAuth(false);
      }
      else {
        setIsAuth(true)
        setUser(res.data)
      }
    }
    auth();
  },[token])


  return isAuth ? (
    <Router>
      <Routes>
        <Route element={<DefaultLayout setToken={setTokenToNull} user={user}  />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/light" element={<Light />} />
          <Route path="/temperhumi" element={<TemperHumi />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path='*' element={ <Navigate to='/dashboard'/>} />
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken}/>} />
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    </Router>
  );
}

export default App;
