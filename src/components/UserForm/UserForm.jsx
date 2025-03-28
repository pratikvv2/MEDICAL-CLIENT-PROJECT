import { AUTH, FIRESTORE } from '@/firebase.config'
import { setAlertData, setIsModalOpen, setIsOpen } from '@/store/alertSlice'
import { setUserData } from '@/store/userSlice'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


const UserForm = ({
    // eslint-disable-next-line react/prop-types
    message
}) => {
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    const [userInputs, setUserInputs] = useState({
        username: "",
        contact: "",
        gender: "",
        address: "",
    });
    const [isActiveTab, setIsActiveTab] = useState("signup");

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setUserInputs(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleSignup = (e) => {
        e.preventDefault();
        try {
            signInWithPopup(AUTH, provider)
                .then(async (response) => {
                    const responseData = {
                        email: response?.user?.email,
                        photoURL: response?.user?.photoURL,
                        uid: response?.user?.uid,
                        displayName: response?.user?.displayName,
                        userSignupDate: Date.now(),
                    };

                    let userExists = null;

                    const qry = query(collection(FIRESTORE, "userDetails"), where("uid", "==", response?.user?.uid));
                    const querySnapshot = await getDocs(qry);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        userExists = true;
                    });
                    console.log(userExists, response?.user?.uid);


                    if (!userExists) {

                        const docsRef = collection(FIRESTORE, "userDetails");
                        await addDoc(docsRef, {
                            ...responseData,
                            ...userInputs,
                        });
                        dispatch(setAlertData({
                            type: "primary",
                            message: "Successfully Signed Up!"
                        }))

                        dispatch(setUserData({
                            ...responseData
                        }))

                        localStorage.setItem("userData", JSON.stringify({ ...responseData }))


                    } else {
                        dispatch(setAlertData({
                            type: "danger",
                            message: "User already exists! Prefer Login"
                        }))

                    }
                    clearForm();
                    timeout();



                })

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
        }, 5000);
    }

    const clearForm = () => {
        setUserInputs({
            username: "",
            contact: "",
            gender: "",
            address: ""
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        try {
            signInWithPopup(AUTH, provider)
                .then(async (response) => {
                    const responseData = {
                        email: response?.user?.email,
                        photoURL: response?.user?.photoURL,
                        uid: response?.user?.uid,
                        displayName: response?.user?.displayName,

                    };
                    let userExists = null;

                    const qry = query(collection(FIRESTORE, "userDetails"), where("uid", "==", response?.user?.uid));
                    const querySnapshot = await getDocs(qry);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        userExists = true;
                    });

                    if (userExists) {
                        dispatch(setAlertData({
                            type: "primary",
                            message: "Successfully Logged In!"
                        }))

                        dispatch(setUserData({
                            ...responseData
                        }))

                        localStorage.setItem("userData", JSON.stringify({ ...responseData }))

                    } else {
                        dispatch(setAlertData({
                            type: "danger",
                            message: "User doesn't exist! Do Sign up first"
                        }))
                    }
                    timeout();

                })

        } catch (error) {
            console.log(error);
            dispatch(setAlertData({
                type: "danger",
                message: "Something went wrong!"
            }))
            timeout();

        }
    }

    const handleNavTabs = (menu) => {
        setIsActiveTab(menu)
    }


    return (
        <form>
            <ul className="nav nav-tabs my-3">
                <li onClick={() => handleNavTabs("signup")} className="nav-item">
                    <a className={`nav-link ${isActiveTab == "signup" ? "active" : ""}`} aria-current="page" href="#">Signup</a>
                </li>
                <li onClick={() => handleNavTabs("login")} className="nav-item">
                    <a className={`nav-link ${isActiveTab == "login" ? "active" : ""}`} href="#">Login</a>
                </li>
            </ul>
            {isActiveTab == "signup" ? (
                <>

                    <div className="form-group my-2">
                        <label>Username</label>
                        <input required placeholder='Your name' className="form-control form-control-sm" type="text" value={userInputs.username} onChange={handleInputChanges} name="username" />
                    </div>
                    <div className="form-group my-2">
                        <label>Contact</label>
                        <input required placeholder='Your mobile Number' className="form-control form-control-sm" type="text" value={userInputs.contact} onChange={handleInputChanges} name="contact" />
                    </div>
                    <div className="form-group my-2">
                        <label>Gender</label><br />
                        <input type="radio" name="gender" onChange={handleInputChanges} value={"Male"} />
                        <span className='me-3'>&nbsp;Male</span>

                        <input type="radio" name="gender" onChange={handleInputChanges} value={"Female"} />
                        <span className='me-3'>&nbsp;Female</span>

                        <input type="radio" name="gender" onChange={handleInputChanges} value={"Other"} />
                        <span className='me-3'>&nbsp;Other</span>
                    </div>

                    <div className="form-group my-2">
                        <label>Address</label>
                        <textarea required name="address" value={userInputs.address} onChange={handleInputChanges} className="form-control form-control-sm" placeholder='Your Address'></textarea>
                    </div>

                    <button onClick={handleSignup} className='btn btn-primary my-3 me-3'>Continue Signup with Google</button>
                </>
            ) : (
                <>
                    <button onClick={handleLogin} className='btn btn-info my-3'>Login with Google</button>

                </>
            )}
            <p>{message}</p>


            {/* <div className="form-group my-2">
                <label>Choose your Booking Date</label>
                <input min={TODAY} value={userInputs.bookingDate} onChange={handleInputChanges} className="form-control form-control-sm" type="date" name="bookingDate" />
            </div>

            <div className="form-group my-2">
                <label>Choose your Booking Time</label>
                <input min={TODAY} value={userInputs.bookingTime} onChange={handleInputChanges} className="form-control form-control-sm" type="time" name="bookingTime" />
            </div> */}






        </form>
    )
}

export default UserForm