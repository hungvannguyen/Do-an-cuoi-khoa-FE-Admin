import  "../../../pages/admin/Styles/css/allCss.css";

function AddProduct() {
  return (
    <div className="main">
    <div className="main__title">
         <span className="main__title-text">
              Add Product
         </span>
         <span className="main__title-des">
              DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
         </span>
    </div>
    <div className="main__form">
         <div className="form__product-id">
              <label className="form__product-id-title">
                   Product ID
              </label>
              <input type="text" readonly className="form__product-id-input form__input--readonly" placeholder="15" />
         </div>
         <div className="form__product-cate-id">
              <label className="form__product-id-title">
                   Category ID
              </label>
              <input type="text" className="form__product-id-input" placeholder="Enter Category ID" />
         </div>
         <div className="form__product-name">
              <label for="form__product-name-input" className="form__product-name-title">
                   Product Name
              </label>
              <input type="text" name="" id="form__product-name-input" className="form__product-nane-input" placeholder="Enter Product Name" />
              <span className="form__product-name-validate">

              </span>
         </div>
         <div className="form__product-quantity">
              <label for="form__product-quantity-input" className="form__product-quantity-title">
                   Product Quantity
              </label>
              <input type="text" name="" id="form__product-quantity-input" className="form__product-quantity-input" placeholder="Enter Product Quantity" />
         </div>
         <div className="form__product-price">
              <label for="form__product-price-input" className="form__product-price-title">
                   Product Price
              </label>
              <input type="text" name="" id="form__product-price-input" className="form__product-price-input" placeholder="Enter Product Price" />
         </div>
         <div className="form__product-check">
              <button className="form__product-btn form__input-btn">
                   Import
              </button>
         </div>
    </div>
</div>
  );
}
export default AddProduct;