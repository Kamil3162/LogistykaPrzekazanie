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
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    client.get(`api/user/${pk}`)
        .then(response =>{
            setMyModel(response.data.user)
            console.log(response.data.user);
        })
        .catch(error => {
            console.log(error);
        })
  }, [pk]);


  const handleSubmit = (event) => {
    event.preventDefault();
    client.post(`api/user/${pk}`, {
      name,
      surname,
      city,
      region,
      email,
      password,
      zip_code: zipCode,
      mobile_phone: mobilePhone,
      username,
    })
      .then(response => {
        console.log(response.data);
        alert("zmieniono dane usera");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {myModel && (
        <div>
          <p>Name: {myModel.name}</p>
          <p>Surname: {myModel.surname}</p>
          <p>City: {myModel.city}</p>
          <p>Region: {myModel.region}</p>
          <p>Email: {myModel.email}</p>
          <p>Zip Code: {myModel.zip_code}</p>
          <p>Mobile Phone: {myModel.mobile_phone}</p>
        </div>
      )}
        <form onSubmit={handleSubmit}>
              <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <br />
              <label>
                Surname:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
              </label>
              <br />
              <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
              </label>
              <br />
              <label>
                Region:
                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} required />
              </label>
              <br />
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <br />
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <br />
              <label>
                Zip Code:
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
              </label>
              <br />
              <label>
                Mobile Phone:
                <input type="text" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
              </label>
              <br />
              <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <br />
            <button type="submit">Apply</button>
        </form>
    </div>
  );
}

export default MyModelDetail;