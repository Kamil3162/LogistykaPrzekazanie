import React, { useState } from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
const endPoint = 'api/vehicle-receivments/complain/equipment/semitrailer';
function SemiTrailerEquipmentForm() {
  const [formData, setFormData] = useState({
    semi_trailer: '',
    belts: 6,
    corners: 8,
    aluminium_stick: 12,
    wide_stick: 2,
    ladder: true,
    roof_stick: true,
    dimenstion_board: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    client.post(endPoint, formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="belts">Belts:</label>
      <input type="number" name="belts" id="belts" max="12" value={formData.belts} onChange={handleChange} />
        <br/>
      <label htmlFor="corners">Corners:</label>
      <input type="number" name="corners" id="corners" max="16" value={formData.corners} onChange={handleChange} />
        <br/>
      <label htmlFor="aluminium_stick">Aluminium Stick:</label>
      <input type="number" name="aluminium_stick" id="aluminium_stick" max="20" value={formData.aluminium_stick} onChange={handleChange} />
        <br/>
      <label htmlFor="wide_stick">Wide Stick:</label>
      <input type="number" name="wide_stick" id="wide_stick" max="6" value={formData.wide_stick} onChange={handleChange} />
        <br/>
      <label htmlFor="ladder">Ladder:</label>
      <input type="checkbox" name="ladder" id="ladder" checked={formData.ladder} onChange={handleChange} />
        <br/>
      <label htmlFor="roof_stick">Roof Stick:</label>
      <input type="checkbox" name="roof_stick" id="roof_stick" checked={formData.roof_stick} onChange={handleChange} />
        <br/>
      <label htmlFor="dimenstion_board">Dimension Board:</label>
      <input type="checkbox" name="dimenstion_board" id="dimenstion_board" checked={formData.dimenstion_board} onChange={handleChange} />
        <br/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SemiTrailerEquipmentForm;