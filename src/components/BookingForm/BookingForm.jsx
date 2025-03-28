/* eslint-disable react/prop-types */
import { FIRESTORE } from '@/firebase.config'
import { setAlertData, setIsModalOpen, setIsOpen } from '@/store/alertSlice'
import { resetCart } from '@/store/productsSlice'
import { TODAY } from '@/utils/constants'
import { Avatar, Chip } from '@mui/material'

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DISCOUNT_RATE = .8; // 20%

const BookingForm = ({
    groupedProducts
}) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users.data);
    const ivProducts = useSelector(state => state.products.ivProducts);
    const [authUserFb, setAuthUserFb] = useState({});
    const [contactTick, setContactTick] = useState(false);
    const [addressTick, setAddressTick] = useState(false);

    const priceCount = useMemo(() => {
        return ivProducts.reduce((acc, curr) => {
            acc += Number(curr.price);
            return acc;
        }, 0)

    }, [ivProducts]);








    useEffect(() => {
        getUserData();
    }, []);


    const [userInputs, setUserInputs] = useState({
        bookingTime: "",
        bookingDate: "",
        address: "",
        status: "Pending",
        contact: "",

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


    const getUserData = async () => {
        try {
            const q = query(collection(FIRESTORE, "userDetails"), where("uid", "==", usersData?.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setAuthUserFb({
                        userDocId: doc.id,
                        ...doc.data(),
                    })
                });

            } else {
                dispatch(setAlertData({
                    type: "danger",
                    message: "Something went wrong!"
                }))
            }

        } catch (error) {
            console.log(error);
            dispatch(setAlertData({
                type: "danger",
                message: "Something went wrong!"
            }))
            timeout();
            dispatch(setIsModalOpen(false))

        }
    }

    const handleBooking = async (e) => {
        getUserData();
        e.preventDefault();

        try {

            const docsRef = collection(FIRESTORE, "bookingDetails");
            const products = [];
            products.push(...Object.entries(groupedProducts).map(([, value]) => {
                return {
                    title: value[0].title,
                    price: Number(value[0].price) * DISCOUNT_RATE,
                    units: Number(value.length)
                }
            }))

            console.log(products);

            await addDoc(docsRef, {
                userDetailsId: authUserFb.userDocId,
                uid: authUserFb.uid,
                ...userInputs,
                products: products,
                address: userInputs.address == "" ? authUserFb.address : userInputs.address,
                contact: userInputs.contact == "" ? authUserFb.contact : userInputs.contact
            });
            dispatch(setAlertData({
                type: "primary",
                message: "Successfully Booked your appointment!"
            }))
            clearForm();
            timeout();


        } catch (error) {
            console.log(error);
            dispatch(setAlertData({
                type: "danger",
                message: "Something went wrong!"
            }))
            timeout();

        }
    }

    const timeout = () => {
        dispatch(setIsOpen(true));
        setTimeout(() => {
            dispatch(setIsOpen(false));
            dispatch(setIsModalOpen(false))
        }, 3000);
    }

    const clearForm = () => {
        setUserInputs({
            bookingDate: "",
            bookingTime: "",
            address: ""
        })
        dispatch(resetCart());
        setAddressTick(false);
        setContactTick(false);
    }



    return (
        <form>


            <>

                <div className="alert alert-info" role="alert">
                    <p className='d-flex flex-wrap'>
                        <i className="bi bi-info-circle-fill me-3"></i>
                        <span>Hii, {authUserFb?.username}!</span>
                    </p>
                    <p> We will contact you on {authUserFb?.contact}. Your appointment will be at {authUserFb?.address} (address) . If you wish to change them for this appointment then you can do below</p>
                </div>

                <div className="form-group my-2">
                    <div className="d-flex justify-content-between">
                        <label>Contact</label>
                        <label>Change <input value="contact" name='contactTick' onChange={() => setContactTick(!contactTick)} type='checkbox' /></label>
                    </div>
                    <input disabled={!contactTick} placeholder='Your mobile Number' className="form-control form-control-sm" type="text" value={contactTick ? userInputs.contact : authUserFb?.contact} onChange={handleInputChanges} name="contact" />
                </div>

                <div className="form-group my-2">
                    <div className="d-flex justify-content-between">
                        <label>Address</label>
                        <label>Change <input value="contact" name='addressTick' onChange={() => setAddressTick(!addressTick)} type='checkbox' /></label>
                    </div>
                    <textarea disabled={!addressTick} name="address" value={addressTick ? userInputs.address : authUserFb?.address} onChange={handleInputChanges} className="form-control form-control-sm" placeholder='Your Address'></textarea>
                </div>

                <div className="form-group my-2">
                    <label>Choose your Booking Date</label>
                    <input min={TODAY} value={userInputs.bookingDate} onChange={handleInputChanges} className="form-control form-control-sm" type="date" name="bookingDate" />
                </div>

                <div className="form-group my-2">
                    <label>Choose your Booking Time</label>
                    <input min={TODAY} value={userInputs.bookingTime} onChange={handleInputChanges} className="form-control form-control-sm" type="time" name="bookingTime" />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }} className="form-group my-2">

                    {Object.entries(groupedProducts).map(([key, value]) => {
                        const product = value[0];
                        return (
                            <Fragment key={key}>

                                <Chip
                                    sx={{ me: "15px", mb: "10px" }}
                                    avatar={<Avatar
                                        alt={product?.title}
                                        src={product?.URL}
                                        sx={{ width: 56, height: 56 }}
                                    />}
                                    color="primary"
                                    variant="outlined"
                                    label={`${product?.title}, ($.${product?.price} x ${value?.length})`}

                                />
                            </Fragment>

                        )
                    })}

                </div>
                <div className="form-group my-2">
                    <p>Total Billed Amount: <b>$ {priceCount}.00</b> </p>
                    <p>Total Payable: <b>$ {priceCount * DISCOUNT_RATE}.00</b> </p>
                    <p style={{ fontSize: "12px" }}>Discount of <b>20%</b> Applied</p>
                </div>

                <button onClick={handleBooking} className='btn btn-primary my-3 me-3'>Book Your Appointment</button>
                <p className="mt-3">
                    <i>Once booked you have to pay 25% of the price in advance by cash. If you want to cancel then you can do it before 2 hours of the appointment.</i>
                </p>
            </>

        </form>
    )
}

export default BookingForm