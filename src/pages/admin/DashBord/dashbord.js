import "../Styles/css/allCss.css"

function Dashboard (){
    return(
        <div class="main">
          <div class="home__features">
               <div class="home__features-tabs">
                    <ul class="home__features-tab-list">
                         <li class="home__features-tab-list-item home__features-tab-list-item--line home__features-tab-list-item--selected">
                              Overview
                         </li>
                         <li class="home__features-tab-list-item home__features-tab-list-item--line">
                              Audiences
                         </li>
                         <li class="home__features-tab-list-item home__features-tab-list-item--line">
                              Demographics
                         </li>
                         <li class="home__features-tab-list-item">
                              More
                         </li>
                    </ul>
               </div>
               <div class="home__features-community">
                    <button class="home__features-btn">
                         <i class="home__features-icon fas fa-share-alt"></i>
                         <span class="home features-btn-text">
                              Share
                         </span>
                    </button>
                    <button class="home__features-btn">
                         <i class="home__features-icon fas fa-print"></i>
                         <span class="home features-btn-text">
                              Print
                         </span>
                    </button>
                    <button class="home__features-btn home__features-btn--bold">
                         <i class="home__features-icon fas fa-file-export"></i>
                         <span class="home features-btn-text">
                              Export
                         </span>
                    </button>
               </div>
          </div>
          <div class="home__statitics">
               <ul class="home__statitics-list">
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Bounce Rate
                         </span>
                         <span class="home__statitics-item-number">
                              32.53%
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -0.5%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Page Views
                         </span>
                         <span class="home__statitics-item-number">
                              7,682
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.1%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              New Sessions
                         </span>
                         <span class="home__statitics-item-number">
                              68.8
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -8.3%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Avg. Time on Site
                         </span>
                         <span class="home__statitics-item-number">
                              5m:35s
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.2%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              New Sessions
                         </span>
                         <span class="home__statitics-item-number">
                              68.8
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--decrease">
                              -8.3%
                         </span>
                    </li>
                    <li class="home__statitics-item">
                         <span class="home__statitics-title">
                              Avg. Time on Site
                         </span>
                         <span class="home__statitics-item-number">
                              5m:35s
                         </span>
                         <span class="home__statitics-item-change home__statitics-item-change--increase">
                              +1.2%
                         </span>
                    </li>
                    
               </ul>
          </div>
          <div class="home__table">
               <div class="home__table--left">
                    <div class="table__request">
                         <div class="table__request-head">
                              <div class="table__request-title">
                                   <span class="table__request-title-text">
                                        Pending Requests
                                   </span>
                                   <span class="table__request-title-des">
                                        You have 50+ new requests
                                   </span>
                              </div>
                              <div class="table__request-button">
                                   <button class="table__request-button-btn">
                                        <i class="fas fa-user-plus table__request-btn-icon"></i>
                                        <span class="table__request-btn-text">
                                             Add new member
                                        </span>
                                   </button>
                              </div>
                         </div>
                         
                         <table class="table__request-table">
                              <thead class="table__request-header">
                                   <tr>
                                        <th class="table__request-head-text">
                                             <input type="checkbox" name="" id="" class="table__request-checkAll" />
                                        </th>
                                        <th class="table__request-head-text">
                                             CUSTOMER
                                        </th>
                                        <th class="table__request-head-text">
                                             COMPANY
                                        </th>
                                        <th class="table__request-head-text">
                                             PROGRESS
                                        </th>
                                        <th class="table__request-head-text">
                                             STATUS
                                        </th>
                                   </tr>
                              </thead>
                              <tbody class="table__request-body">
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face1.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Brandon Washington
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       79%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       85/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="120" class="table__request-progress-img table__request-progress-img--success"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--complete">
                                                  Complete
                                             </div>
                                        </td>
                                   </tr>
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face11.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Wayne Murphy
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       52%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       85/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="85" class="table__request-progress-img table__request-progress-img--progress"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--progress">
                                                  In Progress
                                             </div>
                                        </td>
                                   </tr>
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face10.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Laura Brooks
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       32%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       40/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="40" class="table__request-progress-img table__request-progress-img--pending"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--pending">
                                                  Pending
                                             </div>
                                        </td>
                                   </tr>
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face1.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Brandon Washington
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       79%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       85/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="120" class="table__request-progress-img table__request-progress-img--success"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--complete">
                                                  Complete
                                             </div>
                                        </td>
                                   </tr>
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face11.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Wayne Murphy
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       52%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       85/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="85" class="table__request-progress-img table__request-progress-img--progress"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--progress">
                                                  In Progress
                                             </div>
                                        </td>
                                   </tr>
                                   <tr class="table__request-body-row">
                                        <td class="table__request-check">
                                             <input type="checkbox" name="" id="" class="table__request-check-item" />
                                        </td>
                                        <td class="table__request-name">
                                             <div class="table_-request-name-avt">
                                                  <img src="./images/faces/face10.jpg" alt="" class="table__request-name-img" />
                                             </div>
                                             <div class="table__request-name-frame">
                                                  <span class="table__request-name-text">
                                                       Laura Brooks
                                                  </span>
                                                  <span class="table__request-name-des">
                                                       Head Admin
                                                  </span>
                                             </div>
                                             
                                        </td>
                                        <td class="table__request-company">
                                             <span class="table__request-conpany-name">
                                                  Company Name 1
                                             </span>
                                             <span class="table__request-conpany-type">
                                                  Company Type 1
                                             </span>
                                        </td>
                                        <td class="table__request-progress">
                                             <p class="table__request-progress-text">
                                                  <span class="table__request-progress-percent">
                                                       32%
                                                  </span>
                                                  <span class="table__request-progress-num">
                                                       40/162
                                                  </span>
                                             </p>
                                             <progress max="162" value="40" class="table__request-progress-img table__request-progress-img--pending"></progress>
                                        </td>
                                        <td class="table__request-status">
                                             <div class="table__request-status-text table__request-status-text--pending">
                                                  Pending
                                             </div>
                                        </td>
                                   </tr>
                              </tbody>
                         </table>
                    </div>
               </div>
               <div class="home__table__right">
                    <div class="table__todo">
                         <div class="table__todo-header">
                              <div class="table__todo-title">
                                   Todo List
                              </div>
                              <div class="table__todo-add">
                                   <i class="fas fa-plus-circle"></i>
                              </div>
                         </div>
                         <div class="table__todo-list">
                              <div class="table__todo-item">
                                   <div class="table__todo-item-check">
                                        <input type="checkbox" name="" id="" class="table__todo-item-check-input" />
                                   </div>
                                   <div class="table__todo-item-main">
                                        <div class="table__todo-item-text">
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, nulla.
                                        </div>
                                        <div class="table__todo-item-status">
                                             <span class="table__todo-item-time">
                                                  25 March 2022
                                             </span>
                                             <div class="table__todo-item-status-text table__todo-item-status--pending">
                                                  Due Tomorrow
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div class="table__todo-item">
                                   <div class="table__todo-item-check">
                                        <input type="checkbox" name="" id="" class="table__todo-item-check-input" />
                                   </div>
                                   <div class="table__todo-item-main">
                                        <div class="table__todo-item-text">
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, nulla.
                                        </div>
                                        <div class="table__todo-item-status">
                                             <span class="table__todo-item-time">
                                                  24 March 2022
                                             </span>
                                             <div class="table__todo-item-status-text table__todo-item-status--done">
                                                  Done
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div class="table__todo-item">
                                   <div class="table__todo-item-check">
                                        <input type="checkbox" name="" id="" class="table__todo-item-check-input" />
                                   </div>
                                   <div class="table__todo-item-main">
                                        <div class="table__todo-item-text">
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, nulla.
                                        </div>
                                        <div class="table__todo-item-status">
                                             <span class="table__todo-item-time">
                                                  24 March 2022
                                             </span>
                                             <div class="table__todo-item-status-text table__todo-item-status--expire">
                                                  Expired
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div class="table__todo-item">
                                   <div class="table__todo-item-check">
                                        <input type="checkbox" name="" id="" class="table__todo-item-check-input" />
                                   </div>
                                   <div class="table__todo-item-main">
                                        <div class="table__todo-item-text">
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, nulla.
                                        </div>
                                        <div class="table__todo-item-status">
                                             <span class="table__todo-item-time">
                                                  24 March 2022
                                             </span>
                                             <div class="table__todo-item-status-text table__todo-item-status--done">
                                                  Done
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div class="table__top">
                         <div class="table__top-title">
                              Top Performer
                         </div>
                         <div class="table__top-main">
                              <div class="table__top-list">
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face1.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Brandon Washington
                                             </p>
                                             <p class="table__top-name-number">
                                                  162543
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face14.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Matthew Bailey
                                             </p>
                                             <p class="table__top-name-number">
                                                  152571
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face10.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Rafell John
                                             </p>
                                             <p class="table__top-name-number">
                                                  132549
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                                   <div class="table__top-item">
                                        <div class="table__top-avt">
                                             <img src="./images/faces/face12.jpg" alt="" class="table__top-img" />
                                        </div>
                                        <div class="table__top-name">
                                             <p class="table__top-name-text">
                                                  Katherine Bitler
                                             </p>
                                             <p class="table__top-name-number">
                                                  122743
                                             </p>
                                        </div>
                                        <div class="table__top-time">
                                             <span class="table__top-time-text">
                                                  1h ago
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
    );
}

export default Dashboard;