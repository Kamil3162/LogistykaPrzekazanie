import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

const Receivmentmodify = () => {
  const [targetAddress, setTargetAddress] = useState('');
  const [information, setinformation] = useState([]);
  const { pk } = useParams();

  useEffect(()=>{
      client.get(`/api/vehicle-receivements/${pk}`)
          .then(response =>{
              console.log(response)
          })
          .catch(error=>{
              console.log(error);
          })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    client.post(`api/vehicle-receivements/${pk}`, targetAddress)
      .then(response => {
        console.log(response.data);
        alert('Vehicle receivment updated successfully');
      })
      .catch(error => {
        console.log(error);
        alert('Failed to update vehicle receivment');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Target Address:
        <input type="text" value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default Receivmentmodify;
