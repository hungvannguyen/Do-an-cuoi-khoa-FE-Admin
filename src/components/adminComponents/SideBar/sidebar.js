import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

function Sidebar  () {
//   useEffect(() => {
//     // JavaScript code for sidebar interactions
//     const featureBtn = document.querySelectorAll('.features__item');
//     const func = document.querySelectorAll('.features__item-func');
//     const arrow = document.querySelectorAll('.features__item-main-arrow');

//     featureBtn.forEach((item, index) => {
//       item.addEventListener('click', () => {
//         featureBtn.forEach((tg) => {
//           tg.classList.remove('features__item--selected');
//         });
//         func.forEach((tg) => {
//           tg.style.display = null;
//         });
//         arrow.forEach((tg) => {
//           tg.classList.remove('arrow-animation');
//         });

//         item.classList.add('features__item--selected');
//         arrow[index].classList.add('arrow-animation');
//         func[index - 1].style.display = 'block';
//         item.style.borderTopRightRadius = '16px';
//         item.style.borderBottomRightRadius = '16px';
//       });
//     });

//     const searchBtn = document.querySelector('.header__search-icon');

//     searchBtn.addEventListener('click', () => {
//       const searchInput = document.querySelector('.header__search-input');
//       searchInput.style.display = 'block';
//       searchInput.parentElement.classList.add('header__search--active');
//     });
//   }, []);

     let hasSessionData = sessionStorage.getItem("token") !== null;
    //Logout    
    const handleLogout = () => {
     sessionStorage.removeItem("token");
     hasSessionData = false;
     window.location.href = "http://localhost:3000/";
 };

  return (
    <div className="sidebar">
            <div className="sidebar">
        {     <div className="sidebar">
          <div className="sidebar__logo">
               <Link to="/admin/" className="sidebar__logo-link">
                    <img src="../image/logo/logo_main.png" alt="" className="sidebar__logo-img" />
               </Link>
          </div>
          <div className="sidebar__features">
               <div className="features__item">
                    <Link to="/admin/dashboard" className="features__item-main">
                         <i className="far fa-chart-bar features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Dashboard
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
                    <div className="features__item-main">
                         <i className="fas fa-compress features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Danh Mục
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
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
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-gem features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Sản Phẩm
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow "></i>
                    </div>
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
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-sticky-note features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Đơn Hàng
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_order">
                                        Tất Cả Đơn Hàng
                                   </Link>
                              </li>
                         </ul>
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_order">
                                        Add Order
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-user features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Nhân Viên
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
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
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-user-circle features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Khách Hàng
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_customer">
                                        Danh Sách Khách Hàng
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
               <div className="features__item-main">
                    <i className="fa-solid fa-right-from-bracket features__item-main-icon"></i>
                         <span className="features__item-main-text" onClick={handleLogout}>
                              Đăng Xuất
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
               </div>
          </div>
     </div>}
      </div>
    </div>
  );
};

export default Sidebar;
