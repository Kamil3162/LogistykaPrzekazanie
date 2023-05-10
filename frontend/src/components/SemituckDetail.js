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
  const [brand, setName] = useState('');
  const [model, setModel] = useState('');
  const [production_year, setproduction_year] = useState('');
  const [registration_number, setRegistration_number] = useState('');
  const [seminote, setSeminote] = useState('');
  const [avaiable, setAvaiable] = useState('');

  useEffect(() => {
    client.get(`api/samitruck/${pk}`)
        .then(response =>{
            setMyModel(response.data)
            console.log(response.data);
            setproduction_year(response.data.production_year);
        })
        .catch(error => {
            console.log(error);
        })
  }, [pk]);


  const handleSubmit = (event) => {
    event.preventDefault();
    client.post(`api/samitruck/modify/${pk}`, {
      brand,
      model,
      registration_number,
      avaiable,
      production_year
    })
      .then(response => {
        console.log(response.data);
        alert("zmieniono dane Naczepy");
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
          <p>production Data: {myModel.production_year}</p>
          <p>Registration Number: {myModel.registration_number}</p>
          <p>State: {myModel.avaiable ? 'Obecny':'Nieobecny'}</p>
        </div>
      )}
        <form onSubmit={handleSubmit}>
              <label>
              Brand:
              <input type="text" value={brand} onChange={(e) => setName(e.target.value)} required />
              </label>
              <br />
              <label>
                Model:
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
              </label>
              <br />
              <label>
                Registration number:
                <input type="text" value={registration_number} onChange={(e) => setRegistration_number(e.target.value)} required />
              </label>
              <br/>
               Zeszyt:
               <select value={seminote} onChange={(e) => setSeminote(e.target.value)} required>
                    <option value="">Wybierz:</option>
                    <option value="true">Jest</option>
                    <option value="false">Brak</option>
              </select>
              <br />
              <label>
                Avaiable:
               <select value={avaiable} onChange={(e) => setAvaiable(e.target.value)} required>
                    <option value="">Wybierz:</option>
                    <option value="Woln">Wolny</option>
                    <option value="Zaj">Zajęty</option>
                    <option value="Awar">Awaria</option>
              </select>
              </label>
            <button type="submit">Apply</button>
        </form>
    </div>
  );
}

export default MyModelDetail;