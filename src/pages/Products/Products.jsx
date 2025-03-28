/* eslint-disable react/prop-types */
import PageWrapper from "@/components/PageWrapper/PageWrapper"
import './Products.scss'
import { DATA } from "./DATA"
import { Avatar, Chip, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addProductsToCart, removeSpecificSingleProduct } from "@/store/productsSlice"
import { Fragment } from "react"
import FormModal from "@/components/FormModal/FormModal"
import BookingForm from "@/components/BookingForm/BookingForm"
import { setIsModalOpen } from "@/store/alertSlice"
import UserForm from "@/components/UserForm/UserForm"



const Products = ({
    groupedProducts
}) => {

    const dispatch = useDispatch();
    const ivProducts = useSelector(state => state.products.ivProducts);
    const isModalOpen = useSelector((state) => state.alert.isModalOpen);
    const usersData = useSelector(state => state.users.data);

    const handleAddingIVs = (item) => {
        dispatch(addProductsToCart(item));
    }

    const handleRemoveIVs = (item) => {
        dispatch(removeSpecificSingleProduct(item));
    }

    const handleModal = () => {
        dispatch(setIsModalOpen(!isModalOpen))
    }

    return (
        <PageWrapper isTop={false} >

            <div className="container-fluid bgx my-4">

                <FormModal isOpen={isModalOpen}>
                    {(usersData?.uid && ivProducts.length > 0) ? (
                        <BookingForm groupedProducts={groupedProducts} />
                    ) : !usersData?.uid ? (
                        <UserForm message={"You must have an account with us to Book Appointment. If you are new then do signup first or else prefer login."} />
                    ) : (
                        <></>
                    )}

                </FormModal>

                <div className="row mt-3 gy-4 gx-4">
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12">
                        <h1 className='heading'>Our Varities of IV Products</h1>
                        <p className='texts'>Prices starting from AS LOW AS
                            <span style={{ color: "red", textDecoration: "line-through" }}>
                                <b> $150</b>
                            </span>
                            <span className="ps-2" style={{ color: "#0d6efd" }}>
                                <b>$120</b>
                            </span>
                            <i><small style={{ color: "gray" }}>(20% OFF Applied)</small></i>
                        </p>
                        <p>If you are still confused about <b style={{ color: "gray" }}>WHICH IV</b> should select out of so many. <b style={{ color: "gray" }}>WORRY NOT!</b> Our Nurses will help you out.</p>

                        <p className='texts'>Remember<b style={{ color: "red" }}> 20% OFF </b>on all products will be applied at the time of checkout.</p>

                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12">
                        {((usersData?.uid && ivProducts.length != 0) || (!usersData?.uid)) && (
                            <button type="button" onClick={handleModal} className="btn btn-light btn-lg book-now position-relative">
                                Book Now &nbsp;<i className="bi text-primary bi-arrow-right-circle-fill"></i>
                                {usersData?.uid && ivProducts.length > 0 && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {Object.keys(groupedProducts).length}
                                </span>
                                )}
                            </button>
                        )}



                    </div>


                    {DATA.map(item => {
                        const count = ivProducts.filter(iv => iv.id == item.id).length;
                        return (
                            <div key={item.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="pricing-item">
                                    <div className="outer">
                                        <div className="inner">
                                            <p className="card-text">$ {item.price}</p>

                                        </div>
                                        <div className="buy">
                                            {count > 0 ? (
                                                <Fragment>
                                                    <Chip
                                                        avatar={<Avatar>{count}</Avatar>}
                                                        label="Got"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                    <div className="add-remove-ivs">
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="add to shopping cart"
                                                            onClick={() => handleRemoveIVs(item)}
                                                        >
                                                            -
                                                        </IconButton>
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="add to shopping cart"
                                                            onClick={() => handleAddingIVs(item)}
                                                        >
                                                            +
                                                        </IconButton>
                                                    </div>
                                                </Fragment>
                                            ) : (
                                                <Chip
                                                    onClick={() => handleAddingIVs(item)}
                                                    sx={{ cursor: "pointer" }}
                                                    label="Buy"
                                                    color="primary"
                                                    variant="outlined"

                                                />
                                            )}

                                        </div>
                                        <div className="details">
                                            <img src={item.URL} alt="" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </PageWrapper>
    )
}

export default Products