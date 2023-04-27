
import React, { useState } from "react";

import axios from 'axios';


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
const endPoint = 'api/vehicle-receivments/complain/equipment/truck';
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function TruckEquipmentForm() {
  const [chest, setChest] = useState(true);
  const [chains, setChains] = useState(true);
  const [jackHitch, setJackHitch] = useState(true);
  const [planetarKey, setPlanetarKey] = useState(true);
  const [manometer, setManometer] = useState(true);
  const [tirePumpingWire, setTirePumpingWire] = useState(true);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {
      chest: chest,
      chains: chains,
      jack_hitch: jackHitch,
      planetar_key: planetarKey,
      manometer: manometer,
      tire_pumping_wire: tirePumpingWire,
    };
    try{
        let response = await client.post(endPoint, data, {});
        if (response.status == 200){
            console.log("wyslano data");
            console.log(data);
            alert("wysłano dane");
        }
    }catch (error){
        console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        Chest:
        <input
          type="checkbox"
          checked={chest}
          onChange={(event) => setChest(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Chains:
        <input
          type="checkbox"
          checked={chains}
          onChange={(event) => setChains(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Jack Hitch:
        <input
          type="checkbox"
          checked={jackHitch}
          onChange={(event) => setJackHitch(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Planetar Key:
        <input
          type="checkbox"
          checked={planetarKey}
          onChange={(event) => setPlanetarKey(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Manometer:
        <input
          type="checkbox"
          checked={manometer}
          onChange={(event) => setManometer(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Tire Pumping Wire:
        <input
          type="checkbox"
          checked={tirePumpingWire}
          onChange={(event) => setTirePumpingWire(event.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TruckEquipmentForm;