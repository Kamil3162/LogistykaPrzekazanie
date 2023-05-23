import React, {useEffect, useState} from "react";
import {MobileIcon, Nav, NavBtn, NavBtnLink, NavContainer, NavItem, NavLinks, NavLogo, NavMenu} from "./NavbarElements";
import {FaBars} from 'react-icons/fa';
import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
const Navbar = (props) => {

    const [session, setSessionId] = useState("");
    client.get('api/cookie')
        .then(response => {
            setSessionId(response.data.sessionid);
        })
        .catch(error => {
            console.log(error);
        });

    const [isAdmin, setisAdmin] = useState(false);
    
    client.get('/api/user', {
    })
    .then(response => {
        setisAdmin(response.data.is_admin);
        console.log(isAdmin);
    })
    .catch(error => {
        console.error(error);
    });


    return (
        <Nav>
            <NavContainer>
                <NavLogo>
                    LOGISTICS
                </NavLogo>
                <MobileIcon onClick={props.toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>

                    {isAdmin &&
                        <>
                            <NavItem>
                                <NavLinks to="/report/receivment/truck/equipment">Truck Equipment</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/users'>Users Display</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/register'>Register</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/trucks'>Trucks</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/sami-trucks/">Samitrucks</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/faults">Faults</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/sami-trucks/add">SamiTruck Add</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/trucks/add">Trucks Add</NavLinks>
                            </NavItem>
                        </>
                    }
                    {session &&
                        <>
                            <NavItem>
                                <NavLinks to="/user">User dane</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/report/receivment">Report - receivment photo</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/vehicle-receivments">Your current Vehicle Receivments</NavLinks>
                            </NavItem>

                            <NavItem>
                                <NavLinks to="/vehicle-receivments/add">Make a receivment</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/report/fault">Report fault</NavLinks>
                            </NavItem>

                        </>
                    }
                </NavMenu>
                {!session &&
                    <NavBtn>
                        <NavBtnLink to='/login'>ZALOGUJ SIĘ</NavBtnLink>
                    </NavBtn>
                }
                {session &&

                    <NavBtn>
                        <NavBtnLink to="/logout">Wyloguj</NavBtnLink>
                    </NavBtn>

                }
            </NavContainer>
        </Nav>

    );
}

export default Navbar;