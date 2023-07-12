import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";

function AllProducts(){ 
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [quantityValue, setQuantityValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [idSave, setIdSave] = useState("");
  const [isValid, setIsValid] = useState("");
  const [isNextPageEnabled, setNextPageEnabled] = useState(true);
  const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);

  //error
  const [quantityError, setQuantityError] = useState("");
      
    useEffect(() => {
      axios
      .get(`/product/all/?page=${pages}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_page);
        console.log("P" + response.data.current_page);
        console.log(response.data);
        console.log(typeof response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [pages, quantityValue]);

    const handlePreviousPage = () => {
      if (pages > 1) {
        setCurrentPage(pages - 1);
        setPages(pages - 1);
      } 
    };
    
    const handleNextPage = () => {
      setCurrentPage(pages + 1);
      setPages(pages + 1);
      }

    const handleFirstPage = () => {
      setCurrentPage(1);
      setPages(1);
    };

    const handleLastPage = () => {
      setCurrentPage(totalPages);
      setPages(totalPages);
    };

    const handlePageChange = (pages) => {
      // setLoading(true);
      setPages(pages);
      setCurrentPage(pages);
    };

    // Hàm render phân trang
const renderPagination = () => {
  const pageNumbers = [];

  // Tạo một mảng chứa các số trang từ 1 đến totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.map((pageNumber) => (
        <li
          className={`datatable__footer-list-item ${currentPage === pageNumber ? 'active' : ''}`}
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </>
  );
};

useEffect(() => {
  if (currentPage === totalPages) {
    setNextPageEnabled(false);
  } else {
    setNextPageEnabled(true);
  }
}, [currentPage, totalPages]);

useEffect(() => {
  if (currentPage === 1) {
    setPreviousPageEnabled(false);
  } else {
    setPreviousPageEnabled(true);
  }
}, [currentPage]);

    const formatNumber = (number) => {
      return number.toLocaleString("vi-VN");
    };

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setQuantityValue("");
    };

    
    const openModal2 = () => {
      setIsModalOpen2(true);
    };
  
    const closeModal2 = () => {
      setIsModalOpen2(false);
    };

    const handleIdSave = (e) => {
      setIdSave(e.target.value);
      if(!isValid){
        setIsValid(false);
        setQuantityError("");
      }
    };

    const handleQuantityAdd = (e) => {
      e.preventDefault();
      setIsValid(true);
      if (quantityValue === "") {
        setQuantityError("Quantity is required");
        setIsValid(false);
      }else if(quantityValue <= 0){
        setQuantityError("Quantity must be greater than 0");
        setIsValid(false);
      }
      console.log(idSave);
      console.log(quantityValue);
      if(isValid){
        axios
        .post(`/product/add_quantity?prd_id=${idSave}&quantity=${quantityValue}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        })
        .then((response) => {
          console.log(response.data);
          closeModal2();
          toast.success("Update quantity successfully!",{
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
            window.location.href = "/admin/all_product";
       }, 1500);
  
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        console.log("error");
      }
    };


    return(   
      <div className="main">

        <div className="main__title">
          <span className="main__title-text">All Product</span>
          <span className="main__title-des">
            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
          </span>
        </div>
        <div className="datatable__location">
          <div className="datatable__head">
            <div className="datatable__head-show">
              <span className="datatable__show-text">Show</span>
              <input type="number" name="" id="datatable__show-number" min="5" max="20" step="5" value="10" />
              <span className="datatable__show-text">entries</span>
            </div>
            <div className="datatable__head-search">
              <span className="datatable__search-text">Search:</span>
              <input type="text" className="datatable__search-input" />
            </div>
          </div>
          <div className="datatable__table">
            <table className="datatable__table-frame">
              <thead className="table__head">
                <tr>
                  <th className="table__head-item">ID</th>
                  <th className="table__head-item">Tên</th>
                  <th className="table__head-item">Mô tả</th>
                  <th className="table__head-item">Hình Ảnh</th>
                  <th className="table__head-item">Giảm giá</th>
                  <th className="table__head-item">% Giảm Giá</th>
                  <th className="table__head-item">Số Lượng</th>
                  <th className="table__head-item">Giá Nhập</th>
                  <th className="table__head-item">Giá Bán</th>
                  <th className="table__head-item">Tình Trạng</th>
                  <th className="table__head-item">Hành Động</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {products.map((product) => (
                <tr className="table__body-item" key={product.id}>
                  <td className="table__body-data">{product.id}</td>
                  <td className="table__body-data">{product.name}</td>
                  <td className="table__body-data Max-Width-248px">{product.description}</td>
                  <td className="table__body-data Max-Width-248px">{product.img_url}</td>
                  <td className="table__body-data">
                    {(() =>{
                      if(product.is_sale === 1){
                        return <span style={{color: 'green'}}>Giảm Giá</span>
                      }else if (product.is_sale === 99){
                        return <span style={{color: 'red'}}>Không Giảm Giá</span>
                      }else{
                        return <span ></span>
                      }
                    })()}
                  </td>
                  <td className="table__body-data">{product.sale_percent}%</td>
                  <td className="table__body-data">{product.quantity}</td>
                  <td className="table__body-data">
                    {formatNumber(product.import_price)} VNĐ
                  </td>
                  <td className="table__body-data">
                    {formatNumber(product.price)} VNĐ
                  </td>
                  <td className="table__body-data">
                    {(() =>{
                      if(product.status === 1){
                        return <span style={{color: 'green'}}>Đang Bán</span>
                      }else if (product.status === 99){
                        return <span style={{color: 'red'}}>Không Bán</span>
                      }else{
                        return <span ></span>
                      }
                    })()}
                  </td>
                  <td className="table__body-data d-flex justify-content-around align-items-center"> 
                    <button className="btn-edit ">                    
                      <Link to={`/admin/product_details/${product.id}`} className="btn-text">
                        Chi Tiết
                      </Link>
                    </button>
                    {/* <button
                      className="form__product-btn ms-3"
                      value={product.id}
                      onClick={(e) => {
                        handleIdSave(e);
                        openModal();
                      }}
                    >
                      Add Quantity
                    </button> */}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="datatable__footer">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text"></span>
            </div>
            <div className="datatable__footer-page">
             <ul className="datatable__footer-page-list">
             <li
                className={`datatable__footer-list-item ${currentPage === 1 || !isPreviousPageEnabled ? 'disabled' : ''}`}
                onClick={isPreviousPageEnabled ? handlePreviousPage : null}
              >
                Previous
              </li>
              {renderPagination()}
              <li
                className={`datatable__footer-list-item ${currentPage === totalPages || !isNextPageEnabled ? 'disabled' : ''}`}
                onClick={isNextPageEnabled ? handleNextPage : null}
              >
                Next
              </li>
              </ul>
            </div>
          </div>
          
        </div>
        <ReactModal isOpen={isModalOpen} onRequestClose={closeModal}
            className="react_modal ReactModal__Content"
        >
          <ToastContainer 
          style={{
               width: "400px",
               fontSize: "18px",
          }} 
          />
        <h3 className="d-lex justify-content-center form__product-id-title text-center">Enter Quantity</h3>
        <div className="d-flex flex-column ">
          <input type="number" 
            value={quantityValue} 
            onChange={(e) => setQuantityValue(e.target.value)} 
            className="form__input-reactmodal"
            min={1}
            />  
          <div className="d-flex justify-content-around mt-4">
            <button onClick={openModal2} className="form__input-btn" >Add</button>
            <button onClick={closeModal} className="form__input-btn">Cancel</button>
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
                <h2 className="d-lex justify-content-center form__product-id-title text-center">
                    Are you sure you want to add product quantity?    
                </h2>
                {quantityError && <span className="alert alert-danger" role="alert" style={{fontSize:"16px"}}>{quantityError}</span>
                }
                <div className="d-flex align-items-center justify-content-between">
                    <button className="form__input-btn me-3" onClick={handleQuantityAdd}>
                         Yes
                    </button>
                    <button className="form__input-btn" style={{backgroundColor:"#4C72DE"}} onClick={closeModal2}>
                         No
                    </button>
                </div>
                </div>
        </ReactModal>
      </div>
      
    );
  };

export default AllProducts;