import "../Styles/css/allCss.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Dashboard (){
     const navigate = useNavigate();
     const [orderStatus, setOrderStatus] = useState();

     const [month, setMonth] = useState(1);
     const [totalOrder, setTotalOrder] = useState("");
     const [cancelOrder, setCancelOrder] = useState("");
     const [pendingOrder, setPendingOrder] = useState("");
     const [comfirmOrder, setComfirmOrder] = useState("");
     const [refundedOrder, setRefundedOrder] = useState("");
     const [successOrder, setSuccessOrder] = useState("");
     const [pendingRefundOrder, setPendingRefundOrder] = useState("");


     const [totalIncome, setTotalIncome] = useState("");
     const [totalProfit, setTotalProfit] = useState("");



     useEffect(() => {
          axios
          .get(`/summary/order_count?month_count=${month}`)
          .then((response) => {
               console.log(response.data);
               setTotalOrder(response.data.total_order);
               setCancelOrder(response.data.cancel_order);
               setPendingOrder(response.data.pending_order);
               setComfirmOrder(response.data.comfirm_order);
               setRefundedOrder(response.data.refunded_order);
               setSuccessOrder(response.data.success_order);
               setPendingRefundOrder(response.data.pending_refund_order);
          })
          .catch((error) => {
               console.log(error);
              
          });
     }, [month]);

     useEffect(() => {
          axios
          .get(`/summary/total_income?month_count=${month}`)
          .then((response) => {
               console.log(response.data);
               setTotalIncome(response.data.total_income);
               setTotalProfit(response.data.total_profit);
          })
          .catch((error) => {
               console.log(error);
          });
     }, [month]);


     const formatNumber = (number) => {
          if (number) {
            return new Intl.NumberFormat("vi-VN").format(number);
          }
          return "";
     };

     const handlePendingOrderClick = () => {
          window.location.href = "/admin/all_order?status=0";
     };

     const handlePendingRefundOrderClick = () => {
          window.location.href = "/admin/all_order?status=49";
     };


    return(
        <div class="main">
          <div class="home__features">
               <div class="home__features-tabs">
                    <ul class="home__features-tab-list">
                         <li class="home__features-tab-list-item home__features-tab-list-item--line home__features-tab-list-item--selected">
                              Overview
                         </li>
                         <li class="home__features-tab-list-item home__features-tab-list-item--line">
                              Audiences
                         </li>
                         <li class="home__features-tab-list-item home__features-tab-list-item--line">
                              Demographics
                         </li>
                         <li class="home__features-tab-list-item">
                              More
                         </li>
                    </ul>
               </div>
               <div class="home__features-community">
                    <button class="home__features-btn">
                         <i class="home__features-icon fas fa-share-alt"></i>
                         <span class="home features-btn-text">
                              Share
                         </span>
                    </button>
                    <button class="home__features-btn">
                         <i class="home__features-icon fas fa-print"></i>
                         <span class="home features-btn-text">
                              Print
                         </span>
                    </button>
                    <button class="home__features-btn home__features-btn--bold">
                         <i class="home__features-icon fas fa-file-export"></i>
                         <span class="home features-btn-text">
                              Export
                         </span>
                    </button>
               </div>
          </div>
          <div class="home__statitics">
               <ul class="home__statitics-list">
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Tổng Doanh Thu
                         </span>
                         <span class="home__statitics-item-number">
                              {formatNumber(totalIncome)} VNĐ
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -0.5%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Tổng Lợi Nhuận
                         </span>
                         <span class="home__statitics-item-number">
                              {formatNumber(totalProfit)} VNĐ
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.1%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Tổng Số Lượng Đơn Hàng
                         </span>
                         <span class="home__statitics-item-number">
                              {totalOrder}
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -8.3%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số lượng Đơn Hàng Thành Công
                         </span>
                         <span class="home__statitics-item-number">
                              {successOrder}
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.2%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số Lượng Đơn Hàng Bị Hủy
                         </span>
                         <span class="home__statitics-item-number">
                              {cancelOrder}
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -8.3%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số Lượng Đơn Bị Trả Lại
                         </span>
                         <span class="home__statitics-item-number">
                              {refundedOrder}
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.2%
                         </span>
                    </li>
                    
               </ul>
          </div>
          <div class="home__table">
               <div class="row">
               <div class="home__table--left col-lg-6 row">
                    <div class="table__request col-lg-5" style={{height:"120px"}}>
                         <div class="col-lg-12 row">
                              <div class="table__request-head col-lg-12 row">
                                   <div class="table__request-title col-lg-12 mb-3">
                                        <span class="table__request-title-text">
                                             Số Đơn Chờ Xác Nhận: {pendingOrder}
                                        </span>
                                   </div>
                                   <div class="table__request-button col-lg-12">
                                        <button class="table__request-button-btn"
                                             onClick={handlePendingOrderClick}
                                        >
                                             <span class="table__request-btn-text">
                                                  Chuyển tới Trang
                                             </span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="col-lg-1"  style={{height:"100px"}}></div>
                    <div class="table__request col-lg-5"  style={{height:"120px"}}>
                         <div class="col-lg-12 row">
                              <div class="table__request-head col-lg-12 row">
                                   <div class="table__request-title col-lg-12 mb-3">
                                        <span class="table__request-title-text">
                                             Số Đơn Hàng Chờ Hoàn Trả: {pendingRefundOrder}
                                        </span>
                                   </div>
                                   <div class="table__request-button col-lg-12">
                                        <button class="table__request-button-btn"
                                             onClick={handlePendingRefundOrderClick}
                                        >
                                             <span class="table__request-btn-text">
                                                  Chuyển tới Trang
                                             </span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="table__request">
                         <div class="table__request-head">
                              <div class="table__request-title">
                                   <span class="table__request-title-text">
                                        Pending Requests
                                   </span>
                                   <span class="table__request-title-des">
                                        You have 50+ new requests
                                   </span>
                              </div>
                              <div class="table__request-button">
                                   <button class="table__request-button-btn">
                                        <i class="fas fa-user-plus table__request-btn-icon"></i>
                                        <span class="table__request-btn-text">
                                             Add new member
                                        </span>
                                   </button>
                              </div>
                         </div>
                    </div>

               </div>
               
               <div class="home__table__right col-lg-12">
                    <div class="table__top">
                         <div class="table__top-title" style={{width:"500px"}}>
                              Top Performer
                         </div>
                         <div class="table__top-main">
                              <div class="table__top-list">
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face1.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Brandon Washington
                                             </p>
                                             <p class="table__top-name-number">
                                                  162543
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face14.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Matthew Bailey
                                             </p>
                                             <p class="table__top-name-number">
                                                  152571
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face10.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Rafell John
                                             </p>
                                             <p class="table__top-name-number">
                                                  132549
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face12.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Katherine Bitler
                                             </p>
                                             <p class="table__top-name-number">
                                                  122743
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               </div>
          </div>
     </div>
    );
}

export default Dashboard;