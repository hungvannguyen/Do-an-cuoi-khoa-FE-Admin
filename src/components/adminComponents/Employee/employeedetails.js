import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactModal from 'react-modal';
import Authorized from "../Authorized/authorized"


function EmployeeDetails(){
     const {user_id} = useParams();
     const [isValid, setIsValid] = useState(true);
     const [users, setUsers] = useState([]);
     const [userId, setUserId] = useState("");
     const [userName, setUserName] = useState("");
     const [userPhone, setUserPhone] = useState("");
     const [userAccount, setUserAccount] = useState("");
     const [userEmail, setUserEmail] = useState("");
     const [userRoleId, setUserRoleId] = useState("");
     const [isLock, setIsLock] = useState("");

     //order_count
     const [totalOrder, setTotalOrder] = useState("");
     const [cancelOrder, setCancelOrder] = useState("");
     const [successOrder, setSuccessOrder] = useState("");
     const [pendingOrder, setPendingOrder] = useState("");
     const [pendingRefundOrder, setPendingRefundOrder] = useState("");
     const [refundedOrder, setRefundedOrder] = useState("");    
     const [deliveredOrder, setDeliveredOrder] = useState("");
     const [deliveringOrder, setDeliveringOrder] = useState("");
     const [confirmOrder, setConfirmOrder] = useState("");


     //modal
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isModalOpen2, setIsModalOpen2] = useState(false);
     const [isModalOpen3, setIsModalOpen3] = useState(false);
     const [isModalOpen4, setIsModalOpen4] = useState(false);

     //user init data
     const [initUserName, setInitUserName] = useState("");
     const [initUserPhone, setInitUserPhone] = useState("");

     //Error
     const [userNameError, setUserNameError] = useState("");
     const [phoneNumberError, setPhoneNumberError] = useState("");
     const [phoneNumberError2, setPhoneNumberError2] = useState("");

     //authorized
    const user = sessionStorage.getItem("role_id");
    const allowedRoles = ["1"];


     
     const openModal = () => {
     setIsModalOpen(true);
     };
 
     const closeModal = () => {
     setIsModalOpen(false);
     };

     const openModal2 = () => {
          setIsModalOpen2(true);
     };
      
     const closeModal2 = () => {
          setIsModalOpen2(false);
     };

     const openModal3 = () => {
          setIsModalOpen3(true);
     };
      
     const closeModal3 = () => {
          setIsModalOpen3(false);
     };
     const openModal4 = () => {
          setIsModalOpen4(true);
     };
      
     const closeModal4 = () => {
          setIsModalOpen4(false);
     };


     const handleInputClick = () => {
          setUserNameError("");
          setPhoneNumberError("");
     }
     
     useEffect(() => {
            axios
            .get(`/user/info_detail?user_id=${user_id}`,{
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
               })
               .then((response) => {
                    console.log(response.data);
                    setUsers(response.data);
                    setUserId(response.data.id)
                    setUserName(response.data.name);
                    setUserPhone(response.data.phone_number);
                    setUserAccount(response.data.account);
                    setUserEmail(response.data.email);
                    setUserRoleId(response.data.role_id);
                    setIsLock(response.data.is_locked);
                    setInitUserName(response.data.name);
                    setInitUserPhone(response.data.phone_number);
               })
               .catch((error) => {
                    console.log(error);
               });
          }, []);

     //order_count
     useEffect(() => {
          axios
          .get(`/summary/order/count?user_id=${user_id}`)
          .then((response) => {
               console.log(response.data);
               setTotalOrder(response.data.total_order);
               setCancelOrder(response.data.cancel_order);
               setSuccessOrder(response.data.success_order);
               setPendingOrder(response.data.pending_order);
               setConfirmOrder(response.data.confirmed_order);
               setDeliveringOrder(response.data.delivering_order);
               setDeliveredOrder(response.data.delivered_order);
               setPendingRefundOrder(response.data.pending_refund_order);
               setRefundedOrder(response.data.refunded_order);
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);

     const handelUserName = (e) => {
          setUserName(e.target.value);
          if(!isValid){
               setIsValid(false);
               setUserNameError("");
          }
     }
     const handelPhoneNumber = (e) => {
          setUserPhone(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPhoneNumberError("");
          }
     }

     const updateUser = (e) => {
          e.preventDefault();
          setIsValid(true);
          if (!userName){
               setUserNameError("Nhập vào tên!")
               setIsValid(false);
          }
          if (!userPhone){
               setPhoneNumberError("Hãy nhập vào số điện thoại!")
               setIsValid(false);
          } 
          if (userPhone.length < 10 || userPhone.length > 11){
               setPhoneNumberError2("Số điện thoại nhập vào không đúng! (độ dài: 10)")
               setIsValid(false);
          }
          if (isValid){
          const data = {
               name: userName,
               phone_number: userPhone,
          }
          axios
               .put(`/user/admin/update?user_id=${user_id}`, data, {
                    headers: {
                         Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
               })
               .then((response) => {
                    console.log(response.data);
                    toast.success("Cập Nhật Người Dùng Thành CÔng!",{
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
                    }, 1500);
               })
               .catch((error) => {
                    console.log(error);
               });
          }else{
               console.log(userPhone.length);
               toast.error("Hãy Điền Đủ Các Thông Tin Cần Thiết",{
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
     }
               
     //block user
     const blockUser = () => {
          axios
          .delete(`/user/lock?user_id=${user_id}`,{
               headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
               },
          })
          .then((response) => {
               console.log(response.data);
               toast.success("Khóa Tài Khoản Thành Công!",{
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
                    {userRoleId === 99 ? window.location.href = "/admin/all_customer" 
                    : window.location.href = "/admin/all_employee"}
               }, 1500);
          })
          .catch((error) => {
               console.log(error);
               toast.error("Có Lỗi Đã Xảy Ra!",{
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
          });
     }

     //unblock user
     const unlockUser = () => {
          axios
          .get(`/user/unlock?user_id=${user_id}`,{
               headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
               },
          })
          .then((response) => {
               console.log(response.data);
               toast.success("Mở Khóa Tài Khoản Thành Công!",{
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
                    {userRoleId === 99 ? window.location.href = "/admin/all_customer" 
                    : window.location.href = "/admin/all_employee"}
               }, 1500);
          })
          .catch((error) => {
               console.log(error);
               toast.error("Có Lỗi Đã Xảy Ra!",{
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
               },500);
          });
     }

     //delete user
     const deleteUser = () => {
          axios
          .delete(`/user/delete/${user_id}`,{
               headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
               },
          })
          .then((response) => {
               console.log(response.data);
               console.log(response.data);
               toast.success("Mở Khóa Tài Khoản Thành Công!",{
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
                    {userRoleId === 99 ? window.location.href = "/admin/all_customer" 
                    : window.location.href = "/admin/all_employee"}
               }, 1500);
          })
          .catch((error) => {
               console.log(error);
               toast.error("Có Lỗi Đã Xảy Ra!",{
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
               },500);
          });
     }

    return(
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
               Chi Tiết Người Dùng: {userRoleId === 10 ? " Nhân Viên" : userRoleId === 99 ? " Khách Hàng" : userRoleId === 1 ? " Admin" : ""}
             </span>
             <span className="main__title-des">
                  DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
             </span>
        </div>

        <div className="main__form row">
               <div className="col-lg-4">
               <label className="form__product-delete-id-title">
                         ID Người Dùng: {userId}
               </label>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                         Tên Tài Khoản: {userAccount}
                    </label>
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                         Email: {userEmail}
                    </label>
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title d-flex flex-column">
                         Thông số đơn hàng : {totalOrder === 0 && ("chưa có đơn hàng nào")} 
                         {totalOrder !== 0 && (
                          <span> - Tổng số đơn hàng: {totalOrder}</span>
                         )}
                         {cancelOrder !== 0 && (
                          <span> - Số đơn đã hủy: {cancelOrder}</span>
                         )}
                         {pendingOrder !== 0 && (
                          <span> - Số đơn chờ xác nhận: {pendingOrder}</span>
                         )}
                         {confirmOrder !== 0 && (
                          <span> - Số đơn đã xác nhận: {confirmOrder}</span>
                         )}
                         {deliveringOrder !== 0 && (
                          <span> - Số đơn đang giao: {deliveringOrder}</span>
                         )}
                         {deliveredOrder !== 0 && (
                          <span> - Số đơn đã giao: {deliveredOrder}</span>
                         )}
                         {pendingRefundOrder !== 0 && (
                          <span> - Số đơn chờ hoàn hàng: {pendingRefundOrder}</span>
                         )}
                         {refundedOrder !== 0 && (
                          <span> - Số đơn đã hoàn hàng: {refundedOrder}</span>
                         )}
                          {successOrder !== 0 && (
                          <span> - Số đơn thành công: {successOrder}</span>
                         )}
                    </label>
               </div>
               </div>
               <div className="col-lg-4">
                    <div className="form__product-delete-id">
                         <label className="form__product-delete-id-title">
                              Tên Người Dùng: {initUserName === null ? "Not Set" : initUserName}
                         </label>
                         {userRoleId !== 99 && (
                              <input type="text" 
                                   className="form__delete-id-input" 
                                   placeholder="Enter UserName for update" 
                                   value={userName}
                                   onChange={handelUserName}
                                   onClick={handleInputClick}
                              />
                              )}
                              {userNameError && (
                                   <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                                        {userNameError}
                                   </div>
                              )}
                    </div>
                    <div className="form__product-delete-id">
                         <label className="form__product-delete-id-title">
                              Số Điện Thoại: {initUserPhone === null ? "Not Set" : initUserPhone}
                         </label>
                         {userRoleId !== 99 && (
                              <input type="text" 
                                   className="form__delete-id-input"
                                   placeholder="Enter User Phone Number for update (length = 10))" 
                                   value={userPhone}
                                   onChange={handelPhoneNumber}
                                   onClick={handleInputClick}
                              />
                         )}
                              {phoneNumberError && (
                                   <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>     
                                        {phoneNumberError}
                                   </div>
                              )}
                              {phoneNumberError2 && (
                                   <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>     
                                        {phoneNumberError2}
                                   </div>
                              )}
                    </div>
               </div>

               <div className="col-lg-12 d-flex align-items-center">
                    {userRoleId == 99 && (
                    <div class="form__category-check">
                         <Link to="/admin/all_customer" >
                         <button class="form__category-btn form__input-btn me-6">
                         <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                   Trở về
                         </button>
                         </Link>
                    </div>
                    )}
                    {userRoleId !== 99 && (
                    <div class="form__category-check">
                         <Link to="/admin/all_employee" >
                         <button class="form__category-btn form__input-btn me-6">
                         <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                   Trở về
                         </button>
                         </Link>
                    </div>
                    )}
                    
                    {userRoleId !== 99 && ( 
                    <div className="form__category-check me-6">
                         <button className="form__category-btn form__input-btn"
                              onClick={openModal}
                         >
                              Cập Nhật
                         </button>

                    </div>
                    )}
                    {isLock === 99 && (
                    <div className="form__category-check me-6">
                         <button className="form__category-btn form__input-btn"
                              onClick={openModal2}
                         >
                             Khóa Tài Khoản
                         </button>
                    </div>
                    )}
                    {isLock === 1 && (
                    <div className="form__category-check me-6">
                         <button className="form__category-btn form__input-btn"
                              onClick={openModal3}
                         >
                            Mở Khóa Tài Khoản
                         </button>
                    </div>  
                    )}  
                    {userRoleId !== 99 && (
                         <div className="form__category-check me-6">
                              <button className="form__category-btn form__input-btn"
                                   onClick={openModal4}
                              >
                                   Xóa Tài Khoản
                            </button>
                         </div>  
                    )}
               </div>
        </div>
          <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn Muốn Cập Nhật Người Dùng Này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={updateUser}>
                     Đúng
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal}>
                         Không
                    </button>
                </div>
                </div>
          </ReactModal>
          <ReactModal isOpen={isModalOpen2} onRequestClose={closeModal2} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn Muốn Khóa Tài Khoản Người Dùng Này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={blockUser}>
                         Đúng 
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal2}>
                         Không
                    </button>
                </div>
                </div>
            </ReactModal>
            <ReactModal isOpen={isModalOpen3} onRequestClose={closeModal3} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn Muốn Mở Khóa Tài Khoản Người Dùng Này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={unlockUser}>
                         Đúng 
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal3}>
                         Không
                    </button>
                </div>
                </div>
            </ReactModal>            
            <ReactModal isOpen={isModalOpen4} onRequestClose={closeModal4} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn Muốn Xóa Tài Khoản Người Dùng Này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={deleteUser}>
                         Đúng 
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal4}>
                         Không
                    </button>
                </div>
                </div>
            </ReactModal>
        </div>
     </Authorized>
    );
}

export default EmployeeDetails;