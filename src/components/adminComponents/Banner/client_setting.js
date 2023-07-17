import  "../../../pages/admin/Styles/css/allCss.css";
import axios from "axios";
import { useState, useEffect } from "react";
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

    const [banner1Preview, setBanner1Preview] = useState("");
    const [banner2Preview, setBanner2Preview] = useState("");
    const [banner3Preview, setBanner3Preview] = useState("");
    const [banner4Preview, setBanner4Preview] = useState("");
    const [banner5Preview, setBanner5Preview] = useState("");
    const [bannerSalePreview, setBannerSalePreview] = useState("");
    const [bannerIntroPreview, setBannerIntroPreview] = useState("");

    const [crBanner1, setCrBanner1] = useState("");

    const [imageBanners, setImageBanners] = useState([]);



    const handleBanner1 = (event) => {
        handleBannerUpload(event, setBanner1, setBanner1Preview);
    };
    const handleBanner2 = (event) => {
        handleBannerUpload(event, setBanner2, setBanner2Preview);
    };
    const handleBanner3 = (event) => {
        handleBannerUpload(event, setBanner3, setBanner3Preview);
    };
    const handleBanner4 = (event) => {
        handleBannerUpload(event, setBanner4, setBanner4Preview);
    };
    const handleBanner5 = (event) => {
        handleBannerUpload(event, setBanner5, setBanner5Preview);
    };
    const handleBannerSale = (event) => {
        handleBannerUpload(event, setBannerSale, setBannerSalePreview);
    };
    const handleBannerIntro = (event) => {
        handleBannerUpload(event, setBannerIntro, setBannerIntroPreview);
    };
    const handleTextBanner1 = (event) => {
        setTextBanner1(event.target.value);
    };
    const handleTextBanner2 = (event) => {
        setTextBanner2(event.target.value);
    };
    const handleTextBanner3 = (event) => {
        setTextBanner3(event.target.value);
    };
    const handleTextFooter = (event) => {
        setTextFooter(event.target.value);
    };
    const handleUploadBanner1 = (event) => {
        setBanner1(event.target.value);
    };
    const handleUploadBanner2 = (event) => {
        setBanner2(event.target.value);
    };
    const handleUploadBanner3 = (event) => {
        setBanner3(event.target.value);
    };
    const handleUploadBanner4 = (event) => {
        setBanner4(event.target.value);
    };
    const handleUploadBanner5 = (event) => {
        setBanner5(event.target.value);
    };
    const handleUploadBannerSale = (event) => {
        setBannerSale(event.target.value);
    };
    const handleUploadBannerIntro = (event) => {
        setBannerIntro(event.target.value);
    };


 // get client setting
useEffect(() => {
    axios
      .get("/setting/all", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        const banners = [
          response.data.banner_1,
          response.data.banner_2,
          response.data.banner_3,
          response.data.banner_4,
          response.data.banner_5,
          response.data.sale_banner,
          response.data.intro_banner,
        ];
        console.log("banners");
        console.log(banners);
        setBanner1(response.data.banner_1);
        setBanner2(response.data.banner_2);
        setBanner3(response.data.banner_3);
        setBanner4(response.data.banner_4);
        setBanner5(response.data.banner_5);
        setBannerSale(response.data.sale_banner);
        setBannerIntro(response.data.intro_banner);
        setTextBanner1(response.data.intro_text_1);
        setTextBanner2(response.data.intro_text_2);
        setTextBanner3(response.data.intro_text_3);
        setTextFooter(response.data.intro_text_footer);
  
        Promise.all(
          banners.map((banner) =>
            axios
              .get(`/file/img/${banner}`, {
                responseType: "blob",
              })
              .then((response) => URL.createObjectURL(response.data))
              .catch((error) => {
                console.log(error);
                return null;
              })
          )
        )
          .then((imageUrls) => {
            const filteredImageUrls = imageUrls.filter((url) => url !== null);
            setImageBanners(filteredImageUrls);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
    

    const updateClientSetting = () => {
        const clientData = {
            banner_1: banner1,
            banner_2: banner2,
            banner_3: banner3,
            banner_4: banner4,
            banner_5: banner5,
            sale_banner: bannerSale,
            intro_banner: bannerIntro,
            intro_text_1: textBanner1,
            intro_text_2: textBanner2,
            intro_text_3: textBanner3,
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
            toast.success("Cập Nhật Cài Đặt Giao Diện Thành Công!",{
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
            window.location.href = "/admin/client_setting";
       },1500);     
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleBannerUpload = (event, setBanner, setBannerPreview) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post("/file/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const fileName = response.data.filename;
            setBanner(fileName);
            setBannerPreview(URL.createObjectURL(file));
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      console.log("banner1: ", banner1);
        console.log("banner1preview: ", crBanner1);
        console.log("banner2preview: ", banner2Preview);



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
                        <label for="banner1" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file"
                            id="banner1"

                            onChange={handleBanner1}
                        />
                        <input type="text" value={banner1} onChange={handleUploadBanner1} style={{display:"none"}}/>
                        {banner1Preview ? 
                        (<img src={banner1Preview} alt="banner1_preview" width="80%" />) : 
                        (<img src={imageBanners[0]} alt="banner1_preview" width="80%" />)
                        }
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 2
                        </label>
                        <label for="banner2" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="banner2"
                            onChange={handleBanner2}
                        />
                        <input type="text" value={banner2} onChange={handleUploadBanner2} style={{display:"none"}}/>
                        {banner2Preview ? 
                        (<img src={banner2Preview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[1]} alt="banner1_preview" width="80%" />)
                        }
                    </div>
                    <div className="form__product-id col-lg-4">
                        <label className="form__product-id-title">
                            Banner 3
                        </label>
                        <label for="banner3" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="banner3"
                            onChange={handleBanner3}
                        />
                        <input type="text" value={banner3} onChange={handleUploadBanner3} style={{display:"none"}}/>
                        {banner3Preview ?
                        (<img src={banner3Preview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[2]} alt="banner1_preview" width="80%" />)
                        }
                    </div>

                </div>
                <div className="Col-lg-12 row">
                    <div className="form__product-id col-lg-3">
                        <label className="form__product-id-title">
                            Banner 4
                        </label>
                        <label for="banner4" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="banner4"
                            onChange={handleBanner4}
                        />
                        <input type="text" value={banner4} onChange={handleUploadBanner4} style={{display:"none"}}/>
                        {banner4Preview ? 
                        (<img src={banner4Preview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[3]} alt="banner1_preview" width="80%" />)
                        }
                    </div>
                    <div className="form__product-id col-lg-3">
                        <label className="form__product-id-title">
                            Banner 5
                        </label>
                        <label for="banner5" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="banner5"
                            onChange={handleBanner5}
                        />
                         <input type="text" value={banner5} onChange={handleUploadBanner5} style={{display:"none"}}/>
                        {banner5Preview ?
                        (<img src={banner5Preview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[4]} alt="banner1_preview" width="80%" />)
                        }
                    </div>
                    <div className="form__product-id col-lg-3">
                        <label className="form__product-id-title">
                            Banner Cho Mục Giảm Giá
                        </label>
                        <label for="bannersale" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="bannersale"
                            onChange={handleBannerSale}
                        />
                         <input type="text" value={bannerSale} onChange={handleUploadBannerSale} style={{display:"none"}}/>
                        {bannerSalePreview ?
                        (<img src={bannerSalePreview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[5]} alt="banner1_preview" width="80%" />)
                        }
                    </div>
                    <div className="form__product-id col-lg-3">
                        <label className="form__product-id-title">
                            Banner Cho Mục Giới Thiệu
                        </label>
                        <label for="bannerintro" className="uploadimg_btn">
                            Tải Ảnh Lên
                        </label>
                        <input type="file" 
                            id="bannerintro"
                            onChange={handleBannerIntro}
                        />
                         <input type="text" value={bannerIntro} onChange={handleUploadBannerIntro} style={{display:"none"}}/>
                        {bannerIntroPreview ?
                        (<img src={bannerIntroPreview} alt="banner1_preview" width="80%" />) :
                        (<img src={imageBanners[6]} alt="banner1_preview" width="80%" />)
                        }
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
                            value={textBanner1}
                            onChange={handleTextBanner1}
                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Banner 2
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 
                            value={textBanner2}
                            onChange={handleTextBanner2}
                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Banner 3
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 
                            value={textBanner3}
                            onChange={handleTextBanner3}
                        />
                    </div>
                    <div className="form__product-id">
                        <label className="form__product-id-title">
                            Giới thiệu cho Footer
                        </label>
                        <input type="text" 
                            className="form__product-id-input " 
                            placeholder="Enter Category Name" 
                            value={textFooter}
                            onChange={handleTextFooter}
                        />
                    </div>

                </div>

                
                <div className="form__product-check">
                    <button className="form__product-btn form__input-btn"
                        onClick={updateClientSetting}
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