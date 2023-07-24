import React, { useEffect } from 'react';
import {WEB_BASE_URL} from "../../../urlConfig"

const requireAuth = (Component) => {
        const isAuthenticated = sessionStorage.getItem("token") && sessionStorage.getItem("role_id");
    
        return isAuthenticated ? (
            <Component />
        ) : (
            window.location.href = `${WEB_BASE_URL}/login`
        );
}
export default requireAuth;