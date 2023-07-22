import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';

function AllEmployee(){
     const [employee, setEmployee] = useState([]);
     const [pages, setPages] = useState(1);
     const [currentPage, setCurrentPage] = useState();
     const [totalPages, setTotalPages] = useState();
     const [isNextPageEnabled, setNextPageEnabled] = useState(true);
     const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);

     useEffect(() => {
          axios
          .get(`user/all_user?role_id=10&page=${pages}`)
          .then((response) => {
               console.log(response.data);

               setCurrentPage(response.data.current_page);
               setTotalPages(response.data.total_page);
               setEmployee(response.data.data);
               console.log(employee)
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



    return(
        <div className="main">
        <div className="main__title">
             <span className="main__title-text">
                  All Employee
             </span>
             <span className="main__title-des">
                  DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
             </span>
        </div>
        <div className="datatable__location">
             <div className="datatable__head">
                  <div className="datatable__head-show">
                       <span className="datatable__show-text">
                            Show
                       </span>
                       <input type="number" name="" id="datatable__show-number" min="5" max="20" step="5"
                            value="10" />
                       <span className="datatable__show-text">
                            entries
                       </span>
                  </div>
                  <div className="datatable__head-search">
                       <span className="datatable__search-text">
                            Search:
                       </span>
                       <input type="text" className="datatable__search-input" />
                  </div>
             </div>
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
}

export default AllEmployee;