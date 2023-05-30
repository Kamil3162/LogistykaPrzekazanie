import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logout from "./components/Logout";
import SemiTrailerPhotoReceivment from "./components/SemiTrailerPhotoReceivment";
import EquipmentSemitruckReport from "./components/EquipmentSemitruckReport";
import Home from "./components/Layout/Home";
import Register from "./components/Layout/Register";
import RegisterAdmin from "./components/Layout/RegisterAdmin";
import Login from "./components/Layout/Login";
import User from "./components/Layout/User";
import VehicleAdd from "./components/Layout/VehicleAdd";
import Trucks from "./components/Layout/Trucks";
import ModifyUsers from "./components/Layout/ModifyUsers";
import EditUser from "./components/Layout/EditUser";
import TruckEquipment from "./components/Layout/TruckEquipment";
import EditTruck from "./components/Layout/EditTruck";
import AddSamiTrucks from "./components/Layout/AddSamiTruck";
import AddTrucks from "./components/Layout/AddTruck";
import ReportFault from "./components/Layout/ReportFault";
import TruckPhoto from "./components/Layout/TruckPhoto";
import VehicleReceivmentDetailModify from "./components/VehicleReceivment/VehicleReceivmentDetailModify";
import VehicleReceivmentDetail from "./components/VehicleReceivment/VehicleReceivmentDetail";

import './style.css'
import SamiTrucksLayout from "./components/Layout/SamiTrucksLayout";
import EditSamiTruckLayout from "./components/Layout/EditSamiTruckLayout";
import FaultsLayout from "./components/Layout/FaultsLayout";
import FaultsImageLayout from "./components/Layout/FaultsImageLayout";
import VehicleReceivments from "./components/VehicleReceivments";
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
                <Route path="/trucks/add" element={<AddTrucks/>}/>
                <Route path="/truck/:pk" element={<EditTruck/>}/>
                <Route path="/sami-truck/:pk" element={<EditSamiTruckLayout/>}/>
                <Route path="/sami-trucks/" element={<SamiTrucksLayout/>}/>}
                <Route path="/sami-trucks/add" element={<AddSamiTrucks/>}/>}
                <Route path="/user/:pk" element={<EditUser />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/vehicle-receivment/:pk" element={<VehicleReceivmentDetailModify/>}/>
                <Route path="/vehicle-receivments" element={<VehicleReceivments/>}/>
                <Route path="/vehicle-receivments/:pk" element={<VehicleReceivmentDetail/>}/>
                <Route path="/vehicle-receivments/add" element={<VehicleAdd/>}/>
                <Route path="/admin-register/675473fdsghhfds632156f" element={<RegisterAdmin/>}/>
                <Route path="/report/receivment" element={<TruckPhoto/>}/>
                <Route path="/report/receivment/semitrailer" element={<SemiTrailerPhotoReceivment/>}/>
                <Route path="/report/receivment/truck/equipment" element={<TruckEquipment/>}/>
                <Route path="/report/receivment/semitruck/equipment" element={<EquipmentSemitruckReport/>}/>
                <Route path="/report/fault" element={<ReportFault/>}/>
                <Route path="/faults" element={<FaultsLayout/>}/>}
                <Route path="/faults/:pk" element={<FaultsImageLayout/>}/>}
                <Route path="/users" element={<ModifyUsers/>}/>
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
