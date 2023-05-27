import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BtnSubmit, FormVehicle, LineForm, VehicleContainer, VihicleH2} from "./VehicleReceivmentElements";
import { useNavigate } from 'react-router-dom';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;


const VehicleReceivmentForm = () => {
  const [truck, setTruck] = useState("");
  const [semi_trailer, setSemiTrailer] = useState("");
  const [complain, setComplain] = useState("N");
  const [semi_trailers, setSemiTrailers] = useState([]);
  const [target_address, setTarget_address] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
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

    useEffect(() => {
        if (semi_trailers.length > 0) {
            setSemiTrailer(semi_trailers[0].registration_number);
        }
    }, [semi_trailers]);

  const handleComplainChecker = () =>{
      if (complain == "T"){
          navigate("/report/receivment");
      }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data.semi_trailer);
    client.post('api/vehicle-receivements', data)
        .then(response =>{
        console.log(response.data);
        console.log("wyslano data");
        return navigate("/");

    }).catch (error => {
        console.log(error.response);
        alert("Prawdopodobnie twoje zlecenie jeszcze nie zostało skonczone lub samochody albo naczepy są zajete")
    });
  };

  return (
      <VehicleContainer>
            <VihicleH2>Wynajmij samochod</VihicleH2>
          <FormVehicle onSubmit={handleSubmit}>
              <LineForm>
                  <label htmlFor="truck">Truck:</label>
                  <input type="checkbox" id="truck" checked={truck} onChange={(e) => setTruck(e.target.checked)} />
              </LineForm>

              <LineForm>
                  <label htmlFor="semi-trailer">Semi-trailer:</label>
                  <select
                      id="semi-trailer"
                      value={semi_trailer}
                      onChange={(e) => setSemiTrailer(e.target.value)}
                  >
                      {semi_trailers.map((semitrailer) => (
                          <option key={semitrailer.id} value={semitrailer.registration_number}>
                              {semitrailer.registration_number}
                          </option>
                      ))}
                  </select>
              </LineForm>

              <LineForm>
                  <label htmlFor="complain">Complain:</label>
                  <select id="complain" value={complain} onChange={(e) => setComplain(e.target.value)}>
                      <option value="N">Nie</option>
                      <option value="T">Tak</option>
                  </select>
              </LineForm>

              <LineForm>
                  <label htmlFor="semi-trailer">Target Address:</label>
                  <input type="text" id="semi-trailer" value={target_address} onChange={(e) => setTarget_address(e.target.value)} />
              </LineForm>



              <BtnSubmit type="submit">Submit</BtnSubmit>
            </FormVehicle>
      </VehicleContainer>
  );
};

export default VehicleReceivmentForm;