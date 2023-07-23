import axios from 'axios';
import React, { useEffect, useState  } from 'react';
import {Link} from 'react-router-dom';

function Sidebar  () {
     const [expandedItems, setExpandedItems] = useState({});
     const [logo, setLogo] = useState("");
     let hasSessionData = sessionStorage.getItem("token") !== null;
     // Logout
     const handleLogout = () => {
          sessionStorage.removeItem('token');
          setExpandedItems((prevState) => ({
          ...prevState,
          'features__item-main': false, // Collapse the item when logging out
          }));
          window.location.href = 'http://localhost:3000/';
     };
 

     useEffect(() => {
          // When the component mounts, check sessionStorage for token and set the initial expanded state
          const hasSessionData = sessionStorage.getItem('token') !== null;
          setExpandedItems((prevState) => ({
            ...prevState,
            'features__item-main': hasSessionData, // You can set any default expanded state you want here
          }));
        }, []);

       // Function to toggle expansion for an item
     const toggleExpansion = (itemName) => {
          setExpandedItems((prevState) => ({
          ...prevState,
          [itemName]: !prevState[itemName],
          }));
     }; 

  // call API get logo
  useEffect(() => {
     axios
       .get("/file/img/DHS_Logo_main_1.png", { responseType: "blob" })
       .then((response) => {
         setLogo((logo) => [...logo, URL.createObjectURL(response.data)]);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
     
  return (
    <div className="sidebar">
            <div className="sidebar">
        {     <div className="sidebar">
          <div className="sidebar__logo">
               <Link to="/admin/dashboard" className="sidebar__logo-link">
                    <img src={logo} alt="" className="sidebar__logo-img" />
               </Link>
          </div>
          <div className="sidebar__features">
               <div className="features__item">
                    <Link to="/admin/dashboard" className="features__item-main">
                         <i className="far fa-chart-bar features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Trang Chủ
                         </span>
                         
                    </Link>
               </div>
               <div className="features__item">
                    <Link to="/admin/client_setting" className="features__item-main">
                         <i className="fa-solid fa-gear features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Cài Đặt Trang Client
                         </span>
                         
                    </Link>
               </div>
               <div className="features__item">
                    <div className="features__item-main"
                          onClick={() => toggleExpansion('features__item-category')}
                    >
                         <i className="fas fa-compress features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Danh Mục
                         </span>
                         <i  className={`fas ${
                                   expandedItems['features__item-category'] ? 'fa-angle-down' : 'fa-angle-right'
                              } features__item-main-arrow`}
                         ></i>
                    </div>
                    {expandedItems['features__item-category'] && (
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_category">
                                        Tất Cả Danh Mục
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_category">
                                        Thêm Mới Danh Mục
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    )}
               </div>
               <div className="features__item">
                    <div className="features__item-main"
                         onClick={() => toggleExpansion('features__item-product')}
                    >
                         <i className="far fa-gem features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Sản Phẩm
                         </span>
                         <i  className={`fas ${
                                   expandedItems['features__item-product'] ? 'fa-angle-down' : 'fa-angle-right'
                              } features__item-main-arrow`}
                         ></i>
                    </div>
                    {expandedItems['features__item-product'] && (
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_product">
                                        Tất Cả Sản Phẩm
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_product">
                                       Tạo Sản Phẩm
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/import_product">
                                       Nhập Hàng
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    )}
               </div>
               <div className="features__item">
                    <div className="features__item-main"
                         onClick={() => toggleExpansion('features__item-order')}
                    >
                         <i className="far fa-sticky-note features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Đơn Hàng
                         </span>
                         <i  className={`fas ${
                                   expandedItems['features__item-order'] ? 'fa-angle-down' : 'fa-angle-right'
                              } features__item-main-arrow`}
                         ></i>
                    </div>
                    {expandedItems['features__item-order'] && (
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_order">
                                        Tất Cả Đơn Hàng
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_order">
                                        Thêm Đơn Hàng
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    )}
               </div>
               <div className="features__item">
                    <div className="features__item-main"
                         onClick={() => toggleExpansion('features__item-employee')}
                    >
                         <i className="far fa-user features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Nhân Viên
                         </span>
                         <i  className={`fas ${
                                   expandedItems['features__item-employee'] ? 'fa-angle-down' : 'fa-angle-right'
                              } features__item-main-arrow`}
                         ></i>
                    </div>
                    {expandedItems['features__item-employee'] && (
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_employee">
                                        Tất Cả Nhân Viên
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_employee">
                                        Thêm Mới Nhân Viên
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    )}
               </div>
               <div className="features__item">
                    <div className="features__item-main"
                         onClick={() => toggleExpansion('features__item-customer')}
                    >
                         <i className="far fa-user-circle features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Khách Hàng
                         </span>
                         <i  className={`fas ${
                                   expandedItems['features__item-customer'] ? 'fa-angle-down' : 'fa-angle-right'
                              } features__item-main-arrow`}
                         ></i>
                    </div>
                    {expandedItems['features__item-customer'] && (
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_customer">
                                        Danh Sách Khách Hàng
                                   </Link>
                              </li>
                         </ul>
                    </div>
                    )}
               </div>
               <div className="features__item">
                    <Link to="/admin/log" className="features__item-main">
                         <i class="fa-solid fa-clock-rotate-left features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Lịch Sử Chỉnh Sửa
                         </span>
                    </Link>
               </div>
               <div className="features__item">
               <div className="features__item-main">
                    <i className="fa-solid fa-right-from-bracket features__item-main-icon"></i>
                         <span className="features__item-main-text" onClick={handleLogout}>
                              Đăng Xuất
                         </span>
                    </div>
               </div>
          </div>
     </div>}
      </div>
    </div>
  );
};

export default Sidebar;
