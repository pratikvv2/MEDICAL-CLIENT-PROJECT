/* eslint-disable react/prop-types */
import { setIsOfferModalOpen } from '@/store/alertSlice';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import './OfferModal.scss';

const OfferModal = ({
    isOpen,

}) => {
    // const isModalOpen = useSelector((state) => state.alert.isOpen);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsOfferModalOpen(false))
    }


    return (
        <Modal show={isOpen} onHide={handleClose} centered>

            <Modal.Header closeButton>
                {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <div className="modal-sections">
                    <div className="top-section">
                        <h2 className='discount'>Flat 20% OFF</h2>
                        <b>On all IV Fluid products</b>
                    </div>
                    <div className="curvy-divider"></div>
                    <div className="bottom-section">
                        <h3>Offer valid for limited period. Hurry up!</h3>
                        <div className="grand-opening">
                            <h3>Grand Opening</h3>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default OfferModal