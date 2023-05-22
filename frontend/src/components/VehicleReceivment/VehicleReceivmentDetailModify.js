import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

const VehicleReceivmentTargetDetail = () => {
  const { pk } = useParams();
  const [receivmentData, setReceivmentData] = useState([]);
  const [target, setTarget] = useState('');

  useEffect(() => {
    client
      .get(`api/vehicle-receivement/${pk}`)
      .then((response) => {
        setReceivmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]);

  const handleSubmit = () => {
    client
      .post(`api/vehicle-receivement/${pk}`, {
        target_address: target,
      })
      .then((response) => {
        console.log(response);
        alert('Ustanowiono cel dla kierowcy');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTargetChange = (event) => {
    const inputValue = event.target.value;
    setTarget(inputValue);
    console.log('Wprowadzono wartość:', inputValue);
    // Perform other operations on the user input value if needed
  };

  return (
    <div>
      {Object.keys(receivmentData).map((key) => (
        <div key={key}>
          <strong>{key}: </strong>
          {receivmentData[key]}
        </div>
      ))}
      <div>
        <label>Dodaj cel "Adres, Miasto, Kod pocztowy, Kraj(PL)";</label>
        <input type="text" onInput={handleTargetChange}></input>
      </div>
      <button onClick={handleSubmit}>Zmien kilometry</button>
    </div>
  );
};

export default VehicleReceivmentTargetDetail;