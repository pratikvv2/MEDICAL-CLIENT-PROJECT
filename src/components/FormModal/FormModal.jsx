/* eslint-disable react/prop-types */
import { setIsModalOpen, setIsOpen } from '@/store/alertSlice';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import MessageAlert from '@/components/MessageAlert/MessageAlert';

function FormModal({
    isOpen,
    children,
}) {
    const isModalOpen = useSelector((state) => state.alert.isOpen);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsModalOpen(false))
        dispatch(setIsOpen(false));
    }
    console.log(isModalOpen);


    return (
        <>
            <Modal show={isOpen} onHide={handleClose}>

                <Modal.Header closeButton></Modal.Header>
                {isModalOpen && (

                    <div className="my-4 px-3">
                        <MessageAlert />
                    </div>
                )}
                <Modal.Body>
                    {children}
                </Modal.Body>


                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default FormModal;