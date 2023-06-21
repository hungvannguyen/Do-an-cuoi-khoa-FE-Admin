import axios from "axios";
import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function CategoryDetails(){
    const { cat_id } = useParams();
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [initialCategoryName, setInitialCategoryName] = useState("");
    const [initiaCategoryDescription, setInitialCategoryDescription] = useState("");

    useEffect(() => {
        axios
            .get(`/category/${cat_id}`)
            .then((response) => {
                console.log(response.data);
                setCategory(response.data);
                setCategoryId(response.data.id);
                setCategoryName(response.data.cat_name);
                setCategoryDescription(response.data.cat_description);
                setInitialCategoryName(response.data.cat_name);
                setInitialCategoryDescription(response.data.cat_description);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const updateCategory = () => {
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
                        Category Name: <span>{initialCategoryName}</span>
                    </label>
                    <input type="text" readonly className="form__product-id-input " placeholder="Enter Category Name" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        onBlur={(e) => setCategoryName(e.target.value)}
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
                <div className="form__product-check d-flex">
                    <button className="form__product-btn form__input-btn"
                            onClick={updateCategory}
                    >
                        Update Category
                    </button>
                    <button className="form__product-btn form__input-btn ms-3"
                            onClick={deleteCategory}
                    >
                        Delete Category
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

export default CategoryDetails;