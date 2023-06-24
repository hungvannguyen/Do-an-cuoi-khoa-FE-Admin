import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){


    useEffect(() => {     
        const urlParams = new URLSearchParams(window.location.search);   
        const gettoken = urlParams.get('token');
        const getrole = urlParams.get('role_id');
        sessionStorage.setItem("role_id", getrole);
        sessionStorage.setItem("token", gettoken);
        window.location.href = "/admin/dashboard";
    }, );

    console.log(sessionStorage.getItem("role_id"));
    return(
        null    
    );
}

export default Login;