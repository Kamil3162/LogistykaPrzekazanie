import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarLink,
    SidebarMenu, SidebarRoute,
    SidebarWrapper,
    SideBtnWrap
} from "./SidebarElements";
import React, {useState} from "react";
import axios from "axios";
const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

const Sidebar = (props) => {

    const [session, setSessionId] = useState("");
    const [isAdmin, setisAdmin] = useState(false);

    client.get('api/cookie')
        .then(response => {
            setSessionId(response.data.sessionid);
        })
        .catch(error => {
            console.log(error);
        });


    const fetchUser = () =>{
        client.get('/api/user', {
        })
            .then(response => {
                setisAdmin(response.data.is_admin);
                console.log(isAdmin);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (

        <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
            <Icon onClick={props.toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>

                    <SidebarLink to='/user' onClick={props.toggle}>
                        User dane
                    </SidebarLink>
                    <SidebarLink to='/report/receivment' onClick={props.toggle}>
                        Report - receivment photo
                    </SidebarLink>

                    <SidebarLink to='/vehicle-receivments' onClick={props.toggle}>
                        Your current Vehicle Receivments
                    </SidebarLink>
                    <SidebarLink to='/vehicle-receivments/add' onClick={props.toggle}>
                        Make a receivment
                    </SidebarLink>
                    <SidebarLink to='/report/fault' onClick={props.toggle}>
                        Report fault
                    </SidebarLink>
                    {isAdmin &&
                        <>
                            <SidebarLink to='/report/receivment/truck/equipment' onClick={props.toggle}>
                                Truck Equipment
                            </SidebarLink>
                            <SidebarLink to='/users' onClick={props.toggle}>
                                Users Display
                            </SidebarLink>
                            <SidebarLink to='/register' onClick={props.toggle}>
                            Register
                            </SidebarLink>
                            <SidebarLink to='/trucks' onClick={props.toggle}>
                                Trucks
                            </SidebarLink>
                            <SidebarLink to='/sami-trucks/' onClick={props.toggle}>
                                Samitrucks
                            </SidebarLink>
                        </>
                    }



                </SidebarMenu>
                {!session &&
                    <SideBtnWrap>
                        <SidebarRoute to='/login'>ZALOGUJ SIĘ</SidebarRoute>
                    </SideBtnWrap>
                }
                {session &&
                    <SideBtnWrap>
                        <SidebarRoute to='/logout'>WYLOGUJ SIĘ</SidebarRoute>
                    </SideBtnWrap>
                }

            </SidebarWrapper>
        </SidebarContainer>
    );
}

export default Sidebar;