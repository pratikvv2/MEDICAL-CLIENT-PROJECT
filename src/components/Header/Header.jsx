// import { LogoutIcon } from '@/assets/icons';
import './Header.scss'
import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap'
import { useMedia } from 'react-use'
import { ROUTES } from '@/utils/constants';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Contact from '@/components/Contact/Contact';
import { useSelector } from 'react-redux';



const Header = () => {
    const isLargeScreen = useMedia('(min-width: 992px)');
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const usersData = useSelector(state => state.users.data);

    const handleSideNavToggle = (doLogout) => {
        if (!isLargeScreen) {
            setIsSideNavVisible(!isSideNavVisible);
        }

        if (doLogout) {
            localStorage.removeItem("userData")
            window.location.reload();
        }

    }
    return (
        <div className="main">

            <Contact isLargeScreen={isLargeScreen} />

            <div className='ia-header'>
                <Navbar expand={"lg"} className='ia-navbar'>
                    <Container fluid>
                        <Navbar.Brand>
                            <RouterLink className='text-light text-decoration-none' to="/">
                                <img className='logo' src="/logo.svg" alt="" />
                            </RouterLink>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={() => handleSideNavToggle(false)}>
                            {usersData?.photoURL && !isLargeScreen && (
                                <img className='profilePic ms-2' src={usersData.photoURL} />
                            )}
                        </Navbar.Toggle>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="end"
                            show={isSideNavVisible}
                            onHide={() => setIsSideNavVisible(false)}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>Get Mobile IV </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {ROUTES.map((item) => (
                                        <RouterLink onClick={() => handleSideNavToggle(false)} key={item.path} className={`nav-link ${isLargeScreen ? "text-light" : "text-dark"}`} to={item.path}>{item.name}</RouterLink>
                                    ))}
                                    {usersData?.uid && (
                                        <a role='button' onClick={() => handleSideNavToggle(true)} className={`nav-link ${isLargeScreen ? "text-light" : "text-dark"}`} >Logout</a>
                                    )}

                                    {usersData?.photoURL && isLargeScreen && (
                                        <img className='profilePic ms-2' src={usersData.photoURL} />
                                    )}
                                    {/* <NavDropdown
                                    title="More"
                                    id={`offcanvasNavbarDropdown-expand-lg`}
                                >
                                    <NavDropdown.Item href="#action3">Organization</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Your Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        <LogoutIcon className="text-primary" />
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Header