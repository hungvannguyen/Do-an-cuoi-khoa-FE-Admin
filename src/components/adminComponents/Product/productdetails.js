import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetails(){
     const { id } = useParams();
     const [imgFileName, setImgFileName] = useState("");
     const [importExportError, setImportExportError] = useState(""); 
     const [isValid, setIsValid] = useState(true);
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

     useEffect(() => {
          if(Array.isArray(warehouse)){
               const matchedWarehouse = warehouse.find(item => item.id === crWareHouseId);
               setWarehouseInfo(matchedWarehouse);
          }
     }, [crWareHouseId, warehouse]);

     useEffect(() => {
          axios
               .get(`/product/${id}`)
               .then((response) => {
                    console.log(response.data);
                    setProduct(response.data);
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
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);

     const updateProduct = (e) => {
          e.preventDefault();
          setIsValid(true);
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
          }
          if (!productImage) {
               setPrdImageError("Please choose product image!");
               setIsValid(true);
          }
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
               window.location.href = "/admin/product";
          })
          .catch((error) => {
               console.log(error);
          });
     };

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

               setProductImagePreview(URL.createObjectURL(file));
               setImgFileName(fileName);
          }
          ).catch((error) => {
               console.log(error);
          });
     };

    return(
        <div className="main">
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
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Discription: <span>{crProductDescription}</span>
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product Quantity: <span>{crProductQuantity}</span>
                  </label>
                  <input type="number" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product status: <span>{crProductStatus === 1 ? "Đang bán" : "Không bán"}</span>
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
          </div>
          <div className="col-lg-4">
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Product price export: <span>{crExportPrice}</span>
                    </label>
                    <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Is Sale: <span>{crProductIsSale === 1 ? "Đang sale" : "Không sale"}</span>
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Sale Percent: <span>{crProductSalePercent}%</span>
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Product ID" />
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Warehouse{""}: {crWareHouseId}
                       <span>
                         {warehouseInfo &&(
                              <span>{warehouseInfo.city},{warehouseInfo.district},{warehouseInfo.ward}</span>
                         )}
                       </span>
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
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Category <span>{crWareHouseId}</span>
                  </label>
                  <select value={categoryId} onChange={handleCategoryId} className="form__product-id-input">
                    <option value="">Choose Category</option>
                         {category.map((category) => (
                              <option key={category.id} value={category.id}>
                                   {category.cat_name}
                              </option>
                         ))}
               </select>
               </div>
          </div>
          <div className="col-lg-4">
               <label className="form__product-id-title">
                    Product Image
               </label>
               <input type="file" onChange={handleImageUpload}/>
               <input type="text" value={imgFileName} onChange={handleProductImage} style={{display:"none"}} />
               {productImagePreview && (
               <img src={productImagePreview} width="80%" alt="Preview_image" />)}
               {prdImageError && (
                    <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                         {prdImageError}
                    </div>
               )}             
          </div>
          <div className="form__category-check col-lg-12 d-flex">
               <div className="form__category-check">
                    <button className="form__category-btn form__input-btn">
                         Update
                    </button>
               </div>
               <div className="form__category-check ms-3">
                    <button className="form__category-btn form__input-btn">
                         Delete
                    </button>
               </div>
          </div>
        </div>

   </div>
    );
}

export default ProductDetails;