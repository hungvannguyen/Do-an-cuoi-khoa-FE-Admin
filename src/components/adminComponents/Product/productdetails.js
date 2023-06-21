import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetails(){
     const { pro_id } = useParams();
     const [product, setProduct] = useState([]);
     const [productId, setProductId] = useState("");
     const [productName, setProductName] = useState("");
     const [productDescription, setProductDescription] = useState("");

     useEffect(() => {
          axios
               .get(`/product/${pro_id}`)
               .then((response) => {
                    console.log(response.data);
                    setProduct(response.data);
                    setProductId(response.data.id);
                    setProductName(response.data.pro_name);
                    setProductDescription(response.data.pro_description);
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);


    return(
        <div className="main">
        <div className="main__title">
             <span className="main__title-text">
                  Delete Product
             </span>
             <span className="main__title-des">
                  DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
             </span>
        </div>
        <div className="main__form">
             <div className="form__product-delete-id">
                  <label className="form__product-delete-id-title">
                       Product ID
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
             </div>
             
             <div className="form__category-check">
                  <button className="form__category-btn form__input-btn">
                       Delete
                  </button>
             </div>
        </div>

   </div>
    );
}

export default ProductDetails;