import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

const FaultsDisplay = () => {
    // url do kazdego faults display get of course
    // click to odsylacz do fault
    const [photo, setPhoto] = useState(null);
    const [semi_photo, setsemi_Photo] = useState(null);
    const [semi_photos, setsemi_Photos] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [vehicleReceivments, setvehicleReceivment] = useState([]);
    const { pk } = useParams();

    useEffect(() => {
        client.get(`/api/vehicle-receivements/complain/add/${pk}`,{
            withCredentials:true
        }).then(response =>{
           console.log(response.data);
           console.log(pk);
           setPhotos(response.data);
           if (response.data.length > 0) {
             setPhoto(response.data[0]);
      }
    }).catch(error => {
      console.log(error);
    });
    }, []);

    useEffect(() => {
        client.get(`/api/vehicle-receivements/complain/semitruck/add/${pk}`,{
            withCredentials:true
        }).then(response =>{
           console.log('semitruck');
           console.log(response.data);
           console.log(pk);
           setsemi_Photos(response.data);
           if (response.data.length > 0) {
             setsemi_Photo(response.data[0]);
      }
    }).catch(error => {
      console.log(error);
    });
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
      {photo && <img key={photo.id} src={`http://127.0.0.1:8000${photo.truck_photo}`} alt={`Photo ${photo.id}`} />}
      {semi_photo && <img key={semi_photo.id} src={`http://127.0.0.1:8000${semi_photo.semitrailer_photo}`} alt={`SemiPhoto ${semi_photo.id}`} />}

      {vehicleReceivments && (
        <div>
          <p>Truck: {vehicleReceivments.truck}</p>
          <p>Semi-trailer: {vehicleReceivments.semi_trailer}</p>
          <p>Complain: {vehicleReceivments.complain}</p>
          <p>Created: {vehicleReceivments.data_created}</p>
          <p>Ended: {vehicleReceivments.data_ended}</p>
          <p>User: {vehicleReceivments.user}</p>
          <h1>--------------</h1>
        </div>
      )}
      {photos.length > 1 && (
        <div>
          {photos.slice(1).map(photo => (
            <img key={photo.id} src={`http://127.0.0.1:8000${photo.truck_photo}`} alt={`Photo ${photo.id}`} />
          ))}
        </div>
      )}
       {semi_photos.length > 1 && (
        <div>
          {photos.slice(1).map(photo => (
            <img key={photo.id} src={`http://127.0.0.1:8000${photo.semitrailer_photo}`} alt={`Photo ${photo.id}`} />
          ))}
        </div>
      )}
    </div>
    );
}
export default FaultsDisplay;