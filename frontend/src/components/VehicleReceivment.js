import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;


const VehicleReceivmentForm = () => {
  const [truck, setTruck] = useState("");
  const [semi_trailer, setSemi_trailer] = useState("");
  const [complain, setComplain] = useState("N");
  const [target_address, setTarget_address] = useState("");
  const [semi_trailers, setSemiTrailers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const data = {
      truck: truck,
      semi_trailer:semi_trailer,
      complain: complain,
      target_address:target_address
  };
  useEffect(() =>{
      client.get('api/samitrucks',{
          withCredentials:true
      }).then(response =>{
          setSemiTrailers(response.data);
          console.log(response.data);
      }).catch(error => {
          console.log(error)
      });
  }, []);

  const handleComplainChecker = () =>{
      if (complain == "T"){
          window.location.href = "/report/receivment";
      }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    client.post('api/vehicle-receivements', data)
        .then(response =>{
        console.log(response.data);
        console.log("wyslano data");
        handleComplainChecker();
    }).catch (error => {
        console.log(error.response);
        alert("Prawdopodobnie twoje zlecenie jeszcze nie zostało skonczone lub samochody albo naczepy są zajete")
    });
  };

  return (
      <div>

          <div>
              Data-
              {semi_trailers.map(semitrailer => (
                  <div key={semitrailer.id}>
                    <p>{semitrailer.registration_number} Stan {semitrailer.avaiable}</p>
                  </div>
              ))}
          </div>
          <form onSubmit={handleSubmit}>
              <label htmlFor="truck">Truck:</label>
              <input type="checkbox" id="truck" checked={truck} onChange={(e) => setTruck(e.target.checked)} />
              <br/>
              <label htmlFor="semi-trailer">Semi-trailer:</label>
              <input type="text" id="semi-trailer" value={semi_trailer} onChange={(e) => setSemi_trailer(e.target.value)} />
              <br/>
              <label htmlFor="semi-trailer">Target Address:</label>
              <input type="text" id="semi-trailer" value={target_address} onChange={(e) => setTarget_address(e.target.value)} />
                <br/>
              <label htmlFor="complain">Complain:</label>
              <select id="complain" value={complain} onChange={(e) => setComplain(e.target.value)}>
                <option value="N">Nie</option>
                <option value="T">Tak</option>
              </select>

              <button type="submit">Submit</button>
            </form>
      </div>
  );
};

export default VehicleReceivmentForm;