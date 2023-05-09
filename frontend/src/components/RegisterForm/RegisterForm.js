import axios from 'axios';
import React, {useState, useEffect} from "react";
import {BtnInput, Form, FormBox, InputBox, RegisterInput, UpperInfo} from "./RegisterFormElements";


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
      <div>

          <FormBox>
              <Form onSubmit={handleSubmit} method="POST">

                  <InputBox>
                      <UpperInfo>Name</UpperInfo>
                      <RegisterInput
                          type="text" value={name} onChange={(e) => setName(e.target.value)} required
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
                      <UpperInfo>Email</UpperInfo>
                      <RegisterInput
                          type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
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
                      <UpperInfo>Mobile phone</UpperInfo>
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

                  <BtnInput
                      type="submit"
                      id="sumbit"
                      value="Rejestracja!"
                  />
              </Form>
          </FormBox>

      </div>

  );
};

export default CreateUserForm;