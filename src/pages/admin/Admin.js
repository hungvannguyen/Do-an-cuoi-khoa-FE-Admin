import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Dashboard from "./DashBord/dashbord";
import Sidebar from "./SideBar/sidebar";

import Login from "../Login"

import AllProduct from "../../components/adminComponents/Product/allproducts";
import DetailsProduct from "../../components/adminComponents/Product/productdetails";
import AddProduct from "../../components/adminComponents/Product/addproduct";

import AllCategory from "../../components/adminComponents/Category/allcategory";
import DetailsCategory from "../../components/adminComponents/Category/categorydetails";
import AddCategory from "../../components/adminComponents/Category/addcategory";

import AllEmployee from "../../components/adminComponents/Employee/allemployee";
import DetailsEmployee from "../../components/adminComponents/Employee/employeedetails";
import AddEmployee from "../../components/adminComponents/Employee/addemployee";

import AllOrder from "../../components/adminComponents/Orders/allorder";

import AllCustomer from "../../components/adminComponents/Customer/allcustomer";
import ResetPass from "../../components/adminComponents/Customer/resetpass";

import { Routes, Route } from "react-router-dom";



function Admin() {
    return(
        <div>
        <Header />
        <Sidebar />
        <Routes>
            //login
            <Route path="/login" element={<Login />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            //product
            <Route path="/admin/all_product" element={<AllProduct />} />
            <Route path="/admin/add_product" element={<AddProduct />} />
            
            //category
            <Route path="/admin/all_category" element={<AllCategory />} />
            <Route path="/admin/add_category" element={<AddCategory />} />
            <Route path="/admin/category_details/:cat_id" element={<DetailsCategory />} />

            //employee
            <Route path="/admin/all_employee" element={<AllEmployee />} />
            <Route path="/admin/add_employee" element={<AddEmployee />} />

            //Order
            <Route path="/admin/all_order" element={<AllOrder />} />

            //Customer
            <Route path="/admin/all_customer" element={<AllCustomer />} />
            <Route path="/admin/reser_request" element={<ResetPass />} />
        </Routes>
        <Footer />
        </div>
    );
}
export default Admin;