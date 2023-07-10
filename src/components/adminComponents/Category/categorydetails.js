import axios from "axios";
import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function CategoryDetails(){
    const { cat_id } = useParams();
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [initCategoryId, setInitCategoryId] = useState("");
    const [initialCategoryName, setInitialCategoryName] = useState("");
    const [initiaCategoryDescription, setInitialCategoryDescription] = useState("");

    useEffect(() => {
        axios
            .get(`/category/${cat_id}`)
            .then((response) => {
                console.log(response.data);
                setCategory(response.data);
                setCategoryName(response.data.cat_name);
                setCategoryDescription(response.data.cat_description);
                setInitialCategoryName(response.data.cat_name);
                setInitialCategoryDescription(response.data.cat_description);
                setInitCategoryId(response.data.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const updateCategory = () => {
        console.log("categoryName: ", categoryName);
        console.log("categoryDescription: ", categoryDescription);
        axios
        .put(
            `/category/update/${cat_id}`,
            {
                cat_name: categoryName,
                cat_description: categoryDescription,
            },
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
            )
            .then((response) => {
                console.log(response.data);
                setCategory(response.data)
                setCategoryName(response.data.cat_name); // Cập nhật giá trị mới
                setCategoryDescription(response.data.cat_description); // Cập nhật giá trị mới
                window.location.href = "/admin/all_category";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteCategory = () => {
        const confirmBox = window.confirm("Do you really want to delete this category?");
        if (confirmBox === true) {
            axios
            .delete(`/category/delete/${cat_id}`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                window.location.href = "/admin/all_category";
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };


    return(
        <div>
        <div className="main">
            <div className="main__title">
                <span className="main__title-text">
                    Category Details
                </span>
                <span className="main__title-des">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                <label className="form__product-id-title">
                        Category ID: <span>{initCategoryId}</span>
                    </label>
                    <label className="form__product-id-title">
                        Category Name: <span>{initialCategoryName}</span>
                    </label>
                    <input type="text" className="form__product-id-input " placeholder="Enter Category Name" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        
                    />
                </div>
                <div className="form__product-cate-id">
                    <label className="form__product-id-title">
                        Category Description : <span>{initiaCategoryDescription}</span>
                    </label>

                    <input type="text" className="form__product-id-input" placeholder="Enter Category Description" 
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                </div> 
                <div className="form__product-check d-flex align-items-center">
                <div class="form__category-check me-3">
                    <Link to="/admin/all_category" >
                        <button class="form__category-btn form__input-btn">
                        <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                Back
                        </button>
                    </Link>
                </div>
                <div class="form__category-check me-3">
                    <button className="form__product-btn form__input-btn"
                            onClick={updateCategory}
                    >
                        Update Category
                    </button>
                </div>
                <div class="form__category-check me-3">
                    <button className="form__product-btn form__input-btn "
                            onClick={deleteCategory}
                    >
                        Delete Category
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>

    );

}

export default CategoryDetails;