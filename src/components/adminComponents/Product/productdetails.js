import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails(){
     const { id } = useParams();

     const [importExportError, setImportExportError] = useState(""); 
     const [isValid, setIsValid] = useState(true);
     const [imageProduct, setImageProduct] = useState([]);
                               // Đường dẫn hình ảnh hiện tại
     const [showCrProductImage, setShowCrProductImage] = useState(true);


     //getcategory
     const [category, setCategory] = useState([]);
     //getwarehouse
     const [warehouse, setWarehouse] = useState([]);
     const [warehouseInfo, setWarehouseInfo] = useState(null);
     //currentdata
     const [crProductName, setCrProductName] = useState("");
     const [crProductDescription, setCrProductDescription] = useState("");
     const [crProductQuantity, setCrProductQuantity] = useState("");
     const [crImportPrice, setCrImportPrice] = useState("");
     const [crExportPrice, setCrExportPrice] = useState("");
     const [crProductSalePercent, setCrProductSalePercent] = useState("");
     const [crProductImage, setCrProductImage] = useState("");
     const [crProductStatus, setCrProductStatus] = useState("");
     const [crProductIsSale, setCrProductIsSale] = useState("");
     const [crCategoryId, setCrCategoryId] = useState("");
     const [crWareHouseId, setCrWareHouseId] = useState("");
     const [crProductId, setCrProductId] = useState("");
     const [crCity, setCrCity] = useState("");
     const [crDistrict, setCrDistrict] = useState("");
     const [crWard, setCrWard] = useState("");

     //update
     const [product, setProduct] = useState([]);
     const [categoryId, setCategoryId] = useState("");
     const [productName, setProductName] = useState("");
     const [productStatus, setProductStatus] = useState("");
     const [wareHouseId, setWareHouseId] = useState("");
     const [productDescription, setProductDescription] = useState("");
     const [productQuantity, setProductQuantity] = useState("");
     const [productIsSale, setProductIsSale] = useState("");
     const [importPrice, setImportPrice] = useState("");
     const [exportPrice, setExportPrice] = useState("");
     const [productSalePercent, setProductSalePercent] = useState("");
     const [productImage, setProductImage] = useState("");
     const [productImagePreview, setProductImagePreview] = useState("");

     //setErrorMessage
     const [catIdError, setCatIdError] = useState("");
     const [prdNameError, setPrdNameError] = useState("");
     const [prdStatusError, setPrdStatusError] = useState("");
     const [whIdError, setWhIdError] = useState("");
     const [prdDesError, setPrdDesError] = useState("");
     const [prdQuantityError, setPrdQuantityError] = useState("");
     const [prdIsSaleError, setPrdIsSaleError] = useState("");
     const [importPriceError, setImportPriceError] = useState("");
     const [exportPriceError, setExportPriceError] = useState("");
     const [prdSalePercentError, setPrdSalePercentError] = useState("");
     const [prdImageError, setPrdImageError] = useState("");
     
     const [imgFileName, setImgFileName] = useState("");

     const hanldeInputClick = () => {
          setCatIdError("");
          setPrdNameError("");
          setPrdStatusError("");
          setWhIdError("");
          setPrdDesError("");
          setPrdQuantityError("");
          setPrdIsSaleError("");
          setImportPriceError("");
          setExportPriceError("");
          setPrdSalePercentError("");
          setPrdImageError("");
     };

     const handleCategoryId = (e) => {
          setCategoryId(e.target.value);
          if(!isValid){
               setIsValid(true);
               setCatIdError("");
          }
     };
     const handleProductName = (e) => {
          setProductName(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdNameError("");
          }
     };
     const handleProductStatus = (e) => {
          setProductStatus(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdStatusError("");
          }
     };
     const handleWareHouseId = (e) => {
          setWareHouseId(e.target.value);
          if(!isValid){
               setIsValid(true);
               setWhIdError("");
          }
     };
     const handleProductDescription = (e) => {
          setProductDescription(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdDesError("");
          }
     };
     const handleProductQuantity = (e) => {
          setProductQuantity(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdQuantityError("");
          }
     };
     const handleProductIsSale = (e) => {
          setProductIsSale(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdIsSaleError("");
          }
     };
     const handleImportPrice = (e) => {
          setImportPrice(e.target.value);
          if(!isValid){
               setIsValid(true);
               setImportPriceError("");
          }
     };
     const handleExportPrice = (e) => {
          setExportPrice(e.target.value);
          if(!isValid){
               setIsValid(true);
               setExportPriceError("");
          }
     };
     const handleProductSalePercent = (e) => {
          setProductSalePercent(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdSalePercentError("");
          }
     };
     const handleProductImage = (e) => {
          setProductImage(e.target.value);
          if(!isValid){
               setIsValid(true);
               setPrdImageError("");
          }
     };
     //Api get category all
     useEffect(() => {   
          axios
          .get("/category/all")
          .then((response) => {
               console.log(response.data);
               setCategory(response.data);
               
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);
     //Api get warehouse all
     useEffect(() => {
          axios
          .get("/warehouse/info",{
               headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
               },
          })
          .then((response) => {
               console.log(response.data);
               setWarehouse(response.data);
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);
     //api get product by id
     useEffect(() => {
          axios
               .get(`/product/${id}`)
               .then((response) => {
                    console.log(response.data);
                    setProduct(response.data);
                    //current data
                    setCrCategoryId(response.data.cat_id);
                    setCrProductName(response.data.name);
                    setCrProductDescription(response.data.description);
                    setCrProductQuantity(response.data.quantity);
                    setCrImportPrice(response.data.import_price);
                    setCrExportPrice(response.data.price);
                    setCrProductSalePercent(response.data.sale_percent);
                    setCrProductImage(response.data.img_url);
                    setCrProductStatus(response.data.status);
                    setCrProductIsSale(response.data.is_sale);
                    setCrWareHouseId(response.data.warehouse_id);
                    setCrProductId(response.data.id);
                    //save data
                    setCategoryId(response.data.cat_id);
                    setProductName(response.data.name);
                    setProductDescription(response.data.description);
                    setProductQuantity(response.data.quantity);
                    setImportPrice(response.data.import_price);
                    setExportPrice(response.data.price);
                    setProductSalePercent(response.data.sale_percent);
                    setProductImage(response.data.img_url);
                    setProductStatus(response.data.status);
                    setProductIsSale(response.data.is_sale);
                    setWareHouseId(response.data.warehouse_id);

                    //api get image product
                    axios
                    .get(`/file/img/${response.data.img_url}`, { responseType: "blob" })
                    .then((response) => {
                         const imageUrl = URL.createObjectURL(response.data);
                         setImageProduct([imageUrl]);
                         setCrProductImage(imageUrl);
                         setShowCrProductImage(!productImagePreview);
                    })
                    .catch((error) => {
                         console.log(error);
                    });
                    //api warehouse info
                    axios
                    .get(`/warehouse/info`,{
                         headers: {
                              Authorization: "Bearer " + sessionStorage.getItem("token"),
                         },
                    })
                    .then((warehouseresponse) => {
                         console.log(warehouseresponse.data);
                         const warehouseInfo = warehouseresponse.data;
                         if (warehouseInfo.id = response.data.warehouse_id) {
                              const city = warehouseresponse.data.city;
                              const district = warehouseresponse.data.district;
                              const ward = warehouseresponse.data.ward;

                              setCrCity(city);
                              setCrDistrict(district);
                              setCrWard(ward);
                         }
                    })
                    .catch((error) => {
                    console.log(error);
                    });
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);
     //api update product
     const updateProduct = (e) => {
          e.preventDefault();
          setIsValid(false);
          console.log("categoryId:", categoryId);
          console.log("productName:", productName);
          console.log("productStatus:", productStatus);
          console.log("wareHouseId:", wareHouseId);
          console.log("productDescription:", productDescription);
          console.log("productQuantity:", productQuantity);
          console.log("productIsSale:", productIsSale);
          console.log("importPrice:", importPrice);
          console.log("exportPrice:", exportPrice);
          console.log("productSalePercent:", productSalePercent);
          console.log("productImage:", productImage);
          console.log("imgFileName:", imgFileName);
          console.log("-----------------------");
          if (!categoryId) {
               setCatIdError("Please choose category!");
               setIsValid(true);
          }
          if (!productName) {
               setPrdNameError("Please enter product name!");
               setIsValid(true);
          }
          if (!productStatus) {
               setPrdStatusError("Please choose product status!");
               setIsValid(true);
          }
          if (!wareHouseId) {
               setWhIdError("Please choose warehouse!");
               setIsValid(true);
          }
          if (!productDescription) {
               setPrdDesError("Please enter product description!");
               setIsValid(true);
          }
          if (!productQuantity) {
               setPrdQuantityError("Please enter product quantity!");
               setIsValid(true);
          }
          if (!productIsSale) {
               setPrdIsSaleError("Please choose product is sale!");
               setIsValid(true);
          }
          if (!importPrice) {
               setImportPriceError("Please enter import price!");
               setIsValid(true);
          }else if(importPrice > exportPrice){
               setImportPriceError("Import price must be less than export price!");
               setIsValid(true);
          }
          if (!exportPrice) {
               setExportPriceError("Please enter export price!");
               setIsValid(true);
          }else if(importPrice > exportPrice){
               setImportPriceError("Import price must be less than export price!");
               setIsValid(true);
          }
          if (!productSalePercent) {
               setPrdSalePercentError("Please enter product sale percent!");
               setIsValid(true);
          }else if(productIsSale === 0){
               setIsValid(true);
          }else if(productSalePercent > 100){
               setPrdSalePercentError("Sale percent must be less than 100%!");
               setIsValid(true);
          }
          if (!productImage) {
               setPrdImageError("Please choose product image!");
               setIsValid(true);
          }
          if(importPrice > exportPrice) {
               setImportPriceError("Import price must be less than export price!");
               setIsValid(true);
          }

          if(isValid){
               axios
               .put(`/product/update/${id}`, {
                    name: productName,
                    description: productDescription,
                    quantity: productQuantity,
                    import_price: importPrice,
                    price: exportPrice,
                    sale_percent: productSalePercent,
                    img_url: productImage,
                    status: productStatus,
                    is_sale: productIsSale,
                    cat_id: categoryId,
                    warehouse_id: wareHouseId,
               },{
                    headers: {
                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
               })
               .then((response) => {
                    console.log(response.data);
                    toast.success("Update product successfully!",{
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
                         window.location.href = "/admin/all_product";
                    },1500);     
               })
               .catch((error) => {
                    console.log(error);
               });
          }else{
               toast.error("Please enter all required fields!",{
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
          };
     };
     //api upload image
     const handleImageUpload = (event) => {
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append("file", file);

          axios.post("/file/upload", formData, {
               headers: {
                    "Content-Type": "multipart/form-data",
               },
          }).then((response) => {
               const fileName = response.data.filename;
               console.log(fileName);
               setProductImage(fileName);
               setCrProductImage(fileName);
               setProductImagePreview(URL.createObjectURL(file));
               setImgFileName(fileName);
               setShowCrProductImage(!productImagePreview);
          }
          ).catch((error) => {
               console.log(error);
          });
     };
     //api delete product
     const deleteProduct = () => {
          const confirmBox = window.confirm("Do you really want to delete this product?");
          if(confirmBox === true){
               axios
               .delete(`/product/delete/${id}`,{
                    headers: {
                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
               })
               .then((response) => {
                    console.log(response.data);
                    window.location.href = "/admin/product";
               })
               .catch((error) => {
                    console.log(error);
               });
          }
     };

    return(
        <div className="main">
          <ToastContainer 
               style={{
                    width: "400px",
                    fontSize: "18px",
               }} 
          />
        <div className="main__title">
             <span className="main__title-text">
                   Product Details
             </span>
             <span className="main__title-des">
                  DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
             </span>
        </div>
        <div className="main__form row">
          <div className="col-lg-4">
          <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product ID: <span>{crProductId}</span>
                  </label>
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Name: <span>{crProductName}</span>
                    </label>
                    <input type="text" 
                         id="form__product-name-input" 
                         className="form__product-nane-input" 
                         placeholder="Enter Product Name" 
                         value={productName}
                         onChange={handleProductName}
                         onClick={hanldeInputClick}
                    />
                    {prdNameError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdNameError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Discription: <span>{crProductDescription}</span>
                    </label>
                    <input type="text" 
                         id="form__product-quantity-input" 
                         className="form__product-quantity-input" 
                         placeholder="Enter Product Description" 
                         value={productDescription}
                         onChange={handleProductDescription}
                         onClick={hanldeInputClick}
                    />
                    {prdDesError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdDesError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Quantity: <span>{crProductQuantity}</span>
                  </label>
                  <input type="number" 
                    id="form__product-quantity-input" 
                    className="form__product-quantity-input" 
                    placeholder="Enter Product Quantity" 
                    min={0}
                    value={productQuantity}
                    onChange={handleProductQuantity}
                    onClick={hanldeInputClick}
              />
               {prdQuantityError && (
                    <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                         {prdQuantityError}
                    </div>
               )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product status: <span>{crProductStatus === 1 ? "Đang bán" : "Không bán"}</span>
                    </label>
                    <select type="number" 
                         className="form__product-id-input" 
                         placeholder="1 is Sell - 0 is Not Sell" 
                         value={productStatus}
                         onChange={handleProductStatus}
                         onClick={hanldeInputClick}
                    >
                         <option value="">Choose Status</option>
                         <option value="99">Not Sell</option>
                         <option value="1">Sell</option>
                    </select>
                    {prdStatusError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>     
                              {prdStatusError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Import price: <span>{crImportPrice} VND</span>
                    </label>
                    <input type="number" 
                         id="form__product-price-input" 
                         className="form__product-price-input" 
                         placeholder="Enter Product Import Price" 
                         min={0}
                         value={importPrice}
                         onChange={handleImportPrice}
                         onClick={hanldeInputClick}
                    />  
                    {importPriceError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {importPriceError}
                         </div>
                    )}
                    {importExportError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {importExportError}
                         </div>
                    )}
               </div>
               
          </div>
          <div className="col-lg-4">
          <div className="form__product-price">
                    <label for="form__product-price-input" className="form__product-price-title">
                         Product Export Price: <span>{crExportPrice} VND</span>
                    </label>
                    <input type="number" 
                         id="form__product-price-input" 
                         className="form__product-price-input" 
                         placeholder="Enter Product Export Price" 
                         min={0}
                         value={exportPrice}
                         onChange={handleExportPrice}
                         onClick={hanldeInputClick}
                    />    
                    {exportPriceError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {exportPriceError}
                         </div>
                    )}
                    {importExportError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {importExportError}
                         </div>
                    )}

               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Is Sale: <span>{crProductIsSale === 1 ? "Đang sale" : "Không sale"}</span>
                  </label>
                  <select 
                         className="form__product-price-input" 
                         placeholder="1 is Sale - 0 is Not Sale" 
                         value={productIsSale}
                         onChange={handleProductIsSale}
                         onClick={hanldeInputClick}
                    >
                         <option value="">Choose Sale</option>
                         <option value="99">Not Sale</option>
                         <option value="1">Sale</option>
                    </select>
                    {prdIsSaleError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdIsSaleError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Sale Percent: <span>{crProductSalePercent}%</span>
                    </label>
                    {productIsSale !== "99" && (
                         <input type="number" 
                         id="form__product-name-input" 
                         className={`form__product-id-input ${productIsSale === "99" ? "readonly": ""}`} 
                         placeholder="Enter Sale Percent" 
                         value={productSalePercent}
                         onChange={handleProductSalePercent}
                         onClick={hanldeInputClick}
                         />
                    )}
                    {productIsSale === "99" && (
                         <input className="form__product-id-input" 
                         type="number" value="0" 
                         min={0}
                         onChange={handleProductSalePercent} 
                         readOnly
                         />
                    )}
                     {prdSalePercentError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdSalePercentError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Warehouse: {crCity},{crDistrict},{crWard}
                  </label>
                  {warehouse && (
                         <select 
                              readonly className="form__product-id-input" 
                              value={wareHouseId}
                              onChange={handleWareHouseId}
                              onClick={hanldeInputClick}
                         >
                              <option value="">Choose Warehouse</option>
                              <option value={warehouse.id}>
                                   {warehouse.city},{warehouse.district},{warehouse.ward}
                              </option>
                         </select>
                    )}
                    {whIdError && (
                    <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                         {whIdError}
                    </div>
               )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Category <span>{crCategoryId}</span>
                  </label>
                    <select value={categoryId} onChange={handleCategoryId} className="form__product-id-input">
                         <option value="">Choose Category</option>
                              {category.map((category) => (
                                   <option key={category.id} value={category.id}>
                                        {category.cat_name}
                                   </option>
                              ))}
                    </select>
               {catIdError && (
                    <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                         {catIdError}
                    </div>
               )}
               </div>
          </div>
          <div className="col-lg-4 d-flex flex-column">
               <label className="form__product-id-title">
                    Product Image
               </label>
               <input type="file" onChange={handleImageUpload}/>
               <input type="text" value={imgFileName} onChange={handleProductImage} style={{display:"none"}} />
               {showCrProductImage && crProductImage && (
                    <img src={crProductImage} width="80%" alt="" />
               )}
               {productImagePreview && (
                    <img src={productImagePreview} width="80%" alt="Preview_image" />
               )}          
          </div>
          <div className="form__category-check col-lg-12 d-flex">
               <div className="form__category-check">
                    <button className="form__category-btn form__input-btn"
                         onClick={updateProduct}
                    >
                         Update
                    </button>
               </div>
               <div className="form__category-check ms-3">
                    <button className="form__category-btn form__input-btn"
                         onClick={deleteProduct}
                    >
                         Delete
                    </button>
               </div>
          </div>
        </div>

   </div>
    );
}

export default ProductDetails;