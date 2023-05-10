import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {InputBox, RegisterInput, UpperInfo} from "../../RegisterForm/RegisterFormElements";
import {BtnSubmit} from "../../EquipmentTruckReport/EquipmentTruckElements";
import {EditForm, EditUserBox, EditUserContainer} from "./UserDetailElements";

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
      <EditUserBox>
          <EditUserContainer>
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
                  <EditForm onSubmit={handleSubmit}>
                      <InputBox>
                          <UpperInfo>Name</UpperInfo>
                          <RegisterInput
                              type="text"value={name} onChange={(e) => setName(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Surname</UpperInfo>
                          <RegisterInput
                              type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>City</UpperInfo>
                          <RegisterInput
                              type="text" value={city} onChange={(e) => setCity(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Region</UpperInfo>
                          <RegisterInput
                              type="text" value={region} onChange={(e) => setRegion(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Password</UpperInfo>
                          <RegisterInput
                              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Zip Code</UpperInfo>
                          <RegisterInput
                              type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Mobile Phone</UpperInfo>
                          <RegisterInput
                              type="text" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)}
                          />
                      </InputBox>
                      <InputBox>
                          <UpperInfo>Username</UpperInfo>
                          <RegisterInput
                              type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                          />
                      </InputBox>

                      <BtnSubmit type="submit">Apply</BtnSubmit>
                  </EditForm>
              </div>
          </EditUserContainer>
      </EditUserBox>
  );
}

export default MyModelDetail;