import  "../../../pages/admin/Styles/css/allCss.css";
import { useEffect, useState,} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AddProduct() {
     
     const [isValid, setIsValid] = useState("");

     //getcategory
     const [category, setCategory] = useState([]);
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
     const [importExportError, setImportExportError] = useState(""); 
     //addproduct
     const [categoryId, setCategoryId] = useState("");
     const [productName, setProductName] = useState("");
     const [productStatus, setProductStatus] = useState(99);
     const [productDescription, setProductDescription] = useState("");
     const [productQuantity, setProductQuantity] = useState("");
     const [productIsSale, setProductIsSale] = useState("");
     const [importPrice, setImportPrice] = useState("");
     const [exportPrice, setExportPrice] = useState("");
     const [productSalePercent, setProductSalePercent] = useState(0);
     const [hasSalePercentChanged, setHasSalePercentChanged] = useState(false);
     const [productImage, setProductImage] = useState("");
     const [productImagePreview, setProductImagePreview] = useState("");


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


     const addProduct = (e) => {
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
               setCatIdError("Hãy Chọn Danh Mục Cho Sản Phẩm!");
               setIsValid(false);
             }
             if (!productName) {
               setPrdNameError("Hãy Nhập Vào Tên Sản Phẩm!");
               setIsValid(false);
             }
             if (!productDescription) {
               setPrdDesError("Hãy Nhập Mô Tả Cho Sản Phẩm!");
               setIsValid(false);
             }
             if (!exportPrice) {
               setExportPriceError("Hãy Nhập Giá Xuất Cho Sản Phẩm!");
               setIsValid(false);
                }
             if (!productIsSale) {
               setPrdIsSaleError("Hãy Chọn Có Giảm Giá Hay Không!");
               setIsValid(false);
             }
             if(productIsSale === 99) {
               setProductSalePercent(0);
               setIsValid(true);
               }
               // else if (productIsSale !== 99) {
               // if (!productSalePercent) {
               //       setPrdSalePercentError("Please enter sale percent!");
               //           setIsValid(false);
               // }else if (productSalePercent < 1) {
               //           setPrdSalePercentError("Sale percent must be greater than 1%!");
               //           setIsValid(false);
               // }else if (productSalePercent > 80) {
               //           setPrdSalePercentError("Sale percent must be less than 80%!");
               //           setIsValid(false);
               // }
          // }
             if (!productImage) {
               setPrdImageError("Hãy Chọn Ảnh Cho Sản Phẩm!");
               setIsValid(false);
             }
           
          if(isValid) {
               const productData = {
                    cat_id: categoryId,
                    status: productStatus,
                    is_sale: productIsSale,
                    name: productName,
                    description: productDescription,
                    price: exportPrice,
                    sale_percent: productSalePercent,
                    img_url: productImage,
               };
               axios
                    .post("/product/add", productData, {
                         headers: {
                              Authorization: "Bearer " + sessionStorage.getItem("token"),
                         },
                    })
                    .then((response) => {
                         console.log(response.data);
                         setProductImage("");

                         toast.success("Thêm Sản Phẩm Mới Thành Công!",{
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
                         }, 1500);
                    })
                    .catch((error) => {
                         console.log(error);
                    });
          }else{
               toast.error("Hãy Đảm Bảo Rằng Đã Nhập Đủ Các Mục",{
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

     const handleCategoryId = (event) => {
          setCategoryId(event.target.value);
          if (!isValid) {
               setIsValid(false);
               setCatIdError("");
          }
     };

     const handleProductName = (event) => {
          setProductName(event.target.value);
          if (!isValid) {
               setIsValid(false);
               setPrdNameError("");
          }
     };


     const handleProductDescription = (event) => {
          setProductDescription(event.target.value);
          if (!isValid) {
               setIsValid(false);
               setPrdDesError("");
          }
     };


     const handleProductIsSale = (event) => {
          setProductIsSale(event.target.value);
          if (!isValid) {
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

     const handleProductSalePercent = (event) => {
          setProductSalePercent(event.target.value);
          setHasSalePercentChanged(true);
          if (!isValid) {
               setIsValid(false);
               setPrdSalePercentError("");
          }
     };

     const handleProductImage = (event) => {
          setProductImage(event.target.value);
          if (!isValid) {
               setIsValid(false);
               setPrdImageError("");
          }
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

     const formatNumber = (number) => {
          if (number) {
            return new Intl.NumberFormat("vi-VN").format(number);
          }
          return "";
        };


  return (
    <div className="main">
     <ToastContainer 
          style={{
               width: "400px",
               fontSize: "18px",
          }} 
     />
    <div className="main__title">
         <span className="main__title-text">
              Tạo Sản Phẩm
         </span>
         <span className="main__title-des">
              DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
         </span>
    </div>
    <div className="main__form row">
     <div className="col-lg-4">
         <div className="form__product-cate-id">
              <label className="form__product-id-title">
               ID Danh Mục
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
         <div className="form__product-cate-id">
              <label className="form__product-id-title">
                   Giảm Giá 
              </label>
              <select 
                    className="form__product-id-input" 
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
         <div className="form__product-name">
              <label for="form__product-name-input" className="form__product-name-title">
                   Phần Trăm Giảm Giá
              </label>
              {productIsSale !== "99" && (
                    <input type="number" 
                    id="form__product-name-input" 
                    className={`form__product-id-input ${productIsSale === "99" ? "readonly": ""}`} 
                    placeholder="Enter Sale Percent" 
                    min={0}
                    value={productSalePercent}
                    onChange={handleProductSalePercent}
                    onClick={hanldeInputClick}
               />)}
              
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
     </div>
     <div className="col-lg-4">
          <div className="form__product-name">
              <label for="form__product-name-input" className="form__product-name-title">
                  Tên Sản Phẩm
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
         <div className="form__product-quantity">
              <label for="form__product-quantity-input" className="form__product-quantity-title">
                   Mô Tả Sản Phẩm
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
         <div className="form__product-price d-flex">
               <div className="form__product-price">
                    <label for="form__product-price-input" className="form__product-price-title">
                         Giá Bán Ra
                    </label>
                    <input type="text" 
                         id="form__product-price-input" 
                         className="form__product-price-input" 
                         placeholder="Enter Product Export Price" 
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
         </div>

     </div>
     <div className="col-lg-4 d-flex flex-column ">
          <label className="form__product-id-title">
                   Hình Ảnh Sản Phẩm
          </label>
          <label for="product_add" className="uploadimg_btn">
                            Tải Ảnh Lên
          </label>
          <input type="file" id="product_add" onChange={handleImageUpload}/>

          <input type="text" value={imgFileName} onChange={handleProductImage} style={{display:"none"}} />
          {productImagePreview && (
          <img src={productImagePreview} width="80%" alt="Preview_image" />)}
          {prdImageError && (
               <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                    {prdImageError}
               </div>
          )}             
     </div>

         <div className="form__product-check">
              <button className="form__product-btn form__input-btn"
                    onClick={addProduct}
              >
                  Thêm Mới Sản Phẩm
              </button>
         </div>
    </div>
</div>
  );
}
export default AddProduct;