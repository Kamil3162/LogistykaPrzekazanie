import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";
import {NavBtnLink} from "./Navbar/NavbarElements";
import {BtnSubmit} from "./EquipmentTruckReport/EquipmentTruckElements";

const AnyReactComponent = ({text}) => <div>{text}</div>;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function VehicleReceivmentList() {
    const [vehicleReceivments, setVehicleReceivments] = useState([]);
    const handleButtonClick = () => {
        const url = 'api/vehicle-receivements/finish';
        client.post(url, {}).then(response => {
            window.location.reload();
            console.log(response);
        });
    };

    const [session, setSessionId] = useState("");
    client.get('api/cookie')
        .then(response => {
            setSessionId(response.data.sessionid);
        })
        .catch(error => {
            console.log(error);
        });

    const [isAdmin, setisAdmin] = useState(false);

    client.get('/api/user', {})
        .then(response => {
            setisAdmin(response.data.is_admin);
            console.log(isAdmin);
        })
        .catch(error => {
            console.error(error);
        });

    const handleFaultClick = () => {
        const url = 'api/faults';
        client.post(url, {}).then(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        client.get('/api/vehicle-receivements', {
            withCredentials: true
        })
            .then(response => {
                setVehicleReceivments(response.data);
                console.log(response.data[0]);

            })
            .catch(error => {
                console.log(error);
                setVehicleReceivments(undefined);
            });
    }, []);

    function initMap(lat, lng) {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: {lat, lng},
            zoom: 8,
        });
    }

    function handleFinishReceivment(pk) {
        client.post(`api/vehicle-receivements/admin/finish/${pk}`, {})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="page">
            {session && <>


            {(vehicleReceivments != null && vehicleReceivments.length > 0) &&
                <div style={{textAlign: "center"}}>
                    <h2>Aktualny samochod</h2>
                    {vehicleReceivments.map(vehicleReceivment => (
                        <div key={vehicleReceivment.id}>
                            <p>Truck: {vehicleReceivment.truck}</p>
                            <p>Semi-trailer: {vehicleReceivment.semi_trailer}</p>
                            <p>Complain: {vehicleReceivment.complain}</p>
                            <p>Created: {vehicleReceivment.data_created}</p>
                            <p>Target: {vehicleReceivment.target_address}</p>
                            <p>Ended: {vehicleReceivment.data_ended}</p>
                            <p>User: {vehicleReceivment.user}</p>
                            {vehicleReceivment.complain === 'A' && !vehicleReceivment.data_ended && isAdmin && (
                                <>
                                    <BtnSubmit name="modify"
                                               onClick={() => handleFinishReceivment(vehicleReceivment.id)}>
                                        Zakoncz
                                    </BtnSubmit>
                                </>
                            )}
                            <Link to={`/vehicle-receivments/${vehicleReceivment.id}`}>
                                <BtnSubmit name="modify">Pokaz szczególy</BtnSubmit>
                            </Link>
                            {!vehicleReceivment.target_address && isAdmin && (
                                <>
                                    <Link to={`/vehicle-receivment/${vehicleReceivment.id}`}>
                                        <BtnSubmit name="modify">Dodaj trase</BtnSubmit>
                                    </Link>
                                </>
                            )}
                        </div>
                    ))}

                    <BtnSubmit style={{background: "linear-gradient(to right,#58c652bf ,#24912c)"}}
                               onClick={handleButtonClick}>Zdaj Pojazdy</BtnSubmit>
                    <Link to={`/report/fault`}>
                        <BtnSubmit style={{background: "linear-gradient(to right,#ca4e4e ,#a61c1c)", margin: "20px"}}
                                   name="modify">Zglos awarie</BtnSubmit>
                    </Link>
                </div>
            }
            {(vehicleReceivments == null || vehicleReceivments.length <= 0) &&
                <>
                    <div className="col-12 text-center height-half">
                        <span className="font20">Nie posiadasz zadnego wynajetego samochodu</span>
                        <div style={{marginTop: "20px"}}>
                            <NavBtnLink to="/vehicle-receivments/add">WYNAJMIJ</NavBtnLink>
                        </div>
                    </div>
                </>

            }
            </>
            }

        </div>
    );
}

export default VehicleReceivmentList;