import  "../../../pages/admin/Styles/css/allCss.css";

function AddCategory() {
    return(
    <div>
        <div className="main">
            <div className="main__title">
                <span className="main__title-text">
                    Add Employee
                </span>
                <span className="main__title-des">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                    <label className="form__product-id-title">
                        Employee ID
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
                        Employee Name
                    </label>
                    <input type="text" name="" id="form__product-input" className="form__product-nane-input" placeholder="Enter Employee Name" />
                    <span className="form__product-validate text__validate--failed">

                    </span>
                </div>
                <div className="form__product-quantity">
                    <label for="form__product-quantity-input" className="form__product-quantity-title">
                        Phone Number
                    </label>
                    <input type="text" name="" id="form__product-quantity-input" className="form__product-quantity-input" placeholder="Enter Phone Number" />
                </div>
                <div className="form__product-price">
                    <label for="form__product-price-input" className="form__product-price-title">
                        Email
                    </label>
                    <input type="text" name="" id="form__product-price-input" className="form__product-price-input" placeholder="Enter Email" />
                    <span className="form__mail-validate text__validate--failed">

                    </span>
                </div>
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn">
                        Import
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

export default AddCategory;