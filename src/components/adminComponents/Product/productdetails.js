import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails(){
     const { id } = useParams();

     const [importExportError, setImportExportError] = useState(""); 
     const [isValid, setIsValid] = useState(true);
     const [imageProduct, setImageProduct] = useState([]);
                               // Đường dẫn hình ảnh hiện tại
     const [showCrProductImage, setShowCrProductImage] = useState(true);

     const [importPriceInput, setImportPriceInput] = useState("");


     //getcategory
     const [category, setCategory] = useState([]);
     //getwarehouse
     const [warehouse, setWarehouse] = useState([]);

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

     
     const [crProductId, setCrProductId] = useState("");
     
     
     //update
     const [product, setProduct] = useState([]);
     const [categoryId, setCategoryId] = useState("");
     const [productName, setProductName] = useState("");
     const [productStatus, setProductStatus] = useState("");
     
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
     
     const [prdDesError, setPrdDesError] = useState("");
     const [prdQuantityError, setPrdQuantityError] = useState("");
     const [prdIsSaleError, setPrdIsSaleError] = useState("");
     const [importPriceError, setImportPriceError] = useState("");
     const [exportPriceError, setExportPriceError] = useState("");
     const [prdSalePercentError, setPrdSalePercentError] = useState("");
     const [prdImageError, setPrdImageError] = useState("");
     
     const [imgFileName, setImgFileName] = useState("");

     
     const [productDetails, setProductDetails] = useState([
          {id: '', quantity: ''}
     ]);

     const handleSubmit = (e) => {
          e.preventDefault();
      
          // Validate quantity
          const hasInvalidQuantity = productDetails.some((product) => {
            return isNaN(product.quantity) || product.quantity < 0; // Quantity must be a positive number
          });
      
          if (hasInvalidQuantity) {
            setIsValid(false);
            toast.error("Số lượng sản phẩm phải là số dương!", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return; // Don't proceed with the API call if there are invalid quantities
          }
      
          setIsValid(true);
      
          const formatteData = JSON.stringify(productDetails)
            .replace(/"/g, "'")
            .replace(/:/g, ": ")
            .replace(/,/g, ", ");
      
          axios
            .put("/product/update/quantity", { data: formatteData }, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            })
            .then((response) => {
              console.log(response.data);
              toast.success("Cập Nhật Sản Phẩm Thành Công!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              const redirectInterval = setInterval(() => {
                clearInterval(redirectInterval);
                window.location.href = "/admin/all_product";
              }, 1500);
            })
            .catch((err) => {
              console.log(err);
            });
        };

     const handleChange = (index, field, value) => {
          const updateQuantity = [...productDetails];
          updateQuantity[index][field] = value;
          setProductDetails(updateQuantity);
     };

     const validateInput = () => {
          for (let i = 0; i < productDetails.length; i++) {
            const product = productDetails[i];
            if (
              (isNaN(product.quantity) || product.quantity < 0)
            ) {
              return false;
            }
          }
          return true;
        };

     const hanldeInputClick = () => {
          setCatIdError("");
          setPrdNameError("");
          setPrdStatusError("");
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
               setIsValid(false);
               setCatIdError("");
          }
     };
     const handleProductName = (e) => {
          setProductName(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPrdNameError("");
          }
     };
     const handleProductStatus = (e) => {
          setProductStatus(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPrdStatusError("");
          }
     };
     const handleProductDescription = (e) => {
          setProductDescription(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPrdDesError("");
          }
     };
     const handleProductIsSale = (e) => {
          setProductIsSale(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPrdIsSaleError("");
          }
     };
     const handleExportPrice = (event) => {
          const value = event.target.value;
          const formattedValue = value.replace(/[^0-9]/g, ""); // Giữ lại các ký tự số
          const price = parseFloat(formattedValue);
          setExportPrice(price);
          
          if (!isValid) {
            setIsValid(false);
            setExportPriceError("");
          }
        };
     const handleProductSalePercent = (e) => {
          setProductSalePercent(e.target.value);
          if(!isValid){
               setIsValid(false);
               setPrdSalePercentError("");
          }
     };
     const handleProductImage = (e) => {
          setProductImage(e.target.value);
          if(!isValid){
               setIsValid(false);
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

     //api get product by id
     useEffect(() => {
          axios
               .get(`/product/${id}`)
               .then((response) => {
                    console.log(response.data);
                    console.log(response.data.details);
                    setProduct(response.data);
                    setProductDetails(response.data.details);
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
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);
     //api update product
     const updateProduct = (e) => {
          e.preventDefault();
          setIsValid(true);
          console.log("categoryId:", categoryId);
          console.log("productName:", productName);
          console.log("productStatus:", productStatus);
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
               setCatIdError("Hãy Chọn Danh Mục Sản Phẩm!");
               setIsValid(false);
          }
          if (!productName) {
               setPrdNameError("Hãy Nhập Vào Tên Sản Phẩm!");
               setIsValid(false);
          }
          if (!productStatus) {
               setPrdStatusError("Hãy Chọn Trạng Thái Cho Sản Phẩm!");
               setIsValid(false);
          }

          if (!productDescription) {
               setPrdDesError("Hãy Nhập Mô Tả Cho Sản Phẩm!");
               setIsValid(false);
          }
          if (!productIsSale) {
               setPrdIsSaleError("Hãy Chọn Sản Phẩm Có Giảm Giá Hay Không!");
               setIsValid(false);
          }
          if (!exportPrice) {
               setExportPriceError("Hãy Nhập Vào Giá Bán Ra!");
               setIsValid(false);
          }
          if (productIsSale === 1 && productSalePercent  < 1) {
               setPrdSalePercentError("Hãy Nhập Vào Phần Trăm Giảm Giá!");
               setIsValid(false);
          }else if(productSalePercent > 80){
               setPrdSalePercentError("Phần Trăm Giảm Giá Phải Bé Hơn 80%!");
               setIsValid(false);
          }
          if (!productImage) {
               setPrdImageError("Hãy Thêm Hình Ảnh Cho Sản Phẩm!");
               setIsValid(false);
          }

          if(isValid){
               axios
               .put(`/product/update/${id}`, {
                    name: productName,
                    description: productDescription,
                    price: exportPrice,
                    sale_percent: productSalePercent,
                    img_url: productImage,
                    status: productStatus,
                    is_sale: productIsSale,
                    cat_id: categoryId,
               },{
                    headers: {
                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
               })
               .then((response) => {
                    console.log(response.data);
                    toast.success("Cập Nhật Sản Phẩm Thành Công!",{
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
               console.log(isValid);
               toast.error("Hãy Đảm Bảo Rằng Đã Nhập Đủ Các Mục!",{
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

     const formatNumber = (number) => {
          if (number) {
            return new Intl.NumberFormat("vi-VN").format(number);
          }
          return "";
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
                   Chi Tiết Sản Phẩm
             </span>
             <span className="main__title-des">
                       Chi Tiết Sản Phẩm Theo ID
             </span>
        </div>
        <div className="main__form row">
          <div className="col-lg-4">
          <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       ID Sản Phẩm: <span>{crProductId}</span>
                  </label>
                  <label className="form__product-delete-id-title">
                       Số Lượng: <span>{crProductQuantity}</span>
                  </label>
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Tên Sản Phẩm: 
                       {/* <span>{crProductName}</span> */}
                    </label>
                    <input type="text" 
                         id="form__product-name-input" 
                         className="form__product-nane-input" 
                         placeholder="Nhập vào tên sản phẩm" 
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
                       Mô Tả Sản Phẩm: 
                       {/* <span>{crProductDescription}</span> */}
                    </label>
                    <input type="text" 
                         id="form__product-quantity-input" 
                         className="form__product-quantity-input" 
                         placeholder="Nhập vào mô tả sản phẩm" 
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
               {productQuantity !== 0 && (
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Trạng Thái Sản Phẩm: <span>{crProductStatus === 1 ? "Đang bán" : "Không bán"}</span>
                    </label>
                    <select type="number" 
                         className="form__product-id-input" 
                         value={productStatus}
                         onChange={handleProductStatus}
                         onClick={hanldeInputClick}
                    >
                         <option value="">Chọn trạng thái sản phẩm</option>
                         <option value="99">Không bán</option>
                         <option value="1">Bán</option>
                    </select>
                    {prdStatusError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>     
                              {prdStatusError}
                         </div>
                    )}
               </div>
               )}
          </div>
          <div className="col-lg-4">
          <div className="form__product-price">
                    <label for="form__product-price-input" className="form__product-price-title">
                         Giá Bán: <span>{formatNumber(crExportPrice)} VND</span>
                    </label>
                    <input type="text" 
                         id="form__product-price-input" 
                         className="form__product-price-input" 
                         placeholder="Nhập vào giá bán" 
                         min={0}
                         value={formatNumber(exportPrice)}
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
                       Giảm Giá: <span>{crProductIsSale === 1 ? "Đang Giảm Giá" : "Không Giảm Giá"}</span>
                  </label>
                  <select 
                         className="form__product-price-input" 
                         placeholder="1 is Sale - 0 is Not Sale" 
                         value={productIsSale}
                         onChange={handleProductIsSale}
                         onClick={hanldeInputClick}
                    >
                         <option value="">Chọn Giảm Giá</option>
                         <option value="99">Không Giảm Giá</option>
                         <option value="1">Giảm Giá</option>
                    </select>
                    {prdIsSaleError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdIsSaleError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Phần Trăm Giảm Giá: <span>{crProductSalePercent}%</span>
                    </label>
                    {productIsSale !== 99 && (
                         <input type="number" 
                         id="form__product-name-input" 
                         className={`form__product-id-input  ${productIsSale === "99" ? "readonly form__input--readonly:focus": ""}`} 
                         placeholder="Enter Sale Percent" 
                         value={productSalePercent}
                         onChange={handleProductSalePercent}
                         onClick={hanldeInputClick}
                         />
                    )}
                    {productIsSale === 99 && (
                         <input className="form__product-id-input" 
                         type="number" value="0" 
                         min={0}
                         onChange={handleProductSalePercent} 
                         readOnly
                         />
                    )}
                    {productIsSale === 1 && productSalePercent < 1 &&(
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              Phần Trăm Giảm Giá Phải Lớn Hơn 0
                         </div>
                    )}
                     {prdSalePercentError && (
                         <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                              {prdSalePercentError}
                         </div>
                    )}
               </div>
               <div className="form__product-delete-id">
                    <label className="form__product-delete-id-title">
                       Danh Mục: <span>{crCategoryId}</span>
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
                    Hình Ảnh Sản Phẩm
               </label>
               <label for="image" className="uploadimg_btn">
                            Tải Ảnh Lên
               </label>
               <input type="file" onChange={handleImageUpload} id="image"/>
               <input type="text" value={imgFileName} onChange={handleProductImage} style={{display:"none"}} />
               {showCrProductImage && crProductImage && (
                    <img src={crProductImage} width="80%" alt="" />
               )}
               {productImagePreview && (
                    <img src={productImagePreview} width="80%" alt="Preview_image" />
               )}          
          </div>
          <div className="col-lg-12 row mt-3">
               {productDetails.map((productDetail, index) => (
               <div className="col-lg-4">
                    <div className="form__product-delete-id">
                         <label className="form__product-delete-id-title">
                         Giá Nhập Vào: {formatNumber(productDetail.import_price)} VNĐ
                         </label>
                    </div>    
                    <div className="form__product-delete-id">
                         <label className="form__product-delete-id-title">
                         Số lượng: {productDetail.quantity}
                         </label>
                         <input
                         type="number"
                         className="form__product-id-input"
                         placeholder="Enter Category Description"
                         value={productDetail.quantity}
                         onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                         />
                         <input
                         type="number"
                         className="form__product-id-input"
                         placeholder="Enter Category Description"
                         value={productDetail.id}
                         onChange={(e) => handleChange(index, 'id', e.target.value)}
                         style={{display:"none"}}
                         />
                    </div>  
               </div> 
               ))}
               {productQuantity !== 0 && (
               <div className="col-lg-12">
               <button className="form__category-btn form__input-btn"
                         onClick={handleSubmit}
                    >
                         Cập Nhật Số Lượng
                    </button>
               </div>
               )}
          </div>
          <div className="form__category-check col-lg-12 d-flex">
               <div class="form__category-check me-3">
                    <Link to="/admin/all_product" >
                        <button class="form__category-btn form__input-btn">
                        <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                Trở về
                        </button>
                    </Link>
                </div>
               <div className="form__category-check">
                    <button className="form__category-btn form__input-btn"
                         onClick={updateProduct}
                    >
                         Cập Nhật
                    </button>
               </div>
          </div>
        </div>

   </div>
    );
}

export default ProductDetails;