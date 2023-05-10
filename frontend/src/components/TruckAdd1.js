import React, { useState } from 'react';
import axios from 'axios';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const semiTrailerData = {
            brand,
            model,
            production_year: productionYear,
            registration_number: registrationNumber,
            semi_note: semiNote,
            avaiable: available,
        };
        try {
            const response = await client.post('/api/samitruck/add', semiTrailerData);
            console.log(response.data);
            // Optionally redirect or show a success message
            alert("Pomyslnie dodano naczepe");
        } catch (error) {
            console.log(error);
            // Optionally show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="brand">Brand:</label>
            <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <br/>
            <label htmlFor="model">Model:</label>
            <input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <br/>
            <label htmlFor="productionYear">Production Year:</label>
            <input
                type="date"
                id="productionYear"
                value={productionYear}
                onChange={(e) => setProductionYear(e.target.value)}
            />
            <br/>
            <label htmlFor="registrationNumber">Registration Number:</label>
            <input
                type="text"
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <br/>
            <label htmlFor="semiNote">Semi Note:</label>
            <input
                type="checkbox"
                id="semiNote"
                checked={semiNote}
                onChange={(e) => setSemiNote(e.target.checked)}
            />
            <br/>
            <button type="submit">Zatwierdz</button>
        </form>
    );
}
export default SemiTrailerForm;