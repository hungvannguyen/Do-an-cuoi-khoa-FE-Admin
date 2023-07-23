import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddOrder(){

    const handleMoveToPage = () => {
        const token = sessionStorage.getItem("token");
        const id = sessionStorage.getItem("role_id");
        const url = `http://localhost:3000/?token=${token}&role_id=${id}`;
        window.location.href = url;
    }

    return(
        <div className="main">
        <ToastContainer 
            style={{
                width: "400px",
                fontSize: "18px",
            }} 
        />
            <div className="main__title">
                <span className="main__title-text">
                    Thêm đơn hàng
                </span>
                <span className="main__title-des">
                    Thêm các đơn hàng cho khách mua tại cửa hàng.
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                    <label className="form__product-id-title fs-21">
                        Di Chuyển Tới Trang Cửa Hàng
                    </label>
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                        onClick={handleMoveToPage}
                    >
                        Chuyển Tới
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
    </div>
    );
}

export default AddOrder;