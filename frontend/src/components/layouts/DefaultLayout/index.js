import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

import "./DefaultLayout.css";
import "../../base.css";
import sun from "../../../assets/sun.png";
import cloudy from "../../../assets/cloudy.png";
import night from "../../../assets/night.png";
import avt from "../../../assets/avatar.jpg";


import { IoHome } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";

import { logout } from "../../../redux/apiRequest.js"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux"

function DefaultLayout() {
    const user = {
        firstname: "Lokkk",
        lastname: "Van A",
        avatar: avt
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [btnSider, setBtnSider] = useState(0);
    const active = {
        backgroundColor: "#6c29fb",
        borderRadius: "5px"
    }

    var date = new Date();
    var hour = date.getHours();
    var day = "", num = date.getDay();
    var weather;

    if (hour >= 6 && hour <= 12) weather = sun;
    else if (hour > 12 && hour < 18) weather = cloudy;
    else weather = night;

    switch (num) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
      }

      var month = "", num1 = date.getMonth();
      switch (num1) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "February";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7:
          month = "August";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "October";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "December";
          break;
    }

    function handlelogout() {
        // dispatch(logout())
        // if (window.confirm('Bạn có muốn đăng xuất không ?')) {
        //     logout(dispatch, navigate)
        //   }
        navigate("/")
    }
    return (
        <div className="App">
          <div className="wrapper">
            <div className="cover">
              <div className="cover__item item1"></div>
              <div className="cover__item item2"></div>
              <div className="cover__item item3"></div>
              <div className="cover__item item4"></div>
            </div>
            <div class="center">
              <div className="main">
                <div className="siderbar">
                  <ul className="siderbar__list">
                    <li className="siderbar__list-item" style={btnSider == 0 ? active : {}}>
                      <Link to="/dashboard" onClick={() => setBtnSider(0)}>
                        <i class="home-icon"><IoHome /></i>
                      </Link>
                    </li>
                    <li className="siderbar__list-item" style={btnSider == 2 ? active : {}}>
                      <Link to="/light" onClick={() => setBtnSider(2)}>
                        <i class="light-icon"><FaRegLightbulb /></i>
                      </Link>
                    </li>
                    <li className="siderbar__list-item" style={btnSider == 3 ? active : {}}>
                      <Link to="/temperHumi" onClick={() => setBtnSider(3)}>
                        <i class="temper-icon"><FaTemperatureLow /></i>
                      </Link>
                    </li>
                    <li className="siderbar__list-item" style={btnSider == 4 ? active : {}}>
                      <Link to="/notification" onClick={() => setBtnSider(4)}>
                        <i class="gear-icon"><IoNotificationsOutline /></i>
                      </Link>
                    </li>
                    <li className="siderbar__list-item" style={btnSider == 5 ? active : {}}>
                      <div className="logout-wrapper" onClick={handlelogout}>
                        <i class="logout-icon"><FaPowerOff /></i>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="container">
                  <header className="header">
                    <nav className="navbar">
                      <div class="navbar__logo">
                        <i class="logo-icon fa-solid fa-layer-group"></i>
                        SMART HOME
                      </div>
                      <div className="navbar__account">
                        <Link to="/user">
                          {/* <img className="navbar__account-img" src={user.data.avatar=="None"?avt:user.data.avatar} /> */}
                            <img className="navbar__account-img" src={user.avatar} />
                        </Link>
                      </div>
                    </nav>
                    <div className="header__time">
                      <div className="header__time-greeting">
                        {/* <span className="greeting1">Good morning, {user.data.firstname}</span> */}
                        <span className="greeting1">Good morning, {user.firstname}</span>
                        <span className="greeting2">Have a nice day</span>
                      </div>
                      <div className="header__time-weather">
                        <img src={weather} className="weather-icon" />
                      </div>
                      <div className="header__time-infor">
    
                        <span className="time1">{hour}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
                          {
                            date.getHours() >= 12 ? " PM" : " AM"
                          } </span>
                        <span className="time2">{day}, {date.getDate()} {month} {date.getFullYear()}</span>
                      </div>
                    </div>
                  </header>
                  <div className="content">
                    <Outlet></Outlet>
                  </div>
    
                </div>
              </div>
            </div>
          </div>
        </div>
    
      );


}
export default DefaultLayout;