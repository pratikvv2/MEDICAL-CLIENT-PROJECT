/* eslint-disable react/prop-types */
import MainModal from '@/components/MainModal/MainModal';
import './UserAppointments.scss';
import { fetchLocal } from "@/utils/fetchLocal";
import { getFilteredDataFromCollection } from "@/utils/firebaseFunctions";
import { Fragment, useEffect, useState } from "react"
import AppointmentCards from '@/components/AppointmentCards/AppointmentCards';



const UserAppointments = () => {
    const [bookings, setBookings] = useState([]);
    const [items, setItems] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const userData = fetchLocal("userData")

        getFilteredDataFromCollection("bookingDetails", "uid", userData?.uid)
            .then(data => setBookings(data))
            .catch(err => console.log(err))
    }, [isModalOpen]);



    return (
        <div className='container-fluid'>
            <h4 className='title my-1'>Your Booked Appointments</h4>
            {bookings.length == 0 ? (
                <div className="not-found">
                    <div className="card p-4">
                        <p className="card-text">
                            Sorry! You had no appointments booked yet. Once you book any, it will appear here
                        </p>
                    </div>
                </div>
            ) : (
                <Fragment>
                    <small>All dates are in (yyyy-mm-dd) format</small>
                    <p className='mt-2'><b>Upcoming</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => new Date(item?.bookingDate) > new Date()).map(item =>
                            <AppointmentCards
                                setItems={setItems}
                                setIsModalOpen={setIsModalOpen}
                                key={item.id}
                                item={item}

                            />)}
                    </div>

                    <p className='mt-2'><b>Completed</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => item?.status == "Completed")
                            .map(item =>
                                <AppointmentCards
                                    setItems={setItems}
                                    setIsModalOpen={setIsModalOpen}
                                    key={item.id}
                                    item={item}

                                />)}
                    </div>


                    <p className='mt-2'><b>Expired</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => new Date(item?.bookingDate) < new Date()).map(item =>
                            <AppointmentCards
                                setItems={setItems}
                                setIsModalOpen={setIsModalOpen}
                                key={item.id}
                                item={item}

                            />)}
                    </div>
                </Fragment>
            )}

            <MainModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                items={items}
            />
        </div>
    )
}

export default UserAppointments