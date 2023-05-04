import React, {useEffect, useState} from "react";
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
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
import UserDetail from "./components/UserDetail";
import Trucks from "./components/Trucks";
import TruckDetail from "./components/TruckDetail";
import SamiTrucks from "./components/Samitrucks";
function App() {
  return (
      <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Zaloguj</Link>
              </li>
              <li>
                <Link to="/logout">Wyloguj</Link>
              </li>
              <li>
                <Link to="/user">User dane</Link>
              </li>
              <li>
                <Link to="/report/receivment">Report - receivment photo</Link>
              </li>
              <li>
                <Link to="/vehicle-receivments">Your current Vehicle Receivments</Link>
              </li>
              <li>
                <Link to="/report/receivment/truck/equipment">Truck Equipment</Link>
              </li>
              <li>
                <Link to="/vehicle-receivments/add">Make a receivment</Link>
              </li>
              <li>
                <Link to="/report/fault">Report fault</Link>
              </li>
              <li>
                <Link to="/users">Users Display</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/trucks">Trucks</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/truck/:pk" element={<TruckDetail/>}/>
            <Route path="/trucks" element={<Trucks/>}/>
            <Route path="/sami-truck/:pk" element={<User/>}/>
            <Route path="/sami-trucks/" element={<User/>}/>
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
      </div>
  );
}

export default App;
