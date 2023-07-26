import React from "react";
import requireAuth from "../../components/adminComponents/CheckLogin/requireAuth";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Dashboard from "./DashBord/dashbord";
import Sidebar from "./SideBar/sidebar";

import Login from "../Login"

import AllProduct from "../../components/adminComponents/Product/allproducts";
import DetailsProduct from "../../components/adminComponents/Product/productdetails";
import AddProduct from "../../components/adminComponents/Product/addproduct";
import ImportProduct from "../../components/adminComponents/Product/importproduct";

import AllCategory from "../../components/adminComponents/Category/allcategory";
import DetailsCategory from "../../components/adminComponents/Category/categorydetails";
import AddCategory from "../../components/adminComponents/Category/addcategory";

import AllEmployee from "../../components/adminComponents/Employee/allemployee";
import DetailsUser from "../../components/adminComponents/Employee/employeedetails";
import AddEmployee from "../../components/adminComponents/Employee/addemployee";

import AllOrder from "../../components/adminComponents/Orders/allorder";
import DetailsOrder from "../../components/adminComponents/Orders/orderdetail";
import AddOrder from "../../components/adminComponents/Orders/addorder";

import AllCustomer from "../../components/adminComponents/Customer/allcustomer";
import ResetPass from "../../components/adminComponents/Customer/resetpass";

import ClientSetting from "../../components/adminComponents/Banner/client_setting"

import Log from "../../components/adminComponents/Log/log";
import AddLog from "../../components/adminComponents/Log/addproductlog";
import AddLogDetail from "../../components/adminComponents/Log/prdlogdetail";




import { Routes, Route } from "react-router-dom";



function Admin() {
    return(
        <div>
        <Header />
        <Sidebar />
        <Routes>
            //login
            <Route path="/login" element={<Login />} />

            //Client Setting
            <Route path="/admin/client_setting" element={requireAuth(ClientSetting)} />

            <Route path="/admin/dashboard" element={requireAuth(Dashboard)} />
            //product
            <Route path="/admin/all_product" element={requireAuth(AllProduct)} />
            <Route path="/admin/add_product" element={requireAuth(AddProduct )} />\
            <Route path="/admin/product_details/:id" element={requireAuth(DetailsProduct)} />
            <Route path="/admin/import_product" element={requireAuth(ImportProduct)} />
            
            //category
            <Route path="/admin/all_category" element={requireAuth(AllCategory)} />
            <Route path="/admin/add_category" element={requireAuth(AddCategory)} />
            <Route path="/admin/category_details/:cat_id" element={requireAuth(DetailsCategory)} />

            //employee
            <Route path="/admin/all_employee" element={requireAuth(AllEmployee)} />
            <Route path="/admin/add_employee" element={requireAuth(AddEmployee)} />

            //Order
            <Route path="/admin/all_order" element={requireAuth(AllOrder)} />
            <Route path="/admin/order_details/:order_id" element={requireAuth(DetailsOrder)} />
            <Route path="/admin/add_order" element={requireAuth(AddOrder)} />
           

            //Customer
            <Route path="/admin/all_customer" element={requireAuth(AllCustomer)} />
            <Route path="/admin/user_details/:user_id" element={requireAuth(DetailsUser)} />
            <Route path="/admin/reser_request" element={<ResetPass />} />

            //Log
            <Route path="/admin/log" element={requireAuth(Log)} />
            <Route path="/admin/addproduct_log" element={requireAuth(AddLog)} />
            <Route path="/admin/addproduct_log/detail/:id" element={requireAuth(AddLogDetail)} />
        </Routes>
        <Footer />
        </div>
    );
}
export default Admin;