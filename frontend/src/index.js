import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logout from "./components/Logout";
import SemituckDetail from "./components/SemituckDetail";
import VehicleReceivments from "./components/VehicleReceivments";
import SemiTrailerPhotoReceivment from "./components/SemiTrailerPhotoReceivment";
import EquipmentSemitruckReport from "./components/EquipmentSemitruckReport";
import Home from "./components/Layout/Home";
import Register from "./components/Layout/Register";
import Login from "./components/Layout/Login";
import User from "./components/Layout/User";
import VehicleAdd from "./components/Layout/VehicleAdd";
import Trucks from "./components/Layout/Trucks";
import ModifyUsers from "./components/Layout/ModifyUsers";
import EditUser from "./components/Layout/EditUser";
import TruckEquipment from "./components/Layout/TruckEquipment";
import EditTruck from "./components/Layout/EditTruck";
import SamiTrucks from "./components/TruckAdd";
import Faults from "./components/Faults";
import FaultsDetail from "./components/FaultsDetail";
import AddSamiTrucks from "./components/Layout/AddSamiTruck";
import AddTrucks from "./components/Layout/AddTruck";
import ReportFault from "./components/Layout/ReportFault";
import TruckPhoto from "./components/Layout/TruckPhoto";
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
                <Route path="/sami-truck/:pk" element={<SemituckDetail/>}/>
                <Route path="/sami-trucks/" element={<SamiTrucks/>}/>}
                <Route path="/sami-trucks/add" element={<AddSamiTrucks/>}/>}
                <Route path="/user/:pk" element={<EditUser />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/vehicle-receivments" element={<VehicleReceivments/>}/>
                <Route path="/vehicle-receivments/add" element={<VehicleAdd/>}/>
                <Route path="/report/receivment" element={<TruckPhoto/>}/>
                <Route path="/report/receivment/semitrailer" element={<SemiTrailerPhotoReceivment/>}/>
                <Route path="/report/receivment/truck/equipment" element={<TruckEquipment/>}/>
                <Route path="/report/receivment/semitruck/equipment" element={<EquipmentSemitruckReport/>}/>
                <Route path="/report/fault" element={<ReportFault/>}/>
                <Route path="/faults" element={<Faults/>}/>}
                <Route path="/faults/:pk" element={<FaultsDetail/>}/>}
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
