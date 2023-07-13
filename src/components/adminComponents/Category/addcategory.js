import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clear } from "@testing-library/user-event/dist/clear";

function AddCategory() {
    const [isValid, setIsValid] = useState(true);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const [categoryNameError, setCategoryNameError] = useState("");
    const [categoryDescriptionError, setCategoryDescriptionError] = useState("");   
    
    const handleInputClick = () => {
        setCategoryNameError("");
        setCategoryDescriptionError("");
    }

    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
        if(!isValid){
            setIsValid(true);
            setCategoryNameError("");
        }
    };

    const handleCategoryDescription = (event) => {
        setCategoryDescription(event.target.value);
        if(!isValid){
            setIsValid(true);
            setCategoryDescriptionError("");
        }
    };



    const addCategory = (e) => {
        e.preventDefault();
        setIsValid(false);
        if(!categoryName){
            setCategoryNameError("Category Name is required");
            setIsValid(true);
        }
        if(!categoryDescription){
            setCategoryDescriptionError("Category Description is required");
            setIsValid(true);
        }

        if(isValid){
            const categoryData = {
                cat_name: categoryName,
                cat_description: categoryDescription,
            };
            axios
                .post("/category/add", categoryData, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    console.log(response.data);
     
                    toast.success("Thêm Danh Mục Thành Công!",{
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
                    window.location.href = "/admin/all_category";
                    },1500);
                })
                .catch((error) => {
                    console.log(error);
                });
        }else{
            toast.error("Hãy Đảm Bảo Rằng Đã Điền Đủ Thông Tin!",{
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

    return(
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
                    Thêm Mới Danh Mục
                </span>
                <span className="main__title-des">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                    <label className="form__product-id-title">
                        Tên Danh Mục
                    </label>
                    <input type="text" 
                        className="form__product-id-input " 
                        placeholder="Enter Category Name" 
                        value={categoryName}
                        onChange={handleCategoryName}
                        onClick={handleInputClick}
                    />
                    {categoryNameError && (
                        <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                            {categoryNameError}
                        </div>
                    )}
                </div>
                <div className="form__product-cate-id">
                    <label className="form__product-id-title">
                        Mô Tả Danh Mục
                    </label>
                    <input type="text" 
                        className="form__product-id-input" 
                        placeholder="Enter Category Description" 
                        value={categoryDescription}
                        onChange={handleCategoryDescription}
                        onClick={handleInputClick}
                    />
                    {categoryDescriptionError && (
                        <div className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>
                            {categoryDescriptionError}
                        </div>
                    )}
                </div> 
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                            onClick={addCategory}
                    >
                        Thêm Mới
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