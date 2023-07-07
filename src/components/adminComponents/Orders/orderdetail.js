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
    const [test, setTest] = useState("");




    //get id from url
    useEffect(() => {
        axios
        .get(`/order/info/${order_id}`,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.data);
            setProducts(response.data.products);
            // console.log("product: "+products);
            // setOrders(response.data.products);
            // console.log("order: "+orders);
            // setTest(response.data.id)
            // console.log("test: "+test);
            
            // api get image product
           
                // const imagePromises = response.data.products.map((product) =>
                //   axios.get(`/file/img/${product.img_url}`, { responseType: "blob" })
                // );
                // Promise.all(imagePromises)
                //   .then((responses) => {
                //     const imageUrls = responses.map((response) =>
                //       URL.createObjectURL(response.data)
                //     );
                //     setImageProduct(imageUrls);
                //   })
                //   .catch((error) => {
                //     console.log(error);
                //   });
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
            
          
            {console.log("product: "+products)}
            <div class="col-lg-4" >
                <label class="form__category-id-title fs-1 mb-2">
                        Customer Infor
                </label>
                <div class="form__category-des">
                    <label class="form__category-id-title">
                            Order ID: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Status: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label class="form__category-name-title">
                        Name: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-name-input" class="form__category-name-title">
                        Phone Number: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Email: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Address: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Note: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Payment Type: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        Payment Status: 
                    </label>
                </div>
                <div class="form__category-des">
                    <label for="form__category-des-input" class="form__category-des-title">
                        item Date: 
                    </label>
                </div>
            </div>

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

