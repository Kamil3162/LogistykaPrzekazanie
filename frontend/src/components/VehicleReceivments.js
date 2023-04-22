import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function VehicleReceivmentList() {
  const [vehicleReceivments, setVehicleReceivments] = useState([]);

  useEffect(() => {
    client.get('/api/vehicle-receivements',{
      withCredentials:true
    })
      .then(response => {
        setVehicleReceivments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {vehicleReceivments.map(vehicleReceivment => (
        <div key={vehicleReceivment.id}>
          <p>Truck: {vehicleReceivment.truck}</p>
          <p>Semi-trailer: {vehicleReceivment.semi_trailer}</p>
          <p>Complain: {vehicleReceivment.complain}</p>
          <p>Created: {vehicleReceivment.data_created}</p>
          <p>Ended: {vehicleReceivment.data_ended}</p>
          <p>User: {vehicleReceivment.user}</p>
          <h1>--------------</h1>
        </div>
      ))}
    </div>
  );
}

export default VehicleReceivmentList;