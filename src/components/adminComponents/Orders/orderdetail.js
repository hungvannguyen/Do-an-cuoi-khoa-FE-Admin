import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function OrderDetail() {
    const {order_id} = useParams();

    const [products, setProducts] = useState("");
    const [orders, setOrders] = useState([]);
    const [imageProduct, setImageProduct] = useState([]);




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
            setOrders(response.data.data);
            console.log(response.data.products);
            setProducts(response.data.products);
            console.log(orders);
            // api get image product
           
                const imagePromises = response.data.products.map((product) =>
                  axios.get(`/file/img/${product.img_url}`, { responseType: "blob" })
                );
                Promise.all(imagePromises)
                  .then((responses) => {
                    const imageUrls = responses.map((response) =>
                      URL.createObjectURL(response.data)
                    );
                    setImageProduct(imageUrls);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            })
        .catch((error) => {
            console.log(error);
        });
    }, []);

 

    return(
    <div class="main">
        <div class="main__title">
            <span class="main__title-text">
                Order Detail
            </span>
            <span class="main__title-des">
                DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
            </span>
        </div>
        <div class="main__form row">
            {order_id.length >0 ? (
                <>
            {orders.map((item, index) => (
                
            <div class="col-lg-4" key={index}>
                <label class="form__category-id-title fs-1 mb-2">
                        Customer Infor
                </label>
                <div class="form__category-des">
                    <label class="form__category-id-title">
                            Order ID: {item.prd_id}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Status: {item.status}
                    </label>
                </div>
                <div class="form__category-des">
                    <label class="form__category-name-title">
                        Name: {item.name}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-name-input" class="form__category-name-title">
                        Phone Number: {item.phone_number}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Email: {item.email}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Address: {item.address}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Note: {item.note}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Payment Type: {item.payment_type}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Payment Status: {item.payment_status}
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        item Date: {item.inserted_at}
                    </label>
                </div>
            </div>
            ))}
            </>
            ) : (
                <div className="col-lg-9 col-md-9 text-center">
                  <p>Không có sản phẩm</p>
                </div>
              )}
            <div class="col-lg-7">
                <label class="form__category-id-title fs-1 mb-2">
                        Product Infor
                </label>
                
                <div class="product-list d-flex justify-content-between align-items-center mb-3">
                    <div class="form__category-des">
                        <label class="form__category-id-title">
                            Name: 
                        </label>
                    </div>
                    <div class="form__category-des ">
                        <label class="form__category-id-title">
                            Img: 
                        </label>
                        <img src="" width="80%"></img>
                        <label class="form__category-id-title">
                            Price: 
                        </label>
                    </div>
                    <div class="form__category-des">
                        <label class="form__category-id-title">
                            Quantity: 
                        </label>
                    </div>
                    <div class="form__category-des">
                        <label class="form__category-id-title">
                            Total Price: 
                        </label>
                    </div>
                </div>
           
            </div>
            <div class="form__category-check col-lg-12">
                <div class="form__category-check">
                    <button class="form__category-btn form__input-btn">
                        Import
                    </button>
                </div>
            </div> 
        </div>
    </div>
    );
}

export default OrderDetail;

