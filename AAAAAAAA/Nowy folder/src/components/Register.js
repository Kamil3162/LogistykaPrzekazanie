import axios from 'axios';
import React, {useState, useEffect} from "react";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});


const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    client.post('/api/register', {
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
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
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
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;