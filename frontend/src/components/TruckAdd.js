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
    const [samitrucks, setSamitrucks] = useState([]);

    useEffect(() => {
        client.get('api/samitrucks',{
        withCredentials: true
        })
        .then(response =>{
            setSamitrucks(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleDelete = (id) => {
    client.post(`api/samitruck/${id}`)
        .then(response =>{
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
     };
    return (
    <div>
      {samitrucks.map(samitruck => (
        <div key={samitruck.id}>
          <p>Brand: {samitruck.brand}</p>
          <p>Model: {samitruck.model}</p>
          <p>Rejestracja: {samitruck.registration_number}</p>
          <p>Production Year: {samitruck.production_year}</p>
          <p>Zeszyt: {samitruck.semi_note ? 'Obecny':'Brak'}</p>
          <p>Stan: {samitruck.avaiable}</p>
          <button name="delete" onClick={() => handleDelete(samitruck.id)}>Delete</button>
          <Link to={`/sami-truck/${samitruck.id}`}>
            <button name="modify">Modify</button>
          </Link>
          <h1>--------------</h1>
        </div>
      ))}
    </div>
  );
}

export default VehicleReceivmentList;