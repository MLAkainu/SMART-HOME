import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  console.log(isAuth)

  useEffect(() => {
    const auth = async () => {
      setToken(localStorage.getItem('token'))
      if (token === null || token === '') {
        setIsAuth(false);
        return
      }
      const res = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/api/user/verify`,
        { token });
      console.log(res.data)
      if (res.data.msg === 'false') {
        setIsAuth(false);
      }
      else setIsAuth(true)
    }
    auth()
  },[])
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <DefaultLayout /> : <Login setToken={setToken}/>}  />
        {/* <Route path="/" element={<Login />} actions={ {setIsAuth}} /> */}
        <Route path="/register" element={isAuth?<DefaultLayout/>:<Register />} />
        <Route element={<DefaultLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/light" element={<Light />} />
          <Route path="/temperhumi" element={<TemperHumi />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<User />} />

        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
