import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link} from "react-router-dom";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;


const FaultsDisplay = () => {
    // url do kazdego faults display get of course
    // click to odsylacz do fault
    const [photos, setPhotos] = useState([]);
    const { pk } = useParams();
    useEffect(() => {
        client.get(`/api/faults/${pk}`,{
            withCredentials:true
        }).then(response =>{
            console.log(response.data);
            setPhotos(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, []);
    return (
    <div>
        {photos.map(photo => (
        <img key={photo.id} src={`http://127.0.0.1:8000${photo.photo}`} alt={`Photo ${photo.id}`} />          ))}
    </div>
    );
}
export default FaultsDisplay;