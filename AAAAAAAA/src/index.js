import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logout from "./components/Logout";
import User from "./components/User";
import Trucks from "./components/Trucks";
import TruckDetail from "./components/TruckDetail";
import SamiTrucks from "./components/Samitrucks";
import SemituckDetail from "./components/SemituckDetail";
import UserDetail from "./components/UserDetail";
import VehicleReceivments from "./components/VehicleReceivments";
import TruckPhotoReceivment from "./components/TruckPhotoReceivment";
import SemiTrailerPhotoReceivment from "./components/SemiTrailerPhotoReceivment";
import EquipmentSemitruckReport from "./components/EquipmentSemitruckReport";
import FaultReport from "./components/FaultReport";
import Users from "./components/Users";
import Home from "./components/Layout/Home";
import Register from "./components/Layout/Register";
import Login from "./components/Layout/Login";
import VehicleReceivment from "./components/VehicleReceivment/VehicleReceivment";
import EquipmentTruckReport from "./components/EquipmentTruckReport/EquipmentTruckReport";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/trucks" element={<Trucks/>}/>
                <Route path="/truck/:pk" element={<TruckDetail/>}/>
                <Route path="/sami-trucks/" element={<SamiTrucks/>}/>
                <Route path="/sami-truck/:pk" element={<SemituckDetail/>}/>
                <Route path="/user/:pk" element={<UserDetail />} />
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
        </React.StrictMode>
    </BrowserRouter>
);


/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
