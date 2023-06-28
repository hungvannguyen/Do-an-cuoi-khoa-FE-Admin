import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { get } from 'jquery';

const requireAuth = (Component) => {
        const isAuthenticated = sessionStorage.getItem("token") && sessionStorage.getItem("role_id");
    
        return isAuthenticated ? (
            <Component />
        ) : (
            window.location.href = "http://localhost:3000/login"
        );
}
export default requireAuth;