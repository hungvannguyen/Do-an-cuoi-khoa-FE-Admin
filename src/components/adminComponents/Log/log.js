import "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Authorized from "../Authorized/authorized"

function Log() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending
  const [filterType, setFilterType] = useState([]);
  const [filterTarget, setFilterTarget] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [logUser, setLogUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentPageState, setCurrentPageState] = useState(1);

      //authorized
      const user = sessionStorage.getItem("role_id");
      const allowedRoles = ["1",];
  
 // Function to handle API call with filters
 const callApiWithFilters = (page, rowPerPage, sort) => {
  let apiEndpoint = `/log/all?sort=${sort}&page=${page}&row_per_page=${rowPerPage}`;

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
    })
    .catch((error) => {
      console.log(error);
    });
};

// Function to handle sorting by a given parameter
const handleSort = (sortParam) => {
  setCurrentPageState(1); // Reset current page to 1 when sorting changes
  setSortOrder(sortParam);
};

// Function to handle previous page navigation
const handlePreviousPage = () => {
  if (currentPageState > 1) {
    setCurrentPageState((prevPage) => prevPage - 1);
  }
};

// Function to handle next page navigation
const handleNextPage = () => {
  if (currentPageState < totalPages) {
    setCurrentPageState((prevPage) => prevPage + 1);
  }
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

// Function to render the pagination buttons with minimized page numbers
const renderPagination = () => {
  if (totalPages === 0) {
    return null;
  }

  const paginationButtons = [];
  const pageToShow = Math.min(totalPages, 12);

  let startPage;
  let endPage;

  if (totalPages <= pageToShow) {
    // Trường hợp totalPages nhỏ hơn hoặc bằng 12
    startPage = 1;
    endPage = totalPages;
  } else {
    // Trường hợp totalPages lớn hơn 12
    if (currentPageState <= 6) {
      // Trang hiện tại nằm ở đầu
      startPage = 1;
      endPage = pageToShow;
    } else if (currentPageState + 5 >= totalPages) {
      // Trang hiện tại nằm gần cuối
      startPage = totalPages - pageToShow + 1;
      endPage = totalPages;
    } else {
      // Trang hiện tại nằm ở giữa
      startPage = currentPageState - 5;
      endPage = currentPageState + 6;
    }
  }

    // Function to handle pagination changes
    const handlePaginationChange = (page) => {
      setCurrentPageState(page);
    };

  // Add pagination buttons for the first pages (1, 2, 3, ...)
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <li
        key={i}
        className={`datatable__footer-list-item ${
          currentPageState === i ? 'active' : ''
        }`}
        onClick={() => handlePaginationChange(i)}
      >
        {i}
      </li>
    );
  }

  return paginationButtons;
};


// Effect to call API when currentPageState changes
useEffect(() => {
  callApiWithFilters(currentPageState, 8, sortOrder);
}, [currentPageState, sortOrder, filterType, filterTarget, filterStatus]);


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
                <label htmlFor="filterType" className="form__sort-text">Filter Type:</label>
                <select
                id="filterType"
                name="filterType"
                value={filterType}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">All</option>
                <option value="create">Create</option>
                <option value="delete">Delete</option>
                <option value="update">Update</option>
                </select>
                <label htmlFor="filterTarget" className="form__sort-text" >Filter Target:</label>
                <select
                id="filterTarget"
                name="filterTarget"
                value={filterTarget}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">All</option>
                <option value="category">Category</option>
                <option value="product">Product</option>
                <option value="user">User</option>
                </select>
                <label htmlFor="filterStatus" className="form__sort-text" >Filter Status:</label>
                <select
                id="filterStatus"
                name="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="form__sellect-sort me-3"
                >
                <option value="all">All</option>
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
    </div>
    </Authorized>
    </div>
  );
}

export default Log;
