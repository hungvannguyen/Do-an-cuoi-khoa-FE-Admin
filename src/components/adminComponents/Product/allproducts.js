import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";

function AllProducts(){ 
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
 
      
    useEffect(() => {
      axios
      .get(`/product/all/${pages}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        console.log("P" + response.data.current_page);
        console.log(response.data);
        console.log(typeof response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [pages]);


    const handleFirstPage = () => {
      setCurrentPage(1);
      setPages(1);
    };

    const handleLastPage = () => {
      setCurrentPage(totalPages);
      setPages(totalPages);
    };

    const formatNumber = (number) => {
      return number.toLocaleString("vi-VN");
    };

    return(   
       <div className="main">
        <div className="main__title">
          <span className="main__title-text">All Category</span>
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
                  <th className="table__head-item">Name</th>
                  <th className="table__head-item">Description</th>
                  <th className="table__head-item">image</th>
                  <th className="table__head-item">is sale</th>
                  <th className="table__head-item">sale percent</th>
                  <th className="table__head-item">quantity</th>
                  <th className="table__head-item">price</th>
                  <th className="table__head-item">Action</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {products.map((product) => (
                <tr className="table__body-item">
                  <td className="table__body-data">{product.name}</td>
                  <td className="table__body-data">{product.description}</td>
                  <td className="table__body-data">{product.img_url}</td>
                  <td className="table__body-data">{product.is_sale}</td>
                  <td className="table__body-data">{product.sale_percent}</td>
                  <td className="table__body-data">{product.quantity}</td>
                  <td className="table__body-data">{product.price} VNĐ</td>
                  <td className="table__body-data"> 
                    <button className="table__body-btn table__body-btn--edit">Details</button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="datatable__footer">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text">Showing {currentPage} to {currentPage + products.length - 1} of {totalPages} entries</span>
            </div>
            <div className="datatable__footer-page">
              <ul className="datatable__footer-page-list">
                <li className="datatable__footer-list-item datatable__footer-list-item--disabled">Previous</li>
                {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`datatable__footer-list-item ${
                    i + 1 === currentPage ? "datatable__footer-list-item--enabled" : ""
                  }`}
                >
                  {i + 1}
                </li>
              ))}
                <li className="datatable__footer-list-item">Next</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AllProducts;