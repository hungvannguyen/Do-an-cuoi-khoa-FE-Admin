import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ClientSetting(){
    const [banner1, setBanner1] = useState("");
    const [banner2, setBanner2] = useState("");
    const [banner3, setBanner3] = useState("");
    const [banner4, setBanner4] = useState("");
    const [banner5, setBanner5] = useState("");
    const [bannerSale, setBannerSale] = useState("");
    const [bannerIntro, setBannerIntro] = useState("");
    const [textBanner1, setTextBanner1] = useState("");
    const [textBanner2, setTextBanner2] = useState("");
    const [textBanner3, setTextBanner3] = useState("");
    const [textFooter, setTextFooter] = useState("");

    const updateClientSetting = () => {
        const clientData = {
            banner1: banner1,
            banner2: banner2,
            banner3: banner3,
            banner4: banner4,
            banner5: banner5,
            sale_banner: bannerSale,
            intro_banner: bannerIntro,
            intro_text1: textBanner1,
            intro_text2: textBanner2,
            intro_text3: textBanner3,
            intro_text_footer: textFooter,
        };
        axios
        .put("/setting/update",clientData,{
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
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
                    Client Setting
                </span>
                <span className="main__title-des">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
                </span>
            </div>
            <div className="main__form row">
                <div className="Col-lg-12 row">
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 1
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 2
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 3
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>

                </div>
                <div className="Col-lg-12 row">
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 4
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 5
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner Cho Mục Giảm Giá
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>

                </div>
                <div className="Col-lg-12 d-flex justify-content-between align-items-center">
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Banner 1
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Banner 2
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Banner 3
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Footer
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 

                        />
                    </div>

                </div>

                
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                    >
                        Áp Dụng
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
    )
}

export default ClientSetting;