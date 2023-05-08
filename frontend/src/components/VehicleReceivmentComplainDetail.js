import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;


const FaultsDisplay = () => {
    // url do kazdego faults display get of course
    // click to odsylacz do fault

    const [photos, setPhotos] = useState([]);
    const [vehicleReceivments, setvehicleReceivment] = useState([]);
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

    useEffect(() => {
        client.get(`/api/vehicle-receivements/${pk}`,{
            withCredentials:true
        }).then(response =>{
            console.log(response.data);
            console.log("esa")
            setvehicleReceivment(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, []);

    return (
        <div>
        {photos.map((photo) => (
          <img key={photo.id} src={`http://127.0.0.1:8000${photo.photo}`} alt={`Photo ${photo.id}`} />
        ))}
        {vehicleReceivments.map((vehicleReceivment) => (
          <div key={vehicleReceivment.id}>
            <p>Truck: {vehicleReceivment.truck}</p>
            <p>Semi-trailer: {vehicleReceivment.semi_trailer}</p>
            <p>Complain: {vehicleReceivment.complain}</p>
            <p>Created: {vehicleReceivment.data_created}</p>
            <p>Ended: {vehicleReceivment.data_ended}</p>
            <p>User: {vehicleReceivment.user}</p>
            <h1>--------------</h1>
          </div>
        ))}
      </div>
    );
}
export default FaultsDisplay;