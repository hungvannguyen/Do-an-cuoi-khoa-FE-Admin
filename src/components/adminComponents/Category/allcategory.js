import  "../../../pages/admin/Styles/css/allCss.css";

function AllCategory() {
    return(
        <div className="main">
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
                            <th className="table__head-item">Name</th>
                            <th className="table__head-item">Position</th>
                            <th className="table__head-item">Office</th>
                            <th className="table__head-item">Age</th>
                            <th className="table__head-item">Start date</th>
                            <th className="table__head-item">Salary</th>
                       </thead>
                       <tbody className="table__body">
                            <tr className="table__body-item">
                                 <td className="table__body-data">Airi Satou</td>
                                 <td className="table__body-data">Accountant</td>
                                 <td className="table__body-data">Tokyo</td>
                                 <td className="table__body-data">33</td>
                                 <td className="table__body-data">2008/11/28</td>
                                 <td className="table__body-data">$162,700</td>
                            </tr>
                            <tr className="table__body-item">
                                 <td className="table__body-data">Angelica Ramos</td>
                                 <td className="table__body-data">Chief Executive Officer (CEO)</td>
                                 <td className="table__body-data">London</td>
                                 <td className="table__body-data">47</td>
                                 <td className="table__body-data">2009/10/20</td>
                                 <td className="table__body-data">$1200,300</td>
                            </tr>                        
                       </tbody>
                  </table>
             </div>
             <div className="datatable__footer">
                  <div className="datatable__footer-description">
                       <span className="datatable__footer-description-text">
                            Showing 1 to 10 of 57 entries
                       </span>
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
   </div>

    );

}

export default AllCategory;