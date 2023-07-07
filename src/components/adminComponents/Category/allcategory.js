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
     const allowedRoles = ["1",];


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
                              <th className="table__head-item">Id</th>
                            <th className="table__head-item">Name</th>
                            <th className="table__head-item">Description</th>
                            <th className="table__head-item">Action</th>
                       </thead>
                       <tbody className="table__body">
                         {category.map((category) => (
                            <tr className="table__body-item">
                                   <td className="table__body-data">{category.id}</td>
                                 <td className="table__body-data">{category.cat_name}</td>
                                 <td className="table__body-data">{category.cat_description}</td>
                                 <td className="table__body-data">
                                  
                                   <button className="btn-edit">
                                        <Link to={`/admin/category_details/${category.id}`} className="btn-text">
                                             Details
                                        </Link>
                                   </button>
                                   
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