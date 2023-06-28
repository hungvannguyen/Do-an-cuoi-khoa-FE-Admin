import  "../Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";


function Header () {
    let hasSessionData = sessionStorage.getItem("token") !== null;

    //Logout    
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        hasSessionData = false;
        window.location.href = "http://localhost:3000/";
    };


    return(
        <header className="admin-header">
          <div className="header__welcome">
              <p className="header__welcome-title">
                    Good Morning, <span className="header__welcome-title-name">
                        John Doe
                    </span>
              </p>
              <p className="header__welcome-des">
                    Your performance summary this week
              </p>
          </div>
          <div className="header__account">
                <div className="Logout me-3" >
                    <span className="Logout-text" onClick={handleLogout} style={{cursor:"pointer"}}>
                        Đăng xuất
                    </span>
                </div>

              <div className="header__search">
                    <label htmlFor="header__search-input">
                        <i className="fas fa-search header__search-icon"></i>
                    </label>
                    <input type="text" id="header__search-input" className="header__search-input" placeholder="Search Here" />
              </div>
              <div className="header__noti">
                    <i className="far fa-bell header__noti-icon icon-dot" ></i>
                    <div className="header__noti-main">

                    </div>
              </div>
              <div className="header__message">
                    <i className="far fa-envelope header__message-icon icon-dot"></i>
                    <div className="header__message-main">

                    </div>
              </div>
              <div className="header__user">
                    <div className="header__user-name">
                        <span className="header__user-name-text">
                              John Doe
                        </span>
                    </div>
                    <div className="header__user-avatar">
                        <img src="./images/faces/face21.jpg" alt="" className="header__user-avatar-img" />
                    </div>
              </div>
          </div>
      </header>

    );
}
export default Header;