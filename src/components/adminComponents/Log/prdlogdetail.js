import "../../../pages/admin/Styles/css/allCss.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Authorized from "../Authorized/authorized"
import { Link, useParams } from "react-router-dom";

const ProductLogDetail = () => {
    const { id } = useParams();
    //authorized
    const user = sessionStorage.getItem("role_id");
    const allowedRoles = ["1",];

    const [logDetail, setLogDetail] = useState([]);

    useEffect(() => {
        axios
        .get(`/import/${id}`)
        .then((response) => {
            setLogDetail(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    // Format number
    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
    };

return(
    <Authorized user={user} allowedRoles={allowedRoles}>
        <div className="main">
            <div className="main__title">
                <span className="main__title-text">
                    Chi Tiết Nhập Hàng
                </span>
                <span className="main__title-des">
                    Chi tiết của phiếu nhập hàng {id}
                </span>
            </div>
            <div className="main__form">
            <div className="datatable__table">
              <table className="datatable__table-frame">
                <thead className="table__head">
                  <tr>
                    <th className="table__head-item">ID Sản phẩm</th>
                    <th className="table__head-item">Tên Sản Phẩm</th>
                    <th className="table__head-item">Số Lượng Nhập</th>
                    <th className="table__head-item">Tiền Nhập</th>
                    <th className="table__head-item">Tổng Tiền Nhập</th>
                  </tr>
                </thead>
                <tbody className="table__body">
                  {logDetail.map((log) => {
                    return(
                    <tr className="table__body-item" key={log.id}>
                      <td className="table__body-data">{log.prd_id}</td>
                      <td className="table__body-data">{log.name}</td>
                      <td className="table__body-data">{log.quantity}</td>
                      <td className="table__body-data">{formatNumber(log.import_price)} VNĐ</td>
                      <td className="table__body-data">{formatNumber(log.import_price * log.quantity)} VNĐ</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="form__product-check d-flex align-items-center">
                    <div class="form__category-check me-3">
                        <Link to="/admin/addproduct_log" >
                            <button class="form__category-btn form__input-btn">
                            <i className="fas fa-angle-left features__item-main-arrow me-3"></i>
                                    Trở về
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </Authorized>
    );
}

export default ProductLogDetail;