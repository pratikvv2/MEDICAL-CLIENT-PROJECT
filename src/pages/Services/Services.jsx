/* eslint-disable react/prop-types */
import './Services.scss';
import { useMedia } from 'react-use'

import Pic1 from '@/images/p1.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '@/store/alertSlice';
import FormModal from '@/components/FormModal/FormModal';
import UserForm from '@/components/UserForm/UserForm';
import BookingForm from '@/components/BookingForm/BookingForm';



const Services = ({
    groupedProducts
}) => {
    const isLargeScreen = useMedia('(min-width: 992px)');
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.alert.isModalOpen);
    const usersData = useSelector(state => state.users.data);



    const handleModal = () => {
        dispatch(setIsModalOpen(!isModalOpen))
    }




    return (
        <>
            <div className={`${isLargeScreen ? "container" : "container-fluid"} services`}>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12">
                        <h1 className='heading'>IV Hydration Therapy</h1>
                        <p className='texts'>Are you feeling tired, exhausted, fatigued, or lacking energy?</p>
                        <h3 className='highlighted'>Our IV Hydration Starts at $150 – with Add-ons</h3>
                        <p className='texts'>Recover your endurance!  We have the perfect solutions for you!  Intravenous hydration mixed with vitamins.  We deliver mobile intravenous hydration wherever you are, at an affordable price.</p>

                        <p className="texts texts-right-side">
                            <i className="bi icon-tick me-3 text-primary bi-check-circle-fill"></i>
                            <span>Available Add ons for you</span>
                        </p>

                        <p className="texts text-hv">
                            <i className="bi me-2 text-primary bi-arrow-right-square-fill"></i>
                            <span>$150 each for more than 1 treatment of plain IV fluids</span>
                        </p>
                        <p className="texts text-hv">
                            <i className="bi me-2 text-primary bi-arrow-right-square-fill"></i>
                            <span>$25 each for any additional vitamins</span>
                        </p>

                        <div className="my-3 btn-area">
                            <button type="button" onClick={handleModal} className="btn btn-light btn-lg book-now position-relative">
                                Book Now &nbsp;<i className="bi text-primary bi-arrow-right-circle-fill"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {Object.keys(groupedProducts).length}
                                </span>
                            </button>
                        </div>


                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-12">
                        <img src={Pic1} className='left-main-image' />
                    </div>
                    <div className="col-12">
                        <h3 className='heading mt-3'>What makes your immune system down?</h3>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 group-images">
                        <img src="/dehydration.png" alt="Dehydration image" />
                        <p className="texts">Dehydration</p>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 group-images">
                        <img src="/hanghover.jpg" alt="Hangover image" />
                        <p className="texts">Hangover</p>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 group-images">
                        <img src="/jetlag.jpg" alt="Jet Lag image" />
                        <p className="texts">Jet Lag</p>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 group-images">
                        <img src="/stress.jpg" alt="Stress image" />
                        <p className="texts">Stress</p>
                    </div>
                    <div className="col-12">
                        <h3 className='heading mt-3'>How our IV Therapy will help you.</h3>

                        <p className='texts highlight-both'>
                            <span className='innertext'>
                                Our IV infusion delivers a powerful blend of essential nutrients including Vitamin B6, Vitamin B12, Vitamin B Complex, Vitamin C, and Vitamin D, designed to boost energy levels, enhance immune function, support metabolism and promote overall health and wellness.

                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <FormModal isOpen={isModalOpen}>
                {usersData?.uid ? (
                    <BookingForm groupedProducts={groupedProducts} />
                ) : (
                    <UserForm message={"You must have an account with us to Book Appointment. If you are new then do signup first or else prefer login."} />
                )}

            </FormModal>
        </>
    )
}

export default Services