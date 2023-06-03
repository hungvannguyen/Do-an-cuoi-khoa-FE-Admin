import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){


    useEffect(() => {     
        const urlParams = new URLSearchParams(window.location.search);   
        const gettoken = urlParams.get('token');
        sessionStorage.setItem("token", gettoken);
        window.location.href = "/admin/dashboard";
    }, );

    console.log(sessionStorage.getItem("token"));
    return(
        null    
    );
}

export default Login;