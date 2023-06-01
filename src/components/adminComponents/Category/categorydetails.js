import  "../../../pages/admin/Styles/css/allCss.css";

function Details_Category(){
    return(
        <div className="main">
        <div className="main__title">
             <span className="main__title-text">
                  Delete Employee
             </span>
             <span className="main__title-des">
                  DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
             </span>
        </div>
        <div className="main__form">
             <div className="form__product-delete-id">
                  <label className="form__product-delete-id-title">
                       Employee ID
                  </label>
                  <input type="text" className="form__delete-id-input" placeholder="Enter Employee ID" />
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

export default Details_Category;