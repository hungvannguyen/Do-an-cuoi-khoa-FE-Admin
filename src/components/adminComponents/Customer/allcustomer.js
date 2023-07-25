import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import Authorized from "../Authorized/authorized"

function AllCustomer(){
  const [customers, setCustomers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [isNextPageEnabled, setNextPageEnabled] = useState(true);
  const [isPreviousPageEnabled, setPreviousPageEnabled] = useState(true);


  const user = sessionStorage.getItem("role_id");
  const allowedRoles = ["1",];

    useEffect(() => {
      axios
      .get(`user/all_user?role_id=99&page=${pages}`)
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_page);
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
           <Authorized user={user} allowedRoles={allowedRoles}>
        <div className="main__title">
          <span className="main__title-text">Tất Cả Khách Hàng</span>
          <span className="main__title-des">
            Tất cả khách hàng đang sử dụng dịch vụ của hệ thống
          </span>
        </div>
        <div className="datatable__location">
          <div className="datatable__head">
          </div>
          <div className="datatable__table">
            <table className="datatable__table-frame">
              <thead className="table__head">
                <tr>
                  <th className="table__head-item">ID</th>
                  <th className="table__head-item">Tên</th>
                  <th className="table__head-item">Số Điện Thoại</th>
                  <th className="table__head-item">Tài Khoản</th>
                  <th className="table__head-item">Email</th>
                  <th className="table__head-item">Số Đơn Hàng</th>
                  <th className="table__head-item">Hành Động</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {customers.map((customer) => (
                <tr className="table__body-item">
                  <td className="table__body-data">{customer.id}</td>
                  <td className="table__body-data">{customer.name === null ? <span style={{ color: 'red' }}>Chưa Đặt</span> : customer.name}</td>
                  <td className="table__body-data">{customer.phone_number === null ? <span style={{ color: 'red' }}>Chưa Đặt</span> : customer.phone_number }</td>
                  <td className="table__body-data">{customer.account}</td>
                  <td className="table__body-data">{customer.email}</td>
                  <td className="table__body-data">{customer.order_count}</td>
                  <td className="table__body-data">
                    <div className="d-flex justify-content-around align-items-center">
                    <button className="btn-edit">
                      <Link to={`/admin/user_details/${customer.id}`} className="btn-text">
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
            <li
              className={`datatable__footer-list-item ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={handlePreviousPage}
            >
              Trang trước
            </li>
            {renderPagination()}
            <li
              className={`datatable__footer-list-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              Trang sau
            </li>
          </ul>
        </div>
     
      </div>
        </div>
        </Authorized>
      </div>

    );
}

export default AllCustomer;