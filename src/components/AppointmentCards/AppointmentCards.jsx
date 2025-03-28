/* eslint-disable react/prop-types */

import { Chip, IconButton } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Fragment } from "react";

const AppointmentCards = ({
    item,
    setItems,
    setIsModalOpen
}) => {
    let active = new Date(item?.bookingDate) > new Date();
    const handleUpdateModal = (item) => {
        setItems(item);
        setIsModalOpen(true);

    }

    return (
        <div className="card card-wrapper">
            <div className="card-body">

                <p className="card-text">
                    <i className="bi bi-calendar3 text-primary me-1"></i>
                    <span>{item?.bookingDate} </span>

                    <i className="bi bi-clock-fill text-info ms-3 me-1"></i>
                    <span>{item?.bookingTime}</span>
                </p>
                <p className="card-text">

                </p>
                <div title={active && item.status !== "Completed" ? "Reschedule Appointment" : "Booking date is now expired with time"} className={`d-flex justify-content-between ${active ? "" : "text-danger mb-3"}`}>
                    <span><b>Status:</b> {item?.status}</span>
                    {active ? (
                        <IconButton onClick={() => handleUpdateModal(item)}>
                            <BorderColorIcon sx={{ color: "dodgerblue", cursor: "pointer" }} />
                        </IconButton>
                    ) : (
                        <small>Expired</small>
                    )}

                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }} className="form-group my-2">

                    {item?.products?.map((value, key) => {

                        return (
                            <Fragment key={key}>

                                <Chip
                                    sx={{ me: "5px", mb: "3px" }}
                                    color="primary"
                                    variant="outlined"
                                    label={`${value?.title}, ($.${value?.price} x ${value?.units})`}

                                />
                            </Fragment>

                        )
                    })}

                </div>
                <p className="card-text">
                    <span><b className='me-3'>Contact:</b>{item.contact}</span>
                </p>
                <div className="addr">
                    <span><b className='me-3'>Address:</b>{item.address}</span>
                </div>

            </div>
        </div>
    )
}

export default AppointmentCards