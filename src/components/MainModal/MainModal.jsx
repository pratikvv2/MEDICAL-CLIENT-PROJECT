/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { USER_STATUS, COLLECTIONS, TODAY } from '@/utils/constants';
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE } from '@/firebase.config';
import { useState } from 'react';

const MainModal = ({
    isModalOpen,
    setIsModalOpen,
    items
}) => {


    const [status, setStatus] = useState("");
    const [userInputs, setUserInputs] = useState({
        bookingTime: items.bookingTime,
        bookingDate: items.bookingDate
    });


    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setUserInputs(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleUpdate = () => {
        updateDoc(doc(FIRESTORE, COLLECTIONS.bookings, items.id), {
            status: status == "" ? items.status : status,
            bookingTime: userInputs.bookingTime == "" ? items.bookingTime : userInputs.bookingTime,
            bookingDate: userInputs.bookingDate == "" ? items.bookingDate : userInputs.bookingDate

        })
            .then(() => {
                alert(`Updated Appointment`)
            }).catch((err) => {
                alert("Some error occured");
                console.log(err);

            }).finally(() => {
                setTimeout(() => {
                    setIsModalOpen(false);
                });
                setUserInputs({
                    bookingDate: "",
                    bookingTime: ""
                })
            })
    }

    return (
        <>

            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Update Appointment`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Date of Appointment: <b>{items.bookingDate}</b></p>
                        <p>Timing: <b>{items.bookingTime}</b></p>
                        <p className='mb-3'>Current status: <b>{items.status}</b></p>

                        <b className='mt-4'>Update Status</b>
                        <select className='form-control form-control-sm' name="status" onChange={e => setStatus(e.target.value)}>
                            <option>Select From Below</option>
                            {USER_STATUS.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <div className="form-group my-2">
                            <label>New Booking Date</label>
                            <input min={TODAY} value={userInputs.bookingDate} onChange={handleInputChanges} className="form-control form-control-sm" type="date" name="bookingDate" />
                        </div>

                        <div className="form-group my-2">
                            <label>NewBooking Time</label>
                            <input value={userInputs.bookingTime} onChange={handleInputChanges} className="form-control form-control-sm" type="time" name="bookingTime" />
                        </div>
                        <button onClick={handleUpdate} className='btn btn-primary my-3'>Update</button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default MainModal