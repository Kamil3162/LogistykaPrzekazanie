import React, { useState } from 'react';
import axios from 'axios';
import {EditUserBox, EditUserContainer} from "../EditUser/UserDetailElements";
import {FormBox} from "../../LoginForm/LoginFormElements";
import {InputBox, RegisterInput, UpperInfo} from "../../RegisterForm/RegisterFormElements";
import {BtnSubmit} from "../../EquipmentTruckReport/EquipmentTruckElements";
import {TrucksContainer} from "../Trucks/TruckElements";
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
  const [available, setAvailable] = useState('Woln');
  const handleSubmit = (e) => {
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
    client.post('/api/trucks/add', semiTrailerData)
      .then(response =>{
          console.log(response);
          alert("Dodano ciezarowke");
      })
      .catch(error =>{
          console.log(error);
      })
  };

  return (
      <EditUserBox>
          <TrucksContainer>
              <FormBox>

                  <InputBox>
                      <UpperInfo>Brand</UpperInfo>
                      <RegisterInput
                          type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required
                      />
                  </InputBox>
                  <InputBox>
                      <UpperInfo>Model</UpperInfo>
                      <RegisterInput
                          type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required
                      />
                  </InputBox>
                  <InputBox>
                      <UpperInfo>Power</UpperInfo>
                      <RegisterInput
                          type="number" id="power" value={power} onChange={(e) => setPower(e.target.value)} required
                      />
                  </InputBox>

                  <InputBox>
                      <UpperInfo>Registration Number</UpperInfo>
                      <RegisterInput
                          type="text" id="registration_number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required
                      />
                  </InputBox>
                  <InputBox>
                      <UpperInfo>Driven Length</UpperInfo>
                      <RegisterInput
                          type="number" id="driven_length" value={drivenLength} onChange={(e) => setDrivenLength(e.target.value)} required
                      />
                  </InputBox>
                  <InputBox>
                      <UpperInfo>Production Date</UpperInfo>
                      <RegisterInput
                          type="date" id="production_date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} required
                      />
                  </InputBox>
                  <BtnSubmit onClick={handleSubmit} type="submit">Dodaj</BtnSubmit>
              </FormBox>
          </TrucksContainer>
      </EditUserBox>
      );
}
export default SemiTrailerForm;