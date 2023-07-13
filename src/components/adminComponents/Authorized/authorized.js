import React from "react";
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';



const hasPermission = (user, allowedRoles) => {
    return allowedRoles.includes(user);
  };
  
  const withAuthorization = ({ user, allowedRoles, children }) => {
    // Kiểm tra xem vai trò của người dùng có trong danh sách vai trò được phép không
    const userHasPermission = hasPermission(user, allowedRoles);
  
    if (userHasPermission) {
      // Hiển thị nội dung cho người dùng có quyền truy cập
      return <>{children}</>;
    } else {
      // Hiển thị thông báo hoặc điều hướng đến trang lỗi quyền truy cập
      return(
        <div className="main">
            <ReactModal isOpen={true} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn Không Có Quyền Truy Cập Vào Trang Này!  
                </h2>
                <div className="d-flex flex-column ">
                    <button className="btn-edit">
                        <Link to={`/admin/dashboard`} className="btn-text">
                            Trở Lại Trang Chủ
                        </Link>
                    </button>
                </div>
                </div>
            </ReactModal>
        </div>
      );
    }
  };

export default withAuthorization;