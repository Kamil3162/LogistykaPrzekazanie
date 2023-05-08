import React, { useState } from 'react';
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/";

const client = axios.create({
    baseURL
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function SemiTrailerForm() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [power, setPower] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [drivenLength, setDrivenLength] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [available, setAvailable] = useState('Wol');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const semiTrailerData = {
      brand,
      model,
      power: parseInt(power),
      registration_number: registrationNumber,
      driven_length: parseInt(drivenLength),
      production_date: productionDate,
      avaiable: available
    };
    try {
      const response = await client.post('/api/trucks/add', semiTrailerData);
      console.log(response.data);
      setBrand('');
      setModel('');
      setPower('');
      setRegistrationNumber('');
      setDrivenLength('');
      setProductionDate('');
      setAvailable('Wol');
      alert('Dodano samochod');
      // Optionally redirect or show a success message
    } catch (error) {
      console.log(error);
      // Optionally show an error message
    }
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="power">Power:</label>
        <input type="number" id="power" value={power} onChange={(e) => setPower(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="registration_number">Registration Number:</label>
        <input type="text" id="registration_number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="driven_length">Driven Length:</label>
        <input type="number" id="driven_length" value={drivenLength} onChange={(e) => setDrivenLength(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="production_date">Production Date:</label>
        <input type="date" id="production_date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} required />
      </div>
      <br />
          <button type="submit">Dodaj</button>
          </form>
        </div>
      );
}
export default SemiTrailerForm;