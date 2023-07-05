// import { useEffect, useState,} from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import  "../../../pages/admin/Styles/css/allCss.css";

// function AddOrder() {
//     //add order
//     const [paymentTypeId, setPaymentTypeId] = useState("");
//     const [customerName, setCustomerName] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [email, setEmail] = useState("");
//     const [note, setNote] = useState("");
//     const [cityId, setCityId] = useState("");
//     const [districtId, setDistrictId] = useState("");
//     const [wardId, setWardId] = useState("");
//     const [detail, setDetail] = useState("");
//     const [status, setStatus] = useState("");

//     //setError
//     const [paymentTypeIdError, setPaymentTypeIdError] = useState("");
//     const [customerNameError, setCustomerNameError] = useState("");
//     const [phoneNumberError, setPhoneNumberError] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [noteError, setNoteError] = useState("");
//     const [cityIdError, setCityIdError] = useState("");
//     const [districtIdError, setDistrictIdError] = useState("");
//     const [wardIdError, setWardIdError] = useState("");
//     const [detailError, setDetailError] = useState("");
//     const [statusError, setStatusError] = useState("");

//     const [isValid, setIsValid] = useState(true);

//     const handleInputClick = () => {
//         setPaymentTypeIdError("");
//         setCustomerNameError("");
//         setPhoneNumberError("");
//         setEmailError("");
//         setNoteError("");
//         setCityIdError("");
//         setDistrictIdError("");
//         setWardIdError("");
//         setDetailError("");
//         setStatusError("");
//     }


//     const addOrder = () => {
//         // e.preventDefault();
//         // setIsValid(false);
//         const orderData ={
//             payment_type_id: paymentTypeId,
//             name: customerName,
//             phone_number: phoneNumber,
//             email: email,
//             note: note,
//             city_id: cityId,
//             district_id: districtId,
//             ward_id: wardId,
//             detail: detail,
//             status: status,
//         }
//         axios
//         .post("/order/add", orderData,{
//             headers: {
//                 Authorization: "Bearer " + sessionStorage.getItem("token"),
//            },
//         })
//         .then((respone) => {
//             console.log(respone).data;
//             toast.success("Add product successfully!",{
//                 position: "bottom-right",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored"
//            });
//            const redirectInterval = setInterval(() => {
//                 clearInterval(redirectInterval);
//                 window.location.href = "/admin/all_product";
//            }, 1500);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };


//     return(
//     <div class="main">
//         <ToastContainer 
//           style={{
//                width: "400px",
//                fontSize: "18px",
//           }} 
//      />
//         <div class="main__title">
//             <span class="main__title-text">
//                 Add Category
//             </span>
//             <span class="main__title-des">
//                 DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, <span>please visit the official Datatables documentation.</span>
//             </span>
//         </div>
//         <div class="main__form">
//             <div class="form__category-id">
//                 <label class="form__category-id-title">
//                     Category ID
//                 </label>
//                 <input type="text" readonly class="form__category-id-input" placeholder="10" />
//             </div>
//             <div class="form__category-name">
//                 <label for="form__category-name-input" class="form__category-name-title">
//                     Category Name
//                 </label>
//                 <input type="text" name="" id="form__category-name-input" class="form__category-nane-input" placeholder="Enter Category Name" />
//                 <span class="form__category-name-validate">

//                 </span>
//             </div>
//             <div class="form__category-des">
//                 <label for="form__category-des-input" class="form__category-des-title">
//                     Category Description
//                 </label>
//                 <input type="text" name="" id="form__category-des-input" class="form__category-des-input" placeholder="Enter Category Description" />
//             </div>
//             <div class="form__category-check">
//                 <button class="form__category-btn form__input-btn">
//                     Import
//                 </button>
//             </div>
//         </div>
//     </div>
//     );

// }

// export default AddOrder;

