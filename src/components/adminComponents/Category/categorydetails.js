import axios from "axios";
import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactModal from 'react-modal';

function CategoryDetails(){
    const { cat_id } = useParams();
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [initCategoryId, setInitCategoryId] = useState("");
    const [initialCategoryName, setInitialCategoryName] = useState("");
    const [initiaCategoryDescription, setInitialCategoryDescription] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
  
      
      const openModal2 = () => {
        setIsModalOpen2(true);
      };
    
      const closeModal2 = () => {
        setIsModalOpen2(false);
      };

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
                toast.success("Cập Nhật Danh Mục Thành CÔng!",{
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
               }, 500);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteCategory = () => {
            axios
            .delete(`/category/delete/${cat_id}`, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                toast.success("Cập Nhật Danh Mục Thành CÔng!",{
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
               }, 500);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Không Thể Xóa Danh Mục Vì Có Sản Phẩm Đang Sử Dụng!",{
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


    return(
        <div>
        <div className="main">

            <div className="main__title">
                <span className="main__title-text">
                    Chi tiết Danh Mục
                </span>
                <span className="main__title-des">
                    Chi tiết của mỗi danh mục
                </span>
            </div>
            <div className="main__form">
                <div className="form__product-id">
                <label className="form__product-id-title">
                        ID Danh Mục: <span>{initCategoryId}</span>
                    </label>
                    <label className="form__product-id-title">
                        Tên Danh Mục: <span>{initialCategoryName}</span>
                    </label>
                    <input type="text" className="form__product-id-input " placeholder="Nhập vào tên Danh Mục" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        
                    />
                </div>
                <div className="form__product-cate-id">
                    <label className="form__product-id-title">
                        Mô Tả : <span>{initiaCategoryDescription}</span>
                    </label>

                    <input type="text" className="form__product-id-input" placeholder="Nhập vào mô tả Danh Mục" 
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                </div> 
                <div className="form__product-check d-flex align-items-center">
                <div class="form__category-check me-3">
                    <Link to="/admin/all_category" >
                        <button class="form__category-btn form__input-btn">
                        <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                Trở về
                        </button>
                    </Link>
                </div>
                <div class="form__category-check me-3">
                    <button className="form__product-btn form__input-btn"
                             onClick={openModal}
                    >
                        Cập Nhật Danh Mục
                    </button>
                </div>
                <div class="form__category-check me-3">
                    <button className="form__product-btn form__input-btn "
                           onClick={openModal2}
                    >
                        Xóa Danh Mục
                    </button>
                </div>
                </div>
            </div>
        </div>
                
        <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} className="react_modal ReactModal_Content">

                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>            
                <ToastContainer 
                style={{
                    width: "400px",
                    fontSize: "18px",
                }} 
                />
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn muốn cập nhật danh mục này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={updateCategory}>
                         Có
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal}>
                         Không
                    </button>
                </div>
                </div>
        </ReactModal>
        <ReactModal isOpen={isModalOpen2} onRequestClose={closeModal2} className="react_modal ReactModal_Content">
                <div className="d-flex flex-column justify-content-center align-items-center"
                 style={
                    {height: "175px",
                    width: "356px",
                    }
                }>
                <ToastContainer 
                    style={{
                        width: "400px",
                        fontSize: "18px",
                    }} 
                />
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Bạn muốn xóa danh mục này?    
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={deleteCategory}>
                         Có
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal2}>
                         Không
                    </button>
                </div>
                </div>
        </ReactModal>

    </div>

    );

}

export default CategoryDetails;