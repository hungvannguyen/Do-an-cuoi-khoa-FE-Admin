import "../../../pages/admin/Styles/css/login/main.css";
import "../../../pages/admin/Styles/css/login/util.css";
import logoImage from "../../../../src/assest/image/img-01.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        setUsername(username);
        setPassword(password);
        console.log(username);
        console.log(password);

        axios
        .post("/user/login", {
            account: username,
            password: password,
            
        })
        .then((response) => {

            const {role_id} = response.data;
            
            if(role_id === 1 || role_id === 10){
            sessionStorage.setItem("token", response.data.token);
            console.log(sessionStorage.getItem("token") )
            navigate("/admin/dashboard");
            }else{
                console.log("Bạn không có quyền truy cập");
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("Đăng nhập thất bại");
        });
    };


    return(
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src={logoImage} alt="IMG" />
				</div>

				<form class="login100-form validate-form">
					<span class="login100-form-title">
						Admin Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="username" placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="pass" placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<div class="login100-form-btn"
                            
                            onClick={handleLogin}
                        >
							Login
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
    );
}

export default Login;