import  "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from 'react-modal';
import Authorized from "../Authorized/authorized"

function AllCustomer(){
  const [customers, setCustomers] = useState([]);


  const user = sessionStorage.getItem("role_id");
  const allowedRoles = ["1",];

    useEffect(() => {
      axios
      .get(`user/all_user?role_id=99`)
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    return(
        <div className="main">
           <Authorized user={user} allowedRoles={allowedRoles}>
        <div className="main__title">
          <span className="main__title-text">All Customer</span>
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
                  <th className="table__head-item">ID</th>
                  <th className="table__head-item">Tên</th>
                  <th className="table__head-item">Số Điện Thoại</th>
                  <th className="table__head-item">Tài Khoản</th>
                  <th className="table__head-item">Email</th>
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
          <div className="datatable__footer">
            <div className="datatable__footer-description">
              <span className="datatable__footer-description-text">Showing 1 to 10 of 57 entries</span>
            </div>
            <div className="datatable__footer-page">
              <ul className="datatable__footer-page-list">
                <li className="datatable__footer-list-item datatable__footer-list-item--disabled">Previous</li>
                <li className="datatable__footer-list-item datatable__footer-list-item--enabled">1</li>
                <li className="datatable__footer-list-item">2</li>
                <li className="datatable__footer-list-item">3</li>
                <li className="datatable__footer-list-item">4</li>
                <li className="datatable__footer-list-item">5</li>
                <li className="datatable__footer-list-item">6</li>
                <li className="datatable__footer-list-item">Next</li>
              </ul>
            </div>
          </div>
        </div>
        </Authorized>
      </div>

    );
}

export default AllCustomer;