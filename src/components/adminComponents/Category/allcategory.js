import  "../../../pages/admin/Styles/css/allCss.css";
import Authorized from "../Authorized/authorized"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AllCategory() {
     const navigate = useNavigate();
     const [category, setCategory] = useState([]);
     const [loading, setLoading] = useState(true);

     const user = sessionStorage.getItem("role_id");
     const allowedRoles = ["1","10"];


     useEffect(() => {   
          axios
          .get("/category/all")
          .then((response) => {
               console.log(response.data);
               setCategory(response.data);
               
          })
          .catch((error) => {
               console.log(error);
          });
     }, []);


    return(
        <div className="main">
           <Authorized user={user} allowedRoles={allowedRoles}>
        <div className="main__title">
             <span className="main__title-text">
                    Danh sách danh mục
             </span>
             <span className="main__title-des">
                    Danh sách danh mục của cửa hàng
             </span>
        </div>
        <div className="datatable__location">
             {/* <div className="datatable__head">
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
             </div> */}
             <div className="datatable__table">
                  <table className="datatable__table-frame">
                       <thead className="table__head">
                              <th className="table__head-item">ID</th>
                            <th className="table__head-item">Tên</th>
                            <th className="table__head-item">Mô Tả</th>
                            <th className="table__head-item">Hành Động</th>
                       </thead>
                       <tbody className="table__body">
                         {category.map((category) => (
                            <tr className="table__body-item">
                                   <td className="table__body-data">{category.id}</td>
                                 <td className="table__body-data">{category.cat_name}</td>
                                 <td className="table__body-data">{category.cat_description}</td>
                                 <td className="table__body-data">
                                  <div className="d-flex justify-content-around align-items-center">
                                   <button className="btn-edit">
                                        <Link to={`/admin/category_details/${category.id}`} className="btn-text">
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
             </div>
        </div>
        </Authorized>
   </div>

    );

}

export default AllCategory;