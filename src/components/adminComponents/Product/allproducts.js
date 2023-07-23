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
  const [isNextPageEnabled, setNextPageEnabled] = useState(true);
  const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);
  const [sort, setSort] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

      
  useEffect(() => {
    axios
      .get(`/product/all/?page=${pages}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`)
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
  }, [pages, sort, minPrice, maxPrice]);
  const sortOptions = [
    { value: 0, label: "Tất cả" },
    { value: 1, label: "Giá tăng dần" },
    { value: 2, label: "Giá giảm dần" },
  ];
  
  const handleSortChange = (event) => {
    const selectedSortValue = event.target.value;
    if (selectedSortValue === "0") {
      setSort(0);
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setSort(Number(selectedSortValue));
    }
  };
  
  const handlePriceRangeChange = (event) => {
    const selectedPriceRange = event.target.value;
  
    if (selectedPriceRange === "0-0") {
      // If "All" is selected, reset the sort and price range filters
      setSort(0); // Set sort to 1 for ascending price (you can choose another default if needed)
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      // Parse the selectedPriceRange string to extract min and max price values
      const [min, max] = selectedPriceRange.split("-");
      setSort(3);
      setMinPrice(Number(min));
      setMaxPrice(Number(max));
    }
  };


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


    return(   
      <div className="main">
        <ToastContainer 
            style={{
                width: "400px",
                fontSize: "18px",
            }} 
        />
        <div className="main__title">
          <span className="main__title-text">Tất cả sản phẩm</span>
          <span className="main__title-des">
            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
          </span>
        </div>
        <div className="datatable__location">
          <div className="datatable__head">
            <div className="datatable__head-show">
            <div className="datatable__head-sort">
      <span className="datatable__sort-text">Sort by:</span>
      <select
        value={sort.toString()} // Convert to string to match option value type
        onChange={handleSortChange}
        className="datatable__sort-select"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value.toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="datatable__head-price">
      <span className="datatable__price-text">Price Range:</span>
      <select
        onChange={handlePriceRangeChange}
        className="datatable__price-select"
      >
        <option value="0-0">All</option>
        <option value="100000-500000">100,000 - 500,000</option>
        <option value="500000-1000000">500,000 - 1,000,000</option>
        {/* Add more options as needed */}
      </select>
    </div>
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
                  <td className="table__body-data "> 
                    <div className="d-flex justify-content-around align-items-center">
                      <button className="btn-edit ">                    
                        <Link to={`/admin/product_details/${product.id}`} className="btn-text">
                          Chi Tiết
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="datatable__footer mt-30">
          <div className="datatable__footer-description">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text">Showing {currentPage} of {totalPages} pages</span>
            </div>
            </div>
            <div className="datatable__footer-page">
             <ul className="datatable__footer-page-list">
             <li
                className={`datatable__footer-list-item ${currentPage === 1 || !isPreviousPageEnabled ? 'disabled' : ''}`}
                onClick={isPreviousPageEnabled ? handlePreviousPage : null}
              >
                Trang Trước
              </li>
              {renderPagination()}
              <li
                className={`datatable__footer-list-item ${currentPage === totalPages || !isNextPageEnabled ? 'disabled' : ''}`}
                onClick={isNextPageEnabled ? handleNextPage : null}
              >
                Trang Sau
              </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
      
    );
  };

export default AllProducts;