/* eslint-disable react/prop-types */


import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';



const MessageAlert = () => {
    const alertData = useSelector((state) => state.alert.alertData);

    return (


        <Alert variant={alertData.type}>
            {alertData.message}
        </Alert>

    )
}

export default MessageAlert
