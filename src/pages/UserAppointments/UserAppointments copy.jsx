// /* eslint-disable react/prop-types */
// import MainModal from '@/components/MainModal/MainModal';
// import './UserAppointments.scss';

// import { fetchLocal } from "@/utils/fetchLocal";
// import { getFilteredDataFromCollection } from "@/utils/firebaseFunctions";
// import { Fragment, useEffect, useState } from "react"
// import { Chip, IconButton } from '@mui/material';



// const UserAppointments = () => {
//     const [bookings, setBookings] = useState([]);
//     const [items, setItems] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const userData = fetchLocal("userData")
//         // console.log(userData?.uid);

//         getFilteredDataFromCollection("bookingDetails", "uid", userData?.uid)
//             .then(data => setBookings(data))
//             .catch(err => console.log(err))
//     }, [isModalOpen]);

//     const handleUpdateModal = (item) => {
//         setItems(item);
//         setIsModalOpen(true);

//     }

//     return (
//         <div className='container-fluid'>
//             <h4 className='title my-1'>Your Booked Appointments</h4>
//             {bookings.length == 0 ? (
//                 <div className="not-found">
//                     <div className="card p-4">
//                         <p className="card-text">
//                             Sorry! You had no appointments booked yet. Once you book any, it will appear here
//                         </p>
//                     </div>
//                 </div>
//             ) : (
//                 <Fragment>
//                     <small>All dates are in (yyyy-mm-dd) format</small>
//                     <p>Upcoming</p>
//                     <div className="d-flex gap-3 mb-3 flex-wrap">
//                         {bookings.filter(item => new Date(item?.bookingDate) > new Date()).map(item => {
//                             let active = new Date(item?.bookingDate) > new Date();
//                             return (
//                                 <div key={item.id} className="card card-wrapper" style={{ width: "16rem" }}>
//                                     <div className="card-body">

//                                         <p className="card-text">
//                                             <i className="bi bi-calendar3 text-primary me-3"></i>
//                                             <span>{item?.bookingDate} </span>
//                                         </p>
//                                         <p className="card-text">
//                                             <i className="bi bi-clock-fill text-info me-3"></i>
//                                             <span>{item?.bookingTime}</span>
//                                         </p>
//                                         <div title={active && item.status !== "Completed" ? "Reschedule Appointment" : "Booking date is now expired with time"} className={`d-flex justify-content-between ${active ? "" : "text-danger mb-3"}`}>
//                                             <span><b>Status:</b> {item?.status}</span>
//                                             {active ? (
//                                                 <IconButton onClick={() => handleUpdateModal(item)}>
//                                                     <BorderColorIcon sx={{ color: "dodgerblue", cursor: "pointer" }} />
//                                                 </IconButton>
//                                             ) : (
//                                                 <small>Expired</small>
//                                             )}

//                                         </div>
//                                         <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }} className="form-group my-2">

//                                             {item?.products?.map((value, key) => {

//                                                 return (
//                                                     <Fragment key={key}>

//                                                         <Chip
//                                                             sx={{ me: "5px", mb: "3px" }}
//                                                             color="primary"
//                                                             variant="outlined"
//                                                             label={`${value?.title}, ($.${value?.price} x ${value?.units})`}

//                                                         />
//                                                     </Fragment>

//                                                 )
//                                             })}

//                                         </div>
//                                         <p className="card-text">
//                                             <span><b className='me-3'>Contact:</b>{item.contact}</span>
//                                         </p>
//                                         <div className="addr">
//                                             <span><b className='me-3'>Address:</b>{item.address}</span>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>

//                     <p>Completed</p>
//                     <div className="d-flex gap-3 mb-3 flex-wrap">
//                         {bookings.filter(item => item?.status == "Completed").map(item => {
//                             let active = new Date(item?.bookingDate) > new Date();
//                             return (
//                                 <div key={item.id} className="card card-wrapper" style={{ width: "16rem" }}>
//                                     <div className="card-body">

//                                         <p className="card-text">
//                                             <i className="bi bi-calendar3 text-primary me-3"></i>
//                                             <span>{item?.bookingDate} </span>
//                                         </p>
//                                         <p className="card-text">
//                                             <i className="bi bi-clock-fill text-info me-3"></i>
//                                             <span>{item?.bookingTime}</span>
//                                         </p>
//                                         <div title={active && item.status !== "Completed" ? "Reschedule Appointment" : "Booking date is now expired with time"} className={`d-flex justify-content-between ${active ? "" : "text-danger mb-3"}`}>
//                                             <span><b>Status:</b> {item?.status}</span>
//                                             {active ? (
//                                                 <IconButton onClick={() => handleUpdateModal(item)}>
//                                                     <BorderColorIcon sx={{ color: "dodgerblue", cursor: "pointer" }} />
//                                                 </IconButton>
//                                             ) : (
//                                                 <small>Expired</small>
//                                             )}

//                                         </div>
//                                         <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }} className="form-group my-2">

//                                             {item?.products?.map((value, key) => {

//                                                 return (
//                                                     <Fragment key={key}>

//                                                         <Chip
//                                                             sx={{ me: "5px", mb: "3px" }}
//                                                             color="primary"
//                                                             variant="outlined"
//                                                             label={`${value?.title}, ($.${value?.price} x ${value?.units})`}

//                                                         />
//                                                     </Fragment>

//                                                 )
//                                             })}

//                                         </div>
//                                         <p className="card-text">
//                                             <span><b className='me-3'>Contact:</b>{item.contact}</span>
//                                         </p>
//                                         <div className="addr">
//                                             <span><b className='me-3'>Address:</b>{item.address}</span>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>


//                     <p>Expired</p>
//                     <div className="d-flex gap-3 mb-3 flex-wrap">
//                         {bookings.filter(item => new Date(item?.bookingDate) < new Date()).map(item => {
                            
//                             return (
//                                 <div key={item.id} className="card card-wrapper" style={{ width: "16rem" }}>
//                                     <div className="card-body">

//                                         <p className="card-text">
//                                             <i className="bi bi-calendar3 text-primary me-3"></i>
//                                             <span>{item?.bookingDate} </span>
//                                         </p>
//                                         <p className="card-text">
//                                             <i className="bi bi-clock-fill text-info me-3"></i>
//                                             <span>{item?.bookingTime}</span>
//                                         </p>
//                                         <div title={active && item.status !== "Completed" ? "Reschedule Appointment" : "Booking date is now expired with time"} className={`d-flex justify-content-between ${active ? "" : "text-danger mb-3"}`}>
//                                             <span><b>Status:</b> {item?.status}</span>
//                                             {active ? (
//                                                 <IconButton onClick={() => handleUpdateModal(item)}>
//                                                     <BorderColorIcon sx={{ color: "dodgerblue", cursor: "pointer" }} />
//                                                 </IconButton>
//                                             ) : (
//                                                 <small>Expired</small>
//                                             )}

//                                         </div>
//                                         <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }} className="form-group my-2">

//                                             {item?.products?.map((value, key) => {

//                                                 return (
//                                                     <Fragment key={key}>

//                                                         <Chip
//                                                             sx={{ me: "5px", mb: "3px" }}
//                                                             color="primary"
//                                                             variant="outlined"
//                                                             label={`${value?.title}, ($.${value?.price} x ${value?.units})`}

//                                                         />
//                                                     </Fragment>

//                                                 )
//                                             })}

//                                         </div>
//                                         <p className="card-text">
//                                             <span><b className='me-3'>Contact:</b>{item.contact}</span>
//                                         </p>
//                                         <div className="addr">
//                                             <span><b className='me-3'>Address:</b>{item.address}</span>
//                                         </div>

//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </Fragment>
//             )}

//             <MainModal
//                 isModalOpen={isModalOpen}
//                 setIsModalOpen={setIsModalOpen}
//                 items={items}
//             />
//         </div>
//     )
// }

// export default UserAppointments