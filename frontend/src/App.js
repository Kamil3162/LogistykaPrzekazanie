import logo from './logo.svg';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Logout from "./components/Logout";
import User from "./components/User";
import VehicleReceivments from "./components/VehicleReceivments";
import TruckPhotoReceivment from "./components/TruckPhotoReceivment";
import SemiTrailerPhotoReceivment from "./components/SemiTrailerPhotoReceivment";
import EquipmentTruckReport from "./components/EquipmentTruckReport";
import EquipmentSemitruckReport from './components/EquipmentSemitruckReport';
import VehicleReceivment from "./components/VehicleReceivment";
import FaultReport from "./components/FaultReport";
import Users from "./components/Users";
import Register from "./components/Register";
/*
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;*/
//const sessionId = document.cookie.split('; ').find(row => row.startsWith('sessionid=')).split('=')[1];
function App() {
  return (
      <div>
          <a href="/login">
              zaloguj
          </a>
          <span> </span>
          <a href="/logout">
              Wyloguj
          </a>
            <span> </span>
          <a href="/user">
              User dane
          </a>
            <span> </span>
          <a href="/report/receivment">
              Report - receivment photo
          </a>
           <br/>
          <a href="/vehicle-receivments">
              Your current Vehicle Receivments
          </a>
          <br/>
          <a href="/report/receivment/truck/equipment">
              Truck Equipment
          </a>
          <br/>
          <a href="/vehicle-receivments/add">
              Make a receivment
          </a>
          <br/>
          <a href="/report/fault">
             Report fault
          </a>
          <br/>
          <a href="/users">
             users Display
          </a>
          <br/>
          <a href="/register">
             Register
          </a>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/vehicle-receivments" element={<VehicleReceivments/>}/>
            <Route path="/vehicle-receivments/add" element={<VehicleReceivment/>}/>
            <Route path="/report/receivment" element={<TruckPhotoReceivment/>}/>
            <Route path="/report/receivment/semitrailer" element={<SemiTrailerPhotoReceivment/>}/>
            <Route path="/report/receivment/truck/equipment" element={<EquipmentTruckReport/>}/>
            <Route path="/report/receivment/semitruck/equipment" element={<EquipmentSemitruckReport/>}/>
            <Route path="/report/fault" element={<FaultReport/>}/>
            <Route path="/users" element={<Users/>}/>
          </Routes>
      </div>
  );
}

export default App;
/*
const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

function App() {
  const [email, setEmial] = useState([]);
    const [password, setPassword] = useState([]);
    const [message, setMessage] = useState("");
    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let response = client.post('api/login',{
                    email:email,
                    password:password
                }
            )
            if (response.status == 200){
                setEmial("");
                setPassword("")
                setMessage("U are log in");
                console.log(response.user);
            }
            else{
                console.log("HTTP REsponse different than 200");
                console.log(email);
                console.log(password);
                //console.log('SessionId:', sessionId);
                console.log(response);
            }
        }catch (err){
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} method="post">
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmial(e.target.value)}
                />
                <input
                    type="text"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {message}
            </form>
        </div>
    );
}

export default App;*/
