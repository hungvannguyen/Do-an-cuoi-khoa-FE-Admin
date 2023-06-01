import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Dashboard from "./DashBord/dashbord";
import Sidebar from "./SideBar/sidebar";

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
            <Route path="/" element={<Dashboard />} />
            //product
            <Route path="/admin/all_product" element={<AllProduct />} />
            <Route path="/add_product" element={<AddProduct />} />
            
            //category
            <Route path="/all_category" element={<AllCategory />} />
            <Route path="/add_category" element={<AddCategory />} />

            //employee
            <Route path="/all_employee" element={<AllEmployee />} />
            <Route path="/add_employee" element={<AddEmployee />} />

            //Order
            <Route path="/all_order" element={<AllOrder />} />

            //Customer
            <Route path="/all_customer" element={<AllCustomer />} />
            <Route path="/reser_request" element={<ResetPass />} />
        </Routes>
        <Footer />
        </div>
    );
}
export default Admin;