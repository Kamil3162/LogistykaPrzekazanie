import axios from 'axios';
import React, { useState, useEffect } from "react";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function TruckPhotoSend() {
    const [photo, setPhoto] = useState(null);
    const [receivments, setReceivments] = useState([]);

    const generateData = () => {
        client.get('/api/vehicle-receivements/complain/add/',
            {})
            .then(response => {
                console.log(response.data);
                setReceivments(response.data); // set received data to state
        })
    }

    useEffect(() => {
        generateData(); // call GET request on component mount
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files);
    };

    const handleCheckboxChange = (e) => {
        setReceivments(e.target.value)
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let i=0;i<photo.length; i++){
            formData.append("truck_photo", photo[i]);
        }
        try {
            const response = await client.post("api/vehicle-receivements/complain/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log("Pomyślnie wysłano zdjęcie");
        } catch (error) {
            console.log(error);
            console.log(photo);
        }
    };
    return (
        <div>
            <br/>
          <a href="/report/receivment/semitrailer">
              SemiTrailer Photo
          </a>
            <h1>Upload Photo</h1>
            <input type="file" onChange={handlePhotoChange} />
            <button onClick={handleSubmit}>Upload</button>
            <ul>
                {Array.isArray(receivments) ? receivments.map(receivement => (
                    <li key={receivement.id}>
                        <input type="checkbox" value={receivement.id} onChange={handleCheckboxChange} />
                        <span>ID: {receivement.id}, </span>
                        <span>Created: {receivement.data_created}, </span>
                        <span>Ended: {receivement.data_ended || 'N/A'}, </span>
                        <span>Complain: {receivement.complain}, </span>
                        <span>Truck: {receivement.truck}, </span>
                        <span>Semi Trailer: {receivement.semi_trailer}, </span>
                        <span>User: {receivement.user}</span>
                    </li>
                )):null}
            </ul>
        </div>
    );
}
export default TruckPhotoSend;

