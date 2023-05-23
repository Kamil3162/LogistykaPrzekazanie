import React, { useState } from 'react';
import axios from 'axios';
import {EditUserBox, EditUserContainer} from "../EditUser/UserDetailElements";
import {InputBox, RegisterInput, UpperInfo} from "../../RegisterForm/RegisterFormElements";
import {BtnSubmit} from "../../EquipmentTruckReport/EquipmentTruckElements";
import {FormBox} from "../../LoginForm/LoginFormElements";
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
    const [productionYear, setProductionYear] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [semiNote, setSemiNote] = useState(true);
    const [available, setAvailable] = useState('Woln');

    const handleSubmit = () => {
        const semiTrailerData = {
            brand,
            model,
            production_year: productionYear,
            registration_number: registrationNumber,
            semi_note: semiNote,
            avaiable: available,
        };
           client.post('/api/samitruck/add', semiTrailerData).then(response =>{
                console.log(response.data);
                alert("Pomyslnie dodano naczepe");
           })
               .catch (error=>{
            console.log(error);
        })
    };

    return (
        <EditUserBox>
            <TrucksContainer>
                <FormBox onSubmit={handleSubmit}>

                    <InputBox>
                        <UpperInfo>Brand</UpperInfo>
                        <RegisterInput
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </InputBox>

                    <InputBox>
                        <UpperInfo>Model</UpperInfo>
                        <RegisterInput
                            type="text"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </InputBox>

                    <InputBox>
                        <UpperInfo>Production Year</UpperInfo>
                        <RegisterInput
                            type="date"
                            id="productionYear"
                            value={productionYear}
                            onChange={(e) => setProductionYear(e.target.value)}
                        />
                    </InputBox>

                    <InputBox>
                        <UpperInfo>Registration Number</UpperInfo>
                        <RegisterInput
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                        />
                    </InputBox>


                    <InputBox>
                        <UpperInfo>semiNote</UpperInfo>
                        <RegisterInput
                            type="checkbox"
                            id="semiNote"
                            checked={semiNote}
                            onChange={(e) => setSemiNote(e.target.checked)}
                        />
                    </InputBox>
                    <BtnSubmit
                        onClick={handleSubmit}
                        type="submit">Dodaj</BtnSubmit>
                </FormBox>
            </TrucksContainer>
        </EditUserBox>
    );
}
export default SemiTrailerForm;