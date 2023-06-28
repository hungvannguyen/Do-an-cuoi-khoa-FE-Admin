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
                    <div className="features__item-main">
                         <i className="fas fa-compress features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Category
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_category">
                                        All Category
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_category">
                                        Add Category
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-gem features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Product
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow "></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_product">
                                        All Product
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_product">
                                        Add Product
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-sticky-note features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Order
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_order">
                                        All Order
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-user features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Employee
                         </span>
                         <i className="fas fa-angle-right features__item-main-arrow"></i>
                    </div>
                    <div className="features__item-func">
                         <ul className="features__item-func-list">
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/all_employee">
                                        All Employee
                                   </Link>
                              </li>
                              <li className="features__item-func-list-item">
                                   <Link to="/admin/add_employee">
                                        Add Employee
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
               <div className="features__item">
                    <div className="features__item-main">
                         <i className="far fa-user-circle features__item-main-icon"></i>
                         <span className="features__item-main-text">
                              Customer
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
