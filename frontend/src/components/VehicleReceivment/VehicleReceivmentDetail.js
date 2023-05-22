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
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDFJP1D7ZS4HV8MKuDjmpj6zO-ADxFk0ko',
          }}
          defaultCenter={{ lat: 50.0147, lng: 22.6714 }}
          defaultZoom={8}
        >
          <AnyReactComponent lat={50.0147} lng={22.6714} text="Jarosław" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default VehicleReceivmentTargetDetail;