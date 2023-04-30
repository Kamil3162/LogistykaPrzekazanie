import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

const VehicleReceivmentForm = () => {
  const [truck, setTruck] = useState("");
  const [semiTrailer, setSemiTrailer] = useState("");
  const [complain, setComplain] = useState("N");

  const data = {
      truck: truck,
      semi_truck:semiTrailer,
      complain: complain
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
        client.post('api/vehicle-receivements')
            .then(response =>{
            console.log(response);
            console.log("wyslano data");
        })
    }catch (error){
        console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="truck">Truck:</label>
      <input type="text" id="truck" value={truck} onChange={(e) => setTruck(e.target.value)} />

      <label htmlFor="semi-trailer">Semi-trailer:</label>
      <input type="text" id="semi-trailer" value={semiTrailer} onChange={(e) => setSemiTrailer(e.target.value)} />

      <label htmlFor="complain">Complain:</label>
      <select id="complain" value={complain} onChange={(e) => setComplain(e.target.value)}>
        <option value="N">Nie</option>
        <option value="T">Tak</option>
        <option value="A">Awaria</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default VehicleReceivmentForm;