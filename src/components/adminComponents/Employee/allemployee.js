import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Authorized from "../Authorized/authorized"

function AllEmployee(){
     const [employee, setEmployee] = useState([]);
     const [pages, setPages] = useState([1, 2, 3]);
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState();
     const [isNextPageEnabled, setNextPageEnabled] = useState(true);
     const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);

 
     useEffect(() => {
          axios
          .get(`user/all_user?role_id=10&page=${currentPage}`)
          .then((response) => {
               console.log(response.data);

               setCurrentPage(response.data.current_page);
               setTotalPages(response.data.total_page);
               setEmployee(response.data.data);
               console.log(employee)
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



    return(
          
        <div className="main">
        <div className="main__title">
             <span className="main__title-text">
                  Tất Cả Nhân Viên
             </span>
             <span className="main__title-des">
                    Tất cả nhân viên của hệ thống
             </span>
        </div>
        <div className="datatable__location">
             <div className="datatable__table">
                  <table className="datatable__table-frame">
                       <thead className="table__head">
                            <th className="table__head-item">ID</th>
                            <th className="table__head-item">Tên</th>
                            <th className="table__head-item">Số Điện Thoại</th>
                            <th className="table__head-item">Tài Khoản</th>
                            <th className="table__head-item">Email</th>
                            <th className="table__head-item">Hành Động</th>
                       </thead>
                       <tbody className="table__body">
                         {employee.map((item) => (
                            <tr className="table__body-item">
                                 <td className="table__body-data">{item.id}</td>
                                 <td className="table__body-data">{item.name === null ? <span style={{ color:"red"}}>Chưa đặt</span> : item.name}</td>
                                 <td className="table__body-data">{item.phone_number === null ? <span style={{ color:"red"}}>Chưa đặt</span> : item.phone_number}</td>
                                 <td className="table__body-data">{item.account}</td>
                                 <td className="table__body-data">{item.email}</td>
                                 <td className="table__body-data">
                                   <div className="d-flex justify-content-around align-items-center">
                                   <button className="btn-edit">
                                        <Link to={`/admin/user_details/${item.id}`} className="btn-text">
                                             Chi tiết
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

export default AllEmployee;