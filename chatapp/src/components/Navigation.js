import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/chat.svg";
import './navigation.css'
function Navigation() {
    const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }

    function ShowSideNav(){
        let ContactBtn = document.querySelector(".ContactsBtn")
        let SideNav = document.getElementById("SideNav")
        ContactBtn.addEventListener("click", ()=>{
            SideNav.classList.toggle("show")
        })
    }
    return (
        <Navbar className="nav-bar">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img alt="" src={logo} style={{ width: "clamp(30px, 5vw, 50px)"}} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        {user && (
                            <LinkContainer to="/chat" onClick={ShowSideNav}>
                                <Nav.Link className="ContactsBtn">Contacts</Nav.Link>
                            </LinkContainer>
                        )} 
                       
                        <LinkContainer to="/chat" style={{display: "flex", alignItems: "center"}}>
                            <Nav.Link className="MsgrBtn" >Messenger</Nav.Link>
                        </LinkContainer>

                       
                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png" style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown">
                            
                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
