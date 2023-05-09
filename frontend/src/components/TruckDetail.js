import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true
});

function MyModelDetail() {
  const [myModel, setMyModel] = useState(null);
  const { pk } = useParams();
  const formData = new FormData();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [power, setPower] = useState('');
  const [registration_number, setRegistration_number] = useState('');
  const [avaiable, setAvaiable] = useState('');
  const [driven_length, setdriven_length] = useState('');
  const [production_date, setproduction_date] = useState('');

  useEffect(() => {
    client.get(`api/truck/${pk}`)
        .then(response =>{
            setMyModel(response.data)
            console.log(response.data);
            setBrand(response.data.brand);
            setModel(response.data.model);
            setPower(response.data.power);
            setproduction_date(response.data.production_date);
            setdriven_length(response.data.driven_length);
        })
        .catch(error => {
            console.log(error);
        })
  }, [pk]);


  const handleSubmit = (event) => {
    event.preventDefault();
    client.post(`api/truck/modify/${pk}`, {
      brand,
      model,
      power,
      registration_number,
      avaiable,
      driven_length,
      production_date
    })
      .then(response => {
        console.log(response.data);
        alert("zmieniono dane Ciezarówki");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
     <div>
      {myModel && (
        <div>
          <p>Brand: {myModel.brand}</p>
          <p>Model: {myModel.model}</p>
          <p>Power: {myModel.power}</p>
          <p>Registration Number: {myModel.registration_number}</p>
          <p>Driven Kms: {myModel.driven_length} km</p>
          <p>production Data: {myModel.production_date}</p>
          <p>State: {myModel.avaiable}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Brand:
          <input type="text" value={brand || ''} onChange={(e) => setBrand(e.target.value === '' ? null : e.target.value)} />
        </label>
        <br />
        <label>
          Model:
          <input type="text" value={model || ''} onChange={(e) => setModel(e.target.value === '' ? null : e.target.value)} />
        </label>
        <br />
        <label>
          Power:
          <input type="number" value={power || ''} onChange={(e) => setPower(e.target.value === '' ? null : Number(e.target.value))} />
        </label>
        <label>
        Registration Number:
        <input type="text" value={registration_number} onChange={(e) => setRegistration_number(e.target.value)} />
        </label>
        <br />
        <label>
          Avaiable:
          <select value={avaiable} onChange={(e) => setAvaiable(e.target.value)}>
            <option value="">--Select an option--</option>
            <option value="Woln">Wolny</option>
            <option value="Zaj">Zajęty</option>
            <option value="Awar">Awaria</option>
          </select>
        </label>
        <br />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default MyModelDetail;