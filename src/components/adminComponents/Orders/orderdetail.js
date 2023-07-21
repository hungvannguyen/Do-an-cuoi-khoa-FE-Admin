import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactModal from 'react-modal';

function OrderDetail() {
    const {order_id} = useParams();

    const [products, setProducts] = useState("");
    const [imageProduct, setImageProduct] = useState([]);

    //data order
    const [orderId, setOrderId] = useState("");
    const [orderTotalPrice, setOderTotalPrice] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [orderNote, setOrderNote] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderPaymentId, setOrderPaymentId] = useState("");
    const [orderPaymentType, setOrderPaymentType] = useState("");
    const [orderPaymentTypeId, setOrderPaymentTypeId] = useState("");
    const [orderPaymentStatus, setOrderPaymentStatus] = useState("");
    const [orderPaymentBankCode, setOrderPaymentBankCode] = useState("");
    const [orderDate, setOrderDate] = useState("");

    //update order status
    const [orderStatusUpdate, setOrderStatusUpdate] = useState("");



    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false)
    
    const handleStatusChange = (e) => {
        setOrderStatusUpdate(e.target.value);
    };



    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
      };

    //get id from url
    useEffect(() => {
        axios
        .get(`/order/info/${order_id}`,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data);
            setProducts(response.data.products);
            setOrderId(response.data.id);
            setOderTotalPrice(response.data.total_price);
            setUserName(response.data.name);
            setPhoneNumber(response.data.phone_number);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setOrderNote(response.data.note);
            setOrderStatus(response.data.status);
            setOrderPaymentId(response.data.payment_id);
            setOrderPaymentType(response.data.payment_type);
            setOrderPaymentTypeId(response.data.payment_type_id);
            setOrderPaymentStatus(response.data.payment_status);
            setOrderPaymentBankCode(response.data.bankCode);
            setOrderDate(response.data.insert_at);
            

                // Api get image product
                const imagePromises = response.data.products.map((product) =>
                axios.get(`/file/img/${product.img_url}`, { responseType: "blob" })
                );
                Promise.all(imagePromises)
                .then((responses) => {
                    const imageUrls = responses.map((response) =>
                    URL.createObjectURL(response.data)
                    );
                    setImageProduct((prevImageProduct) => [
                    ...prevImageProduct,
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

    const statusMapping = {
        0: {color: "#8D8D8D", text: "Chờ Xác Nhận"},
        1: {color: "#c69600", text: "Đã Xác Nhận"},
        2: {color: "#00bcdd", text: "Đang Vận Chuyển"},
        10: {color: "#001bc6", text: "Đã Giao Hàng"},
        100: {color: "#00dd00", text: "Hoàn Thành"},
        50: {color: "#af3a94", text: "Hoàn Hàng"},
        99:{color: "red", text: "Hủy Đơn Hàng"},
        49: {color: "#9b6432", text: "Yêu Cầu Hoàn Hàng"},
    };
    const statusInfo = statusMapping[orderStatus] || { color: "black", text: "" };

    //update order status
    const updateOrderStatus = () => {
        axios
        .get(`/order/update?order_status=${orderStatusUpdate}&order_id=${order_id}`,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.data);
            toast.success("Update order status successfully!",{
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
                window.location.href = "/admin/all_order";
           }, 1500);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong!",{
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
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setOrderStatusUpdate("");
    };

    const openModal2 =() => {
        setIsModalOpen2(true)
    }

    const closeModal2 = () => {
        setIsModalOpen2(false);
    }

    const updatePaymentStatus = () => {
        axios
        .get(`/payment/update/cod?payment_id=${orderPaymentId}`,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.data);
            toast.success("Update order status successfully!",{
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
                window.location.href = "/admin/all_order";
           }, 1500);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong!",{
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
    };
 

    return(
    <div class="main">
          <ToastContainer 
          style={{
               width: "400px",
               fontSize: "18px",
          }} 
          />
        <div class="main__title">
            <span class="main__title-text">
                Chi Tiết Đơn Hàng
            </span>
            <span class="main__title-des">
                DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
            </span>
        </div>
        <div class="main__form row">
            
          

            <div class="col-lg-4" >
                <label class="form__category-id-title fs-1 mb-2">
                      Thông tin khách hàng
                </label>
                <div class="form__category-des">
                    <label class="form__category-id-title">
                             ID đơn hàng: {orderId}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Trạng thái: <span style={{color: statusInfo.color}}> {statusInfo.text}</span> 
                    </label>
                </div>
                <div class="form__category-des">
                    <label class="form__category-name-title">
                        Tên người đặt hàng: {userName}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-name-input" class="form__category-name-title">
                        Số điện thoại: {phoneNumber}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Email: {email === "" ? "(Customers don't have email)" : email}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Địa chỉ: {address}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Ghi chú: {orderNote === "" ? "(khách hàng không để lại ghi chú!)" : orderNote}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Phương thức thanh toán: {orderPaymentType}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" 
                        class="form__category-des-title"
                          
                    >
                        Trạng thái thanh toán: {orderPaymentStatus === 0 ? "Paid" : "Unpaid"}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Tổng tiền: {formatNumber(orderTotalPrice)} VND
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Thời gian đặt hàng: {orderDate}
                    </label>
                </div>
            </div>
            <div class="col-lg-7">
                <label class="form__category-id-title fs-1 mb-2">
                        Thông tin đơn hàng
                </label>
                
            {products && products.map((product, index) => (
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
                            Giá:<p style={{ visibility: 'hidden' }}></p> {formatNumber(product.price)} VNĐ
                        </label>
                    </div>
                    <div class="form__category-des col-lg-2">
                        <label class="form__category-id-title">
                            Số lượng: {product.quantity}
                        </label>
                    </div>
                    <div class="form__category-des col-lg-2">
                        <label class="form__category-id-title">
                            Tổng tiền: {formatNumber(product.total_price)} VNĐ
                        </label>
                    </div>
                </div>
                    ))}
           
            </div>
            <div class="form__category-check col-lg-12 d-flex align-items-center ">
                <div class="form__category-check">
                    <Link to="/admin/all_order" >
                        <button class="form__category-btn form__input-btn me-6">
                        <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                Trở về
                        </button>
                    </Link>
                </div>
                {orderPaymentTypeId === 2 && orderStatus === 0 && (
                    <div class="form__category-check">
                        <button class="form__category-btn form__input-btn me-6"
                        value={1} 
                        onClick={(e) =>{ handleStatusChange(e); openModal();}}
                        >
                                Xác nhận đơn hàng
                        </button>
                    </div>
                )}
                { orderStatus === 1 && (
                     <div class="form__category-check">
                     <button class="form__category-btn form__input-btn me-6 " 
                        value={2}
                        onClick={(e) =>{ handleStatusChange(e); openModal();}}
                     >
                                Đang giao hàng
                     </button>
                 </div>
                )}
                { orderStatus === 2 && (
                    <div class="form__category-check">
                        <button class="form__category-btn form__input-btn me-6"
                        value={10} 
                        onClick={(e) =>{ handleStatusChange(e); openModal();}}
                        >
                                Đã giao hàng
                        </button>
                    </div>
                )}
                {orderStatus === 0 && (
                    <div class="form__category-check">
                        <button class="form__category-btn form__input-btn me-6" 
                        value={99}
                        onClick={(e) =>{ handleStatusChange(e); openModal();}}
                        >
                                Hủy đơn
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
                    Bạn muốn cập nhật trạng thái đơn hàng?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" value={setOrderStatusUpdate} onClick={updateOrderStatus}>
                         Có
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
                    Are you sure you want to update the order?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={updatePaymentStatus}>
                         Yes
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal2}>
                         No
                    </button>
                </div>
                </div>
        </ReactModal>
    </div>
    );
}

export default OrderDetail;

