import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {EditForm, EditUserBox, EditUserContainer} from "./Page/EditUser/UserDetailElements";
import {InputBox, RegisterInput, UpperInfo} from "./RegisterForm/RegisterFormElements";
import {BtnSubmit} from "./EquipmentTruckReport/EquipmentTruckElements";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true
});

function SemiTruckDetail() {
    const [myModel, setMyModel] = useState(null);
    const {pk} = useParams();
    const formData = new FormData();
    const [brand, setName] = useState('');
    const [model, setModel] = useState('');
    const [production_year, setproduction_year] = useState('');
    const [registration_number, setRegistration_number] = useState('');
    const [seminote, setSeminote] = useState('');
    const [avaiable, setAvaiable] = useState('');

    useEffect(() => {
        client.get(`api/samitruck/${pk}`)
            .then(response => {
                setMyModel(response.data);
                console.log(response.data);
                setproduction_year(response.data.production_year);
                setRegistration_number(response.data.registration_number);
                setName(response.data.brand);
                setModel(response.data.model);
            })
            .catch(error => {
                console.log(error);
            });
    }, [pk]);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("#brand  "+brand);
        console.log("#model  "+model);
        console.log("#registration_number  "+registration_number);
        console.log("#avaiable  "+avaiable);
        console.log("#production_year  "+production_year);
        console.log("#seminote  "+seminote);
        client.post(`api/samitruck/modify/${pk}`, {
            brand,
            model,
            registration_number,
            avaiable,
            production_year,
            seminote
        })
            .then(response => {
                console.log(response.data);
                alert("zmieniono dane Naczepy");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <EditUserBox>
            <EditUserContainer>
                {myModel && (
                    <div>
                        <p>Brand: {myModel.brand}</p>
                        <p>Model: {myModel.model}</p>
                        <p>production Data: {myModel.production_year}</p>
                        <p>Registration Number: {myModel.registration_number}</p>
                        <p>State: {myModel.avaiable === 'Woln' ? 'Wolny' : (myModel.avaiable === 'Zaje' ? 'Zajete' : 'Awaria')}</p>
                        <p>Zeszyt: {myModel.semi_note ? 'Tak' : 'Nie'}</p>
                    </div>
                )}
                <EditForm onSubmit={handleSubmit}>
                    <InputBox>
                        <UpperInfo>Brand</UpperInfo>
                        <RegisterInput
                            type="text" value={brand} onChange={(e) => setName(e.target.value)} required
                        />
                    </InputBox>

                    <InputBox>
                        <UpperInfo>Model</UpperInfo>
                        <RegisterInput
                            type="text" value={model} onChange={(e) => setModel(e.target.value)} required
                        />
                    </InputBox>

                    <InputBox>
                        <UpperInfo>Registration Number</UpperInfo>
                        <RegisterInput
                            type="text"
                            value={registration_number}
                            defaultValue={myModel?.registration_number || ''}
                            onChange={(e) => setRegistration_number(e.target.value)}
                            required={false}
                        />
                    </InputBox>

                    {myModel && (
                        <InputBox>
                            <UpperInfo>Zeszyt</UpperInfo>
                            <select value={seminote} onChange={(e) => setSeminote(e.target.value)} required>\
                                <option>Wybierz...</option>
                                <option value="true">Jest</option>
                                <option value="false">Brak</option>
                            </select>
                        </InputBox>
                        )}
                    {myModel && (
                        <InputBox>
                            <UpperInfo>Dostępność</UpperInfo>
                            <select value={avaiable} onChange={(e) => setAvaiable(e.target.value)} required>
                                <option>Wybierz...</option>
                                <option value="Woln">Wolny</option>
                                <option value="Zaje">Zajęty</option>
                                <option value="Awar">Awaria</option>
                            </select>
                        </InputBox>
                    )}


                    <BtnSubmit type="submit">Zapisz</BtnSubmit>
                </EditForm>

            </EditUserContainer>
        </EditUserBox>

    );
}

export default SemiTruckDetail;
