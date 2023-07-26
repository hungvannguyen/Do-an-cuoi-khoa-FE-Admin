import "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Authorized from "../Authorized/authorized"

function Log() {
  const [logs, setLogs] = useState([]);
  const [pages, setPages] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order is ascending
  const [filterType, setFilterType] = useState([]);
  const [filterTarget, setFilterTarget] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [logUser, setLogUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const [rowPerPage, setRowPerPage] = useState(10);

  const [errorMessage, setErrorMessage] = useState(null)

      //authorized
      const user = sessionStorage.getItem("role_id");
      const allowedRoles = ["1",];
  
 // Function to handle API call with filters
 useEffect(() => {
  let apiEndpoint = `/log/all?sort=${sortOrder}&page=${currentPage}&row_per_page=${rowPerPage}`;
  // Add optional filter parameters if they are provided
  if (filterType.length > 0 && !filterType.includes('all')) {
    apiEndpoint += `&type=${filterType.join(',')}`;
  }
  if (filterTarget && filterTarget !== 'all') {
    apiEndpoint += `&target=${filterTarget}`;
  }
  if (filterStatus && filterStatus !== 'all') {
    apiEndpoint += `&status=${filterStatus}`;
  }

  axios
    .get(apiEndpoint)
    .then((response) => {
      console.log(response.data);
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
    .catch((error) => {
      console.log(error);
      setLogs([]);
      setErrorMessage("Không có dữ liệu");
    });
},[sortOrder, currentPage, rowPerPage, filterType, filterTarget, filterStatus]);

// Function to handle sorting by a given parameter
const handleSort = (sortParam) => {
  setCurrentPage(1); // Reset current page to 1 when sorting changes
  setSortOrder(sortParam);
};


// Function to handle filter changes
const handleFilterChange = (event) => {
  const { name, value } = event.target;
  if (name === 'filterType') {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (selectedOptions.includes('all')) {
      setFilterType(['all']);
    } else {
      setFilterType(selectedOptions.filter((option) => option !== 'all'));
    }
  } else if (name === 'filterTarget') {
    setFilterTarget(value);
  } else if (name === 'filterStatus') {
    setFilterStatus(value);
  }
};

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




  return (
    <div>
    <Authorized user={user} allowedRoles={allowedRoles}>
    <div className="main">
      <div className="main__title">
        <span className="main__title-text">Lịch sử chỉnh sửa</span>
        <span className="main__title-des">
            Lịch sử chỉnh sửa của cửa hàng
        </span>
      </div>
      <div className="datatable__location">
        <div className="datatable__head">
        <div className="datatable__head-show">
            {/* Buttons for sorting */}
            <div className="datatable__footer-sort">
            <button
                className={`sort__select ${
                sortOrder === "asc" ? "sort__select-active" : ""
                }`}
                onClick={() => handleSort("asc")}
            >
                Sắp xếp tăng dần
            </button>
            <button
                className={`sort__select ${
                sortOrder === "desc" ? "sort__select-active" : ""
                }`}
                onClick={() => handleSort("desc")}
            >
                Sắp xếp giảm dần
            </button>
            </div>
        </div>
        <div className="datatable__head-search">
            {/* Filter options */}
            <div className="datatable__footer-filter">
                <label htmlFor="filterType" className="form__sort-text">Phương Thức:</label>
                <select
                id="filterType"
                name="filterType"
                value={filterType}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">Tất Cả</option>
                <option value="create">Create</option>
                <option value="delete">Delete</option>
                <option value="update">Update</option>
                </select>
                <label htmlFor="filterTarget" className="form__sort-text" >Mục:</label>
                <select
                id="filterTarget"
                name="filterTarget"
                value={filterTarget}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">Tất Cả</option>
                <option value="category">Category</option>
                <option value="product">Product</option>
                <option value="user">User</option>
                </select>
                <label htmlFor="filterStatus" className="form__sort-text" >Trạng Thái:</label>
                <select
                id="filterStatus"
                name="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">Tất Cả</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                </select>
                {/* <button onClick={() => setCurrentPage(1)} style={{display:"none"}}>Áp dụng</button> */}
            </div>
        </div>
        </div>
        <div className="datatable__table">
          <table className="datatable__table-frame">
            <thead className="table__head">
              <tr>
                <th className="table__head-item">ID</th>
                <th className="table__head-item">Người thực hiện</th>
                <th className="table__head-item">Phương Thức</th>
                <th className="table__head-item">Mục</th>
                <th className="table__head-item">Chi Tiết</th>
                <th className="table__head-item">Trạng Thái</th>
                <th className="table__head-item">Thời Gian</th>
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
                  <td className="table__body-data">{log.type}</td>
                  <td className="table__body-data">{log.target}</td>
                  <td className="table__body-data">{log.comment}</td>
                  <td className="table__body-data">{log.status}</td>
                  <td className="table__body-data">{log.insert_at}</td>
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
    </div>
  );
}

export default Log;
