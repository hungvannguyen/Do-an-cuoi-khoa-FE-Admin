import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";



function AllOders(){
  const [isNextPageEnabled, setNextPageEnabled] = useState(true);
  const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);
  const [pages, setPages] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [errorMessage, setErrorMessage] = useState(null)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderStatusFromUrl = queryParams.get('status');
  
  // Sử dụng hook useState để tạo biến orderStatus và setOrderStatus
  const [orderStatus, setOrderStatus] = useState(orderStatusFromUrl || 111);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let apiEndpoint = `/order/admin/all?page=${currentPage}`;
    if (orderStatus !== 111) {
      apiEndpoint += `&order_status=${orderStatus}`;
    }
  
    axios
      .get(apiEndpoint, {
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
        setPages((prevPages) => {
          const currentPageIndex = prevPages.indexOf(response.data.current_page);
          if (currentPageIndex === -1) {
            // Nếu trang hiện tại chưa có trong mảng, cần xoá trang đầu tiên trong mảng và thêm trang hiện tại vào cuối
            prevPages.shift();
            prevPages.push(response.data.current_page);
          } else if (currentPageIndex === prevPages.length - 1) {
            // Nếu trang hiện tại đã là trang cuối trong mảng, cần chuyển các trang lên 1 bậc
            prevPages = prevPages.map((page) => page - 1);
          } else {
            // Nếu trang hiện tại không nằm ở đầu hoặc cuối mảng, cần di chuyển trang hiện tại và các trang bên phải lên 1 bậc
            prevPages.splice(currentPageIndex, 1);
            prevPages = [response.data.current_page - 1, response.data.current_page, response.data.current_page + 1];
          }
          return prevPages;
        });

      })
      .catch((error) => {
        console.log(error);
        setOrders([]); // Đặt orders về mảng rỗng để không hiển thị dữ liệu cũ
    setErrorMessage("Không có dữ liệu"); // Có lỗi hoặc không kết nối đến API
      });
  }, [currentPage, orderStatus]);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  
  // Hàm render phân trang
  const renderPagination = () => {
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    let pagesToRender = [currentPage];
  
    if (totalPages > 1) {
      if (currentPage === 1) {
        pagesToRender = [currentPage, nextPage];
      } else if (currentPage === totalPages) {
        pagesToRender = [prevPage, currentPage];
      } else {
        pagesToRender = [prevPage, currentPage, nextPage];
      }
    }
  
    return (
      <>
        <li className={`datatable__footer-list-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={handleFirstPage}>
          Trang đầu
        </li>
        <li className={`datatable__footer-list-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePreviousPage}>
        <i class="fa-solid fa-angles-left features__item-main-icon"></i>
        </li>
        {pagesToRender.map((pageNumber) => (
          <li
            className={`datatable__footer-list-item ${currentPage === pageNumber ? 'active' : ''}`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        <li className={`datatable__footer-list-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNextPage}>
          <i class="fa-solid fa-angles-right features__item-main-icon"></i>
        </li>
        <li className={`datatable__footer-list-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleLastPage}>
          Trang cuối
        </li>
      </>
    );
  };

      // Format number
    const formatNumber = (number) => {
      return number.toLocaleString("vi-VN");
    };

    const handleOrderStatusChange = (event) => {
      const selectedOrderStatus = event.target.value;
      setOrderStatus(Number(selectedOrderStatus));
    };

    return(
        <div className="main">
        <div className="main__title">
          <span className="main__title-text">Tất Cả Đơn Hàng</span>
          <span className="main__title-des">
            Hiển thị tất cả đơn hàng của khách hàng
          </span>
        </div>

        <div className="datatable__location">
          <div className="datatable__head">
            <div className="datatable__head-show">
              <span className="form__sort-text">Trạng thái: </span>
              <select
                value={orderStatus.toString()} // Convert to string to match option value type
                onChange={handleOrderStatusChange}
                className="form__sellect-sort me-3"
              >
                <option value="111">Tất Cả</option>
                <option value="0">Chờ Xác Nhận</option>
                <option value="1">Đã Xác Nhận</option>
                <option value="2">Đang Vận Chuyển</option>
                <option value="10">Đã Giao Hàng</option>
                <option value="100">Hoàn Thành</option>
                <option value="99">Hủy Đơn</option>
                <option value="50">Đã Hoàn Hàng</option>
                <option value="49">Yêu Cầu Hoàn Hàng</option>
              </select>
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
                  {orders.length === 0 && (
                    <div className="no-data-message">{errorMessage}</div>
                  )} 
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
                          return <span style={{ color: 'red' }}>Đã Hủy Đơn</span>;
                        } else if( order.status === 50){
                          return <span style={{ color: '#af3a94' }}>Đã Hoàn Hàng</span>;
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
                      if(order.payment_status > 0){
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

          <div className="datatable__footer mt-30">
        <div className="datatable__footer-description">
          <span className="datatable__footer-description-text">
            Hiển thị trang {currentPage} trong tổng số {totalPages} trang
          </span>
        </div>
        <div className="datatable__footer-page">
          <ul className="datatable__footer-page-list">
            {renderPagination()}
          </ul>
        </div>
      </div>
        </div>
      </div>

    );
}

export default AllOders;