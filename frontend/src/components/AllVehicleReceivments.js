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

function VehicleReceivmentList() {
  const [vehicleReceivments, setVehicleReceivments] = useState([]);
  useEffect(() => {
    client.get('/api/vehicle-receivements/complains',{
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

  return (
    <div>
    {vehicleReceivments.map((vehicleReceivment) => (
      <div key={vehicleReceivment.id}>
          <label>Truck:</label>
        <p>{vehicleReceivment.truck}</p>
          <label>Semitrailer:</label>
        <p>{vehicleReceivment.semi_trailer}</p>
          <label>User:</label>
        <p>{vehicleReceivment.user}</p>
          <label>Complain:</label>
        <p>{vehicleReceivment.complain}</p>
          <Link to={`/report/fault/${vehicleReceivment.id}`}>
            <button name="modify">Pokaz</button>
          </Link>
      </div>
    ))}
  </div>
  );
}

export default VehicleReceivmentList;