import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Authorized from "../Authorized/authorized"
import  "../../../pages/admin/Styles/css/allCss.css";

function AddEmployee(){

    const [isValid, setIsValid] = useState("");
    const [role, setRole] = useState(10);
    const [account, setAccount] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    //Error
    const [accountError, setAccountError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");

    //authorized
    const user = sessionStorage.getItem("role_id");
    const allowedRoles = ["1",];


    const handleInputClick = () => {
        setAccountError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPassError("");
    }

    const handleAccount = (event) => {
        setAccount(event.target.value);
        if(!isValid){
            setIsValid(false);
            setAccountError("");
        }
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
        if(!isValid){
            setIsValid(false);
            setEmailError("");
        }
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        if(!isValid){
            setIsValid(false);
            setPasswordError("");
        }
    };

    const handleConfirmPass = (event) => {
        setConfirmPass(event.target.value);
        if(!isValid){
            setIsValid(false);
            setConfirmPassError("");
        }
    };


    const addEmployee = (e) => {
        e.preventDefault();
        setIsValid(true);
        if(!account){
            setAccountError("Hãy nhập vào Tài Khoản");
            setIsValid(false);
        }
        if(!email){
            setEmailError("Hãy Nhập Vào Email");
            setIsValid(false);
        }
        if(!password){
            setPasswordError("Hãy Nhập Vào Mật Khẩu");
            setIsValid(false);
        }
        if(!confirmPass){
            setConfirmPassError("Hãy Nhập Vào Xác Nhận Mật Khẩu");
            setIsValid(false);
        }
        if(password !== confirmPass){
            setConfirmPassError("Mật Khẩu Không Trùng Khớp");
            setIsValid(false);
        }
        if(isValid){
            const employeeData = {
                account: account,
                email: email,
                password: password,
                confirm_password: confirmPass,
            };
            axios
                .post(`/user/admin/${role}`, employeeData)
                .then((response) => {
                    console.log(response.data);
                    toast.success("Thêm Nhân Viên Thành Công",{
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                    const redirectInterval = setInterval(() => {
                        clearInterval(redirectInterval);
                    window.location.href = "/admin/all_employee";
                    },1500);
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        }else{
            toast.error("Hãy Đảm Bảo Rằng Đã Nhập Đủ",{
                position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
            });
            const redirectInterval = setInterval(() => {
                clearInterval(redirectInterval);
            },1500);
        }
    };

    return(
        <div>
            <Authorized user={user} allowedRoles={allowedRoles}>
            <div className="main">
                <ToastContainer 
                    style={{
                        width: "400px",
                        fontSize: "18px",
                    }} 
                />
                
                <div className="main__title">
                    <span className="main__title-text">
                            Thêm Mới Nhân Viên
                    </span>
                    <span className="main__title-des">
                            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                    </span>
                </div>
                <div className="main__form">
                    <div className="form__product-id">
                            <label className="form__product-id-title">
                                Tài Khoản
                            </label>
                            <input type="text" 
                                    readonly className="form__product-id-input " 
                                    placeholder="Enter User Name"
                                    value={account}
                                    onChange={handleAccount}
                                    onClick={handleInputClick}
                            />
                            {accountError && (
                                <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                                    {accountError}
                                </div>
                            )}
                    </div>
                     <div className="form__product-cate-id">
                            <label className="form__product-id-title">
                                Email
                            </label>
                            <input type="text" 
                                    className="form__product-id-input" 
                                    placeholder="Enter Email" 
                                    value={email}
                                    onChange={handleEmail}
                                    onClick={handleInputClick}
                            />
                            {emailError && (
                                <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                                    {emailError}
                                </div>
                            )}
                    </div> 
                    <div className="form__product-name">
                            <label for="form__product-name-input" className="form__product-name-title">
                                Mật Khẩu
                            </label>
                            <input type="password" id="form__product-input" 
                                    className="form__product-nane-input" 
                                    placeholder="Enter Password" 
                                    value={password}
                                    onChange={handlePassword}
                                    onClick={handleInputClick}
                            />
                            {passwordError && (
                                <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                                    {passwordError}
                                </div>
                            )}
                    </div>
                    <div className="form__product-quantity">
                            <label for="form__product-quantity-input" className="form__product-quantity-title">
                                Xác Nhận Mật Khẩu
                            </label>
                            <input type="password" 
                                id="form__product-quantity-input" 
                                className="form__product-quantity-input" 
                                placeholder="Enter Confirm Password" 
                                value={confirmPass}
                                onChange={handleConfirmPass}
                                onClick={handleInputClick}
                            /> 
                            {confirmPassError && (
                                <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                                    {confirmPassError}
                                </div>
                            )}
                    </div>
                    <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                            onClick={addEmployee}
                    >
                        Thêm Mới
                    </button>
                </div>
                </div>
            </div>
            <div className="action">
                <div className="action__main">
                    <div className="action__title">
                            <i className="action__title-icon"></i>
                            <span className="action__title-text">
                            </span>
                    </div>
                </div>
            </div>
            </Authorized>
        </div>
    );
}

export default AddEmployee;