import axios from 'axios';
import React, { useState, useEffect } from "react";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
const endpoint = 'api/vehicle-receivements/complain/add';
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function TruckPhotoSend() {
    const [photo, setPhoto] = useState(null);
    const [reveivments, setReceivments] = useState([]);

    const generateData = () => {
        client.get('api/vehicle-receivements/complain/add', {}).then(response => {
            console.log(response);
            setReceivments(response.data); // set received data to state
        })
    }

    useEffect(() => {
        generateData(); // call GET request on component mount
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleCheckboxChange = (e) => {
        // handle checkbox change here and store the selected options to a state
    };

    let handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("truck_photo", photo);
        try {
            client.post("api/vehicle-receivements/complain/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => {
                console.log("Pomyślnie wysłano zdjęcie");
            });
        } catch (error) {
            console.log(error);
            console.log(photo);
        }
    };

    return (
        <div>
            <h1>Upload Photo</h1>
            <input type="file" onChange={handlePhotoChange} />
            <button onClick={handlesubmit}>Upload</button>

            {/* render data from GET request */}
            <ul>
                {reveivments.map(receivement => (
                    <li key={receivement.id}>
                        <input type="checkbox" value={receivement.id} onChange={handleCheckboxChange} />
                        {receivement.data_ended}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TruckPhotoSend;