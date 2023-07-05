import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function AllOders(){
  const [pages, setPages] = useState(1);
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
            setOrders(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

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
          <span className="main__title-text">All Order</span>
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
                  <th className="table__head-item">Id</th>
                  <th className="table__head-item">Name</th>
                  <th className="table__head-item">Phone</th>
                  <th className="table__head-item">Address</th>
                
                  <th className="table__head-item">Status</th>
                  <th className="table__head-item">Total Price</th>
                  <th className="table__head-item">Payment Status</th>
                  <th className="table__head-item">Payment Type</th>
                  <th className="table__head-item">Action</th>
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
                          return <span style={{ color: 'gray' }}>Ordered</span>;
                        } else if (order.status === 1) {
                          return <span style={{ color: 'green' }}>Confirmed</span>;
                        } else if (order.status === 2) {
                          return <span style={{ color: 'blue' }}>Being Transported</span>;
                        } else if (order.status === 10) {
                          return <span style={{ color: 'purple' }}>Delivered</span>;
                        } else if (order.status === 100) {
                          return <span style={{ color: 'orange' }}>Completed</span>;
                        } else if (order.status === 99) {
                          return <span style={{ color: 'red' }}>Cancelled</span>;
                        } else {
                          return <span />;
                        }
                      })()}
                      </td>
                    <td className="table__body-data">
                      {formatNumber(order.total_price)} VNĐ
                    </td>
                    <td className="table__body-data">{(() => {
                      if(order.payment_status === 99){
                        return <span style={{ color: 'red' }}>unpaid</span>;
                      }else if (order.payment_status === 0){
                        return <span style={{ color: 'green' }}>paid</span>;
                      }
                    })()}  
                    </td>
                    <td className="table__body-data">
                    {(() => {
                      if (order.payment_type_id === 1) {
                        return <span style={{ color: 'green' }}><i className="fa-solid fa-credit-card"></i></span>;
                      } else if (order.payment_type_id === 2) {
                        return <span style={{ color: 'blue' }}><i className="fa-regular fa-money-bill-1"></i></span>;
                      }else{
                        return <span />;
                      }
                    })()}
                    </td>
                    <td className="table__body-data">
                      <Link to={`/admin/order_details/${order.id}`} className="table__body-link">
                        Details
                      </Link>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="datatable__footer">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text">Showing 1 to 10 of 57 entries</span>
            </div>
            <div className="datatable__footer-page">

              <ul className="datatable__footer-page-list">
              <li
                className={`datatable__footer-list-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={handlePreviousPage}
              >
                Previous
              </li>
                {renderPagination()}
                <li
                className={`datatable__footer-list-item ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={handleNextPage}
              >
                Next
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
}

export default AllOders;