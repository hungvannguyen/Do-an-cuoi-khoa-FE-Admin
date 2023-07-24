import "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import numeral from 'numeral';
import "react-toastify/dist/ReactToastify.css";

function ImportProduct() {
  const [products, setProducts] = useState([
    { name: '', prd_id: '', quantity: '', import_price: '' }
  ]);

  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [productsInfo, setProductsInfo] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
    setIsValid(true);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', prd_id: '', quantity: '', import_price: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) {
          setIsValid(false);
          toast.error("Số lượng và giá nhập phải là số dương và lớn hơn 0!",{
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
          return;
    }
    const formattedData = JSON.stringify(products)
      .replace(/"/g, "'")
      .replace(/:/g, ': ')
      .replace(/,/g, ', ');
    axios
      .post("/import/import", { data: formattedData }, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
        toast.error("Hãy chọn sản phẩm muốn nhập!",{
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
       },500);
      });
  };

  const validateInput = () => {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (
        (isNaN(product.quantity) || isNaN(product.import_price) || product.quantity <= 0 || product.import_price <= 0)
      ) {
        return false;
      }
    }
    return true;
  };

  // API lấy sản phẩm
  useEffect(() => {
    axios
      .get(`/product/import/all`)
      .then((response) => {
        console.log(response.data);
        setProductsInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectProduct = (productId, productName, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].prd_id = productId;
    updatedProducts[index].name = productName;
    setProducts(updatedProducts);
    setIsValid(true);
  };

  const formatPrice = (number) => {
    if (number) {
      return numeral(number).format("0,0"); // Định dạng số theo format "0,0"
    }
    return "";
  };

  const handleExportPrice = (event, index) => {
    const value = event.target.value;
    const formattedValue = value.replace(/[^0-9]/g, "");
    const price = parseFloat(formattedValue.replace(/,/g, ""));
    const updatedProducts = [...products];
    updatedProducts[index].import_price = price.toString();
    setProducts(updatedProducts);
    setIsValid(true);
  };

  return (
    <div>
      <div className="main">
        <ToastContainer
          style={{
            width: "400px",
            fontSize: "18px",
          }}
        />
        <div className="main__title">
          <span className="main__title-text">
            Nhập Hàng
          </span>
          <span className="main__title-des">
            Nhập sản phẩm mới cho cửa hàng
          </span>
        </div>
        <div className="main__form row">
    
            <div className="col-lg-12 row">
              {products.map((product, index) => (
                <div className="col-lg-12 row" key={index}>
                  <div className="form__product-cate-id col-lg-3 me-3">
                    <label className="form__product-id-title">Chọn sản phẩm</label>
                    <select
                      className="form__product-id-input"
                      value={product.prd_id}
                      onChange={(e) => handleSelectProduct(e.target.value, e.target.options[e.target.selectedIndex].text, index)}
                    >
                      <option value="">-- Chọn sản phẩm --</option>
                      {productsInfo.map((productInfo) => (
                        <option key={productInfo.id} value={productInfo.id}>{productInfo.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form__product-cate-id col-lg-3 me-3" >
                    <label className="form__product-id-title">Giá Nhập</label>
                    <input
                      type="text"
                      className="form__product-id-input"
                      placeholder="Nhập giá nhập"
                      value={formatPrice(product.import_price)}
                      onChange={(e) => handleExportPrice(e, index)}
                    />
                  </div>
                  <div className="form__product-cate-id col-lg-3">
                    <label className="form__product-id-title">Số Lượng</label>
                    <input
                      type="number"
                      className="form__product-id-input"
                      placeholder="Nhập số lượng"
                      value={product.quantity}
                      onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {!isValid && (
              <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                Số lượng và giá nhập phải là số dương và lớn hơn 0</div>
            )}
            <div className="d-flex align-items-center">
              <div className="form__product-check me-6">
                <button className="form__product-btn form__input-btn"
                  onClick={handleAddProduct}
                >
                  Thêm Sản Phẩm
                </button>
              </div>
              <div className="form__product-check">
                <button className="form__product-btn form__input-btn"
                  onClick={handleRemoveProduct}
                >
                  Xóa Sản Phẩm
                </button>
              </div>
            </div>
            <div className="form__product-check">
              <button className="form__product-btn form__input-btn"
                onClick={handleSubmit}
              >
                Nhập Hàng
              </button>
            </div>
          
        </div>
      </div>
      <div className="action">
        <div className="action__main">
          <div className="action__title">
            <i className="action__title-icon"></i>
            <span className="action__title-text">

            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportProduct;
