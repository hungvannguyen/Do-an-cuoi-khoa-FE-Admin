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

      //authorized
      const user = sessionStorage.getItem("role_id");
      const allowedRoles = ["1",];
  

  // Function to call the API with sorting and optional filter parameters
  const callApiWithFilters = (page, rowPerPage, sort) => {
    let apiEndpoint = `/log/all?sort=${sort}&page=${page}&row_per_page=${rowPerPage}`;

    // Add optional filter parameters if they are provided
    if (filterType.length > 0 && !filterType.includes("all")) {
      apiEndpoint += `&type=${filterType.join(",")}`;
    }
    if (filterTarget && filterTarget !== "all") {
      apiEndpoint += `&target=${filterTarget}`;
    }
    if (filterStatus && filterStatus !== "all") {
      apiEndpoint += `&status=${filterStatus}`;
    }

    axios
      .get(apiEndpoint)
      .then((response) => {
        console.log(response.data);
        setLogs(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_page);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // Initial API call with default parameters (sort=asc, row_per_page=8)
    callApiWithFilters(currentPage, 8, sortOrder);
  }, [currentPage, sortOrder, filterType, filterTarget, filterStatus]);

  // Function to handle sorting by a given parameter
  const handleSort = (sortParam) => {
    setCurrentPage(1); // Reset current page to 1 when sorting changes
    setSortOrder(sortParam);
  };

  // Function to handle previous page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  // Function to handle next page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to render the pagination buttons
  const renderPagination = () => {
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <li
          key={i}
          className={`datatable__footer-list-item ${
            currentPage === i ? "active" : ""
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }
    return paginationButtons;
  };

 // Function to handle filter changes
 const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "filterType") {
      // For 'type' filter, if 'All' is selected, clear other selected options
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      if (selectedOptions.includes("all")) {
        setFilterType(["all"]);
      } else {
        setFilterType(selectedOptions.filter((option) => option !== "all"));
      }
    } else if (name === "filterTarget") {
      setFilterTarget(value);
    } else if (name === "filterStatus") {
      setFilterStatus(value);
    }
  };

  return (
    <div>
    <Authorized user={user} allowedRoles={allowedRoles}>
    <div className="main">
      <div className="main__title">
        <span className="main__title-text">Edit History</span>
        <span className="main__title-des">
          DataTables is a third-party plugin used to generate the demo table
          below. For more information about DataTables,{" "}
          <span>please visit the official Datatables documentation.</span>
        </span>
      </div>
      <div className="datatable__location">
        <div className="datatable__head">
        <div className="datatable__head-show">
            {/* Buttons for sorting */}
            <div className="datatable__footer-sort">
            <button
                className={`datatable__sort-button ${
                sortOrder === "asc" ? "active" : ""
                }`}
                onClick={() => handleSort("asc")}
            >
                Sort Asc
            </button>
            <button
                className={`datatable__sort-button ${
                sortOrder === "desc" ? "active" : ""
                }`}
                onClick={() => handleSort("desc")}
            >
                Sort Desc
            </button>
            </div>
        </div>
        <div className="datatable__head-search">
            {/* Filter options */}
            <div className="datatable__footer-filter">
                <label htmlFor="filterType">Filter Type:</label>
                <select
                id="filterType"
                name="filterType"
                value={filterType}
                onChange={handleFilterChange}
                >
                <option value="all">All</option>
                <option value="create">Create</option>
                <option value="delete">Delete</option>
                <option value="put">Put</option>
                </select>
                <label htmlFor="filterTarget">Filter Target:</label>
                <select
                id="filterTarget"
                name="filterTarget"
                value={filterTarget}
                onChange={handleFilterChange}
                >
                <option value="all">All</option>
                <option value="category">Category</option>
                <option value="product">Product</option>
                <option value="user">User</option>
                </select>
                <label htmlFor="filterStatus">Filter Status:</label>
                <select
                id="filterStatus"
                name="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                >
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                </select>
                <button onClick={() => setCurrentPage(1)}>Apply Filters</button>
            </div>
        </div>
        </div>
        <div className="datatable__table">
          <table className="datatable__table-frame">
            <thead className="table__head">
              <tr>
                <th className="table__head-item">ID</th>
                <th className="table__head-item">Method</th>
                <th className="table__head-item">Item</th>
                <th className="table__head-item">Action</th>
                <th className="table__head-item">Status</th>
                <th className="table__head-item">Timestamp</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {logs.map((log) => (
                <tr className="table__body-item" key={log.id}>
                  <td className="table__body-data">{log.id}</td>
                  <td className="table__body-data">{log.type}</td>
                  <td className="table__body-data">{log.target}</td>
                  <td className="table__body-data">{log.comment}</td>
                  <td className="table__body-data">{log.status}</td>
                  <td className="table__body-data">{log.insert_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <div className="datatable__footer mt-30">
        <div className="datatable__footer-description">
          <span className="datatable__footer-description-text">
            Showing {currentPage} of {totalPages} pages
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
              Previous Page
            </li>
            {renderPagination()}
            <li
              className={`datatable__footer-list-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              Next Page
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
