import  "../../../pages/admin/Styles/css/allCss.css";
import { useState,} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    


    const addCategory = () => {
        const categoryData = {
            cat_name: categoryName,
            cat_description: categoryDescription,
        };
        axios
            .post("/category/add", categoryData,{
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                setCategoryName("");
                setCategoryDescription("");
                window.location.href = "/admin/all_category";
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
            });
    };

    return(
    <div>
        <div className="main">
            <div className="main__title">
                <span className="main__title-text">
                    Add Category
                </span>
                <span className="main__title-des">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                    <label className="form__product-id-title">
                        Category Name
                    </label>
                    <input type="text" readonly className="form__product-id-input form__input--readonly" placeholder="Enter Category Name" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="form__product-cate-id">
                    <label className="form__product-id-title">
                        Category Description
                    </label>
                    <input type="text" className="form__product-id-input" placeholder="Enter Category Description" 
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                </div> 
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                            onClick={addCategory}
                    >
                        Add Category
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