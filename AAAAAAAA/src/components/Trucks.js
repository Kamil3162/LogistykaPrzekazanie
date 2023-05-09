import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/";

const client = axios.create({
    baseURL
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function VehicleReceivmentList() {
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        client.get('api/trucks',{
        withCredentials: true
        })
        .then(response =>{
            setTrucks(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleDelete = (id) => {
    client.post(`api/truck-del/${id}`)
        .then(response =>{
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
     };
    return (
    <div>
      {trucks.map(truck => (
        <div key={truck.id}>
          <p>Truck: {truck.brand}</p>
          <p>Semi-trailer: {truck.model}</p>
          <p>Complain: {truck.power}</p>
          <p>Created: {truck.registration_number}</p>
          <p>Ended: {truck.driven_length}</p>
          <p>User: {truck.production_date}</p>
          <p>User: {truck.avaiable}</p>
          <button name="delete" onClick={() => handleDelete(truck.id)}>Delete</button>
          <Link to={`/truck/${truck.id}`}>
            <button name="modify">Modify</button>
          </Link>
          <h1>--------------</h1>
        </div>
      ))}
    </div>
  );
}

export default VehicleReceivmentList;