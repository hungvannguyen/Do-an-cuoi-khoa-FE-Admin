import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function AllOders(){
  const [pages, setPages] = useState(1);
  const [isNextPageEnabled, setNextPageEnabled] = useState(true);
  const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();


  const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
        .get(`/order/admin/all?page=${pages}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
            console.log(response.data);
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.total_page);
            setOrders(response.data.data);
            console.log("P" + response.data.current_page);
            console.log(response.data);
            console.log(typeof response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [pages]);

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

    const handlePageChange = (page) => {
      // setLoading(true);
      setPages(page);
      setCurrentPage(page);
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

      // Format number
    const formatNumber = (number) => {
      return number.toLocaleString("vi-VN");
    };

    return(
        <div className="main">
        <div className="main__title">
          <span className="main__title-text">Tất Cả Đơn Hàng</span>
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
                  <th className="table__head-item">Số Điện Thoại</th>
                  <th className="table__head-item">Địa Chỉ</th>
                
                  <th className="table__head-item">Trạng Thái</th>
                  <th className="table__head-item">Tổng Tiền</th>
                  <th className="table__head-item">Trạng Thái Giao Dịch</th>
                  <th className="table__head-item">Phương Thức Thanh Toán</th>
                  <th className="table__head-item">Hành Động</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {orders.map((order) => (
                  <tr className="table__body-item">
                    <td className="table__body-data">{order.id}</td>
                    <td className="table__body-data">{order.name}</td>
                    <td className="table__body-data">{order.phone_number}</td>
                    <td className="table__body-data">{order.address}</td>
             
                    <td className="table__body-data">
                      {(() => {
                        if (order.status === 0) {
                          return <span style={{ color: '#8D8D8D' }}>Chờ Xác nhận</span>;
                        } else if (order.status === 1) {
                          return <span style={{ color: '#c69600' }}>Đã Xác nhận</span>;
                        } else if (order.status === 2) {
                          return <span style={{ color: '#00bcdd' }}>Đang Vận Chuyển</span>;
                        } else if (order.status === 10) {
                          return <span style={{ color: '#001bc6' }}>Đã Giao Hàng</span>;
                        } else if (order.status === 100) {
                          return <span style={{ color: '#00dd00' }}>Hoàn Thành</span>;
                        } else if (order.status === 99) {
                          return <span style={{ color: 'red' }}>Hủy Đơn</span>;
                        } else if( order.status === 50){
                          return <span style={{ color: '#af3a94' }}>Hoàn Hàng</span>;
                        }else if ( order.status === 49){
                          return <span style={{ color: '#9b6432' }}>Yêu Cầu Hoàn Hàng</span>;
                        }else{
                          return <span style={{ color: 'red' }}>Không Xác Định</span>;
                        }
                      })()}
                      </td>
                    <td className="table__body-data">
                      {formatNumber(order.total_price)} VNĐ
                    </td>
                    <td className="table__body-data">{(() => {
                      if(order.payment_status === 99){
                        return <span style={{ color: 'red' }}>Chưa Thanh Toán</span>;
                      }else if (order.payment_status === 0){
                        return <span style={{ color: 'green' }}>Đã Thanh Toán</span>;
                      }
                    })()}  
                    </td>
                    <td className="table__body-data" style={{ textAlign:"center"}}>
                    {(() => {
                      if (order.payment_type_id === 1) {
                        return <span style={{ color: 'green', fontSize:"35px",}}
                        title="Thanh toán bằng thẻ tín dụng"
                        >
                          <i className="fa-solid fa-credit-card"></i>
                          </span>;
                      } else if (order.payment_type_id === 2) {
                        return <span style={{ color: 'blue', fontSize:"35px" }}
                        title="Thanh toán khi nhận hàng"
                        >
                          <i className="fa-regular fa-money-bill-1"></i>
                          </span>;
                      }else{
                        return <span />;
                      }
                    })()}
                    </td>
                    <td className="table__body-data">
                      <div className="d-flex align-items-center justify-content-around">
                      <button className="btn-edit">
                      <Link to={`/admin/order_details/${order.id}`} className="btn-text">
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

          <div className="datatable__footer">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text">Showing {currentPage} of {totalPages} pages</span>
            </div>
            <div className="datatable__footer-page">

              <ul className="datatable__footer-page-list">
              <li
                className={`datatable__footer-list-item ${currentPage === 1 || !isPreviousPageEnabled ? 'disabled' : ''}`}
                onClick={isPreviousPageEnabled ? handlePreviousPage : null}
              >
                Trang trước
              </li>
              {renderPagination()}
              <li
                className={`datatable__footer-list-item ${currentPage === totalPages || !isNextPageEnabled ? 'disabled' : ''}`}
                onClick={isNextPageEnabled ? handleNextPage : null}
              >
                Trang sau
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
}

export default AllOders;