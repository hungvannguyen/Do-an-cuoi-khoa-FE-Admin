import "../Styles/css/allCss.css"
import "../Styles/image/hcv.png"
import { useState, useEffect,  } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img2 from "../Styles/image/hcb.png"
import img from "../Styles/image/hcv.png"
import img3 from "../Styles/image/hcd.png"


function Dashboard (){
     //total order
     const [mode, setMode] = useState(0);
     const [year, setYear] = useState(2023);
     const [yearValue, setYearValue] = useState('');
     const [totalOrder, setTotalOrder] = useState("");
     const [cancelOrder, setCancelOrder] = useState("");
     const [pendingOrder, setPendingOrder] = useState("");
     const [comfirmOrder, setComfirmOrder] = useState("");
     const [refundedOrder, setRefundedOrder] = useState("");
     const [successOrder, setSuccessOrder] = useState("");
     const [pendingRefundOrder, setPendingRefundOrder] = useState("");

     //total income
     const [totalIncome, setTotalIncome] = useState("");
     const [totalProfit, setTotalProfit] = useState("");

     //top customer
     const [topCustomer, setTopCustomer] = useState([]);

     //low quantity product
     const [imageProduct, setImageProduct] = useState([]);
     const [lowQuantityProduct, setLowQuantityProduct] = useState([]);

     //order count
     useEffect(() => {
          let apiEndpoint = `/summary/order_count?mode=${mode}`;
          if (year !== null){
               apiEndpoint += `&year=${year}`;
          }

          axios
          .get(apiEndpoint)
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
     }, [mode, year]);
     //total income
     useEffect(() => {
          let apiEndpoint = `/summary/total_income?mode=${mode}`;
          if (year !== null){
               apiEndpoint += `&year=${year}`;
          }

          axios
          .get(apiEndpoint)
          .then((response) => {
               console.log(response.data);
               setTotalIncome(response.data.total_income);
               setTotalProfit(response.data.total_profit);
          })
          .catch((error) => {
               console.log(error);
          });
     }, [mode, year]);
     //top 3 customẻ
     useEffect(() => {
          axios
          .get(`/summary/top_customer`)
          .then((response) => {
               console.log(response.data);   
               setTopCustomer(response.data.data);
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);
     //low quantity product
     useEffect(() => {
          axios
          .get(`/summary/low_quantity`)
          .then((response) => {
               console.log(response.data);
               setLowQuantityProduct(response.data.data);

               const imagePromises = response.data.data.map((product) =>
                    axios.get(`/file/img/${product.img_url}`, {responseType: 'blob'})
               );
               Promise.all(imagePromises).then((responses) => {
                    const imageUrls = responses.map((response) =>
                    URL.createObjectURL(response.data)
                    );
                    setImageProduct((prevImageProduct) => [
                    ...imageUrls,
                    ]);
               })
               .catch((error) => {
                    console.log(error);
               });
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);

     const formatNumber = (number) => {
          if (number) {
            return new Intl.NumberFormat("vi-VN").format(number);
          }
          return "0";
     };

     const handlePendingOrderClick = () => {
          window.location.href = "/admin/all_order?status=0";
     };

     const handlePendingRefundOrderClick = () => {
          window.location.href = "/admin/all_order?status=49";
     };

     const handleMountChange = (event) => {
          const selectedMonth = event.target.value;
          setMode(Number(selectedMonth));
     };
     const handleYearChange = (event) => {
          const selectedYear = event.target.value;
          setYear(Number(selectedYear));
     };
      


    return(
        <div class="main">
          <div class="home__features d-flex justify-content-start">
               <div class="home__features-tabs  ">
               <span className="form__sort-text">Thông số theo tháng: </span>
                    <select
                    value={mode.toString()} // Convert to string to match option value type
                    onChange={handleMountChange}
                    className="form__sellect-sort me-3"
                    >
                    <option value="0">Tháng hiện tại</option>
                    <option value="1">Quý 1</option>
                    <option value="2">Quý 2</option>
                    <option value="3">Quý 3</option>
                    <option value="4">Quý 4</option>
                    <option value="5">Cả Năm</option>
                    </select>
               </div>
               <div class="home__features-order">
                    <div class="home__features-order-item">
                    <span className="form__sort-text">Năm: </span>
                    <select
                    value={year.toString()} // Convert to string to match option value type
                    onChange={handleYearChange}
                    className="form__sellect-sort me-3"
                    >
                    <option value="2023">Năm 2023</option>
                    <option value="2022">Năm 2022</option>
                    <option value="2021">Năm 2021</option>
                    </select>
               </div>

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
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Tổng Lợi Nhuận
                         </span>
                         <span class="home__statitics-item-number">
                              {formatNumber(totalProfit)} VNĐ
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Tổng Số Lượng Đơn Hàng
                         </span>
                         <span class="home__statitics-item-number">
                              {totalOrder}
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số lượng Đơn Hàng Thành Công
                         </span>
                         <span class="home__statitics-item-number">
                              {successOrder}
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số Lượng Đơn Hàng Bị Hủy
                         </span>
                         <span class="home__statitics-item-number">
                              {cancelOrder}
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Số Lượng Đơn Bị Trả Lại
                         </span>
                         <span class="home__statitics-item-number">
                              {refundedOrder}
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
                         <div class="table__request-head mb-3">
                              <div class="table__request-title">
                                   <span class="table__request-title-text">
                                        Các sản phẩm có số lượng ít nhất trong cửa hàng
                                   </span>
                              </div>
                         </div>
                         {lowQuantityProduct && lowQuantityProduct.map((product, index) => (
                              <div class="product-list d-flex align-items-center justify-content-between mb-6 row">
                                   <div class="form__category-des col-lg-2">
                                   <label class="form__category-id-title">
                                        Sản phẩm: <p style={{ visibility: 'hidden' }}></p>{product.name}
                                   </label>
                                   </div>
                                   {imageProduct[index] && (
                                   <div class="form__category-des col-lg-2">
                                        <img src={imageProduct[index]} width="100px" alt={`Product Image ${index}`}>
                                        </img>
                                   </div>
                                   )}
                                   <div class="form__category-des col-lg-2">
                                   <label class="form__category-id-title">
                                        Giá:<p style={{ visibility: 'hidden' }}></p> {formatNumber(product.sale_price)} VNĐ
                                   </label>
                                   </div>
                                   <div class="form__category-des col-lg-2">
                                   <label class="form__category-id-title">
                                        Số lượng: {product.quantity}
                                   </label>
                                   <label class="form__category-id-title">
                                        Giảm giá: {product.is_sale === 99 ? "Không Giảm Giá" :  product.sale_percent + " %"}
                                   </label>
                                   </div>
                                   <div class="form__category-des col-lg-2">
                                        <button className="btn-edit">
                                             <Link to={`/admin/product_details/${product.id}`} className="btn-text">
                                                  Chi Tiết
                                             </Link>
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>

               </div>
               
               <div class="home__table__right col-lg-12">
                    <div class="table__top">
                         <div class="table__top-title" style={{width:"500px"}}>
                              Top Chi Tiêu 
                         </div>
                         <div class="table__top-main">
                              {topCustomer.map((customer, index) => (
                              <div class="table__top-list" key={index}>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             {customer.stt === 1 && (
                                             <img src={img} alt="" class="table__top-img"/>
                                             )}
                                             {customer.stt === 2 && (
                                                  <img src={img2} alt="" class="table__top-img"/>
                                             )}
                                             {customer.stt === 3 && (
                                             <img src={img3} alt="" class="table__top-img"/>
                                             )}
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  {customer.name}
                                             </p>
                                             <p class="table__top-name-number">
                                                  {formatNumber(customer.total_price)} VNĐ
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  {customer.total_order} Đơn
                                             </span>
                                        </div>
                                   </div>
                              </div>
                              ))}
                         </div>
                    </div>
               </div>
               </div>
          </div>
     </div>
    );
}

export default Dashboard;