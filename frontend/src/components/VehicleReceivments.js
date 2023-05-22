import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
const handleButtonClick = () => {
    const url = 'api/vehicle-receivements/finish';
    client.post(url,{
    }).then(response => {
        console.log(response);
    });
};
const handleFaultClick = () =>{
    const url = 'api/faults';
    client.post(url, {
    }).then(response => {
        console.log(response);
    })
}

function VehicleReceivmentList() {
  const [vehicleReceivments, setVehicleReceivments] = useState([]);

  useEffect(() => {
    client.get('/api/vehicle-receivements',{
      withCredentials:true
    })
      .then(response => {
        setVehicleReceivments(response.data);
        console.log(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function initMap(lat, lng) {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 8,
    });
  }
  return (
    <div>
      {vehicleReceivments.map(vehicleReceivment => (
        <div key={vehicleReceivment.id}>
          <p>Truck: {vehicleReceivment.truck}</p>
          <p>Semi-trailer: {vehicleReceivment.semi_trailer}</p>
          <p>Complain: {vehicleReceivment.complain}</p>
          <p>Created: {vehicleReceivment.data_created}</p>
          <p>Target: {vehicleReceivment.target_address}</p>
          <p>Ended: {vehicleReceivment.data_ended}</p>
          <p>User: {vehicleReceivment.user}</p>
            <Link to={`/vehicle-receivments/${vehicleReceivment.id}`}>
            <button name="modify">Pokaz szczególy</button>
            </Link>
            <Link to={`/vehicle-receivment/${vehicleReceivment.id}`}>
            <button name="modify">Modifykuj</button>
            </Link>
          <h1>--------------</h1>
        </div>
      ))}
    <button onClick={handleButtonClick}>Zdaj Pojazdy</button>
    <Link to={`/report/fault`}>
        <button name="modify">Zglos awarie</button>
    </Link>
    </div>
  );
}

export default VehicleReceivmentList;