import PageWrapper from '@/components/PageWrapper/PageWrapper'
import './Home.scss'
import Slider from "@/components/Slider/Slider"
import UserForm from '@/components/UserForm/UserForm'
import FormModal from '@/components/FormModal/FormModal'
import { useDispatch, useSelector } from 'react-redux'
import { setIsModalOpen } from '@/store/alertSlice'




const Home = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.alert.isModalOpen);


    const handleModal = () => {
        dispatch(setIsModalOpen(!isModalOpen))
    }


    return (
        <PageWrapper isTop={false} >


            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 order-2 order-lg-1 banner-bg">
                        <h1>IV Therapy Near Me.</h1>
                        <p>Experience the ultimate refresh with Mobile IV Therapy – the fastest, safest way to recharge right where you are. Whether at home, the office, or your hotel, we bring expert IV hydration directly to you. In just an hour, feel renewed and revitalized without the hassle of travel. <br /><br /> Elevate your well-being with a service that redefines convenience and comfort, giving new life.</p>

                        <button type="button" onClick={handleModal} className='btn btn-light btn-lg book-now' >Signup / Login &nbsp;<i className="bi text-primary bi-arrow-right-circle-fill"></i></button>

                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 gx-0 order-1 order-lg-2">
                        <Slider />
                    </div>
                </div>


            </div>

            {/* Modal */}
            <FormModal isOpen={isModalOpen}>
                <UserForm />
            </FormModal>

        </PageWrapper>
    )
}

export default Home