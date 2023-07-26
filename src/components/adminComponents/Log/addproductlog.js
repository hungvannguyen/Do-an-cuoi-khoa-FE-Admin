import "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Authorized from "../Authorized/authorized"
import { Link, useNavigate, useLocation } from "react-router-dom";

const AddProductLog = () => {
    //authorized
    const user = sessionStorage.getItem("role_id");
    const allowedRoles = ["1",];

    const [logs, setLogs] = useState([]);
    const [pages, setPages] = useState([1, 2, 3]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const [errorMessage, setErrorMessage] = useState("");
    const [isNextPageEnabled, setNextPageEnabled] = useState(true);
    const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);

    useEffect(() => {
        axios
        .get(`/import/all?page=${currentPage}`)
        .then((response) => {
            setLogs(response.data.data);
            setTotalPages(response.data.total_page);
            setCurrentPage(response.data.current_page);
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
        .catch((err) => {
            console.log(err);
            setLogs([]);
            setErrorMessage("Không có dữ liệu"); // Có lỗi hoặc không kết nối đến API
        });
    }, [currentPage]);

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
  

    return(
        <Authorized user={user} allowedRoles={allowedRoles}>
        <div className="main">
          <div className="main__title">
            <span className="main__title-text">Lịch sử nhập hàng</span>
            <span className="main__title-des">
                Lịch sử nhập hàng của cửa hàng
            </span>
          </div>
          <div className="datatable__location">
            <div className="datatable__table">
              <table className="datatable__table-frame">
                <thead className="table__head">
                  <tr>
                    <th className="table__head-item">ID</th>
                    <th className="table__head-item">Người Thực Hiện</th>
                    <th className="table__head-item">Số Lượng Nhập</th>
                    <th className="table__head-item">Tổng Tiền Nhập</th>
                    <th className="table__head-item">Thời Gian</th>
                    <th className="table__head-item">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {logs.length === 0 && (
                    <div className="no-data-message">{errorMessage}</div>
                  )}
                  {logs.map((log) => {
                    return(
                    <tr className="table__body-item" key={log.id}>
                      <td className="table__body-data">{log.id}</td>
                      <td className="table__body-data">{log.name}</td>
                      <td className="table__body-data">{log.import_quantity}</td>
                      <td className="table__body-data">{formatNumber(log.total_import_price)} VNĐ</td>
                      <td className="table__body-data">{log.import_at}</td>
                      <td className="table__body-data">
                        <div className="d-flex align-items-center justify-content-around">
                            <button className="btn-edit">
                                <Link to={`/admin/addproduct_log/detail/${log.id}`} className="btn-text">
                                    Chi Tiết
                                </Link>
                            </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
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
        </Authorized>
    );
}

export default AddProductLog;

