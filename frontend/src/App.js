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
import SamiTrucks from "./components/TruckAdd";
import SemituckDetail from "./components/SemituckDetail";
import Faults from "./components/Faults";
import FaultsDetail from "./components/FaultsDetail";
import AllVehicleReceivments from "./components/AllVehicleReceivments";
import SemiTruckAdd1 from "./components/SemiTruckAdd1";
import TruckAdd1 from "./components/TruckAdd1";
import VehicleReceivmentComplainDetail
  from "./components/VehicleReceivmentComplainDetail";
import ReceivmentModify from "./components/ReceivmentModify";

import axios from "axios";
function App() {
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
  });
  client.defaults.xsrfCookieName = 'csrftoken';
  client.defaults.xsrfHeaderName = 'X-CSRFToken';
  client.defaults.withCredentials = true;

  const [currentUser, setCurrentUser] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const fetchUser = () =>{
    client.get('/api/user', {
    })
    .then(response => {
      setCurrentUser(response.data);
      setisAdmin(response.data.is_admin);
      console.log(isAdmin);
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(() => {
    fetchUser()
  }, [])
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
                  <Link to="/vehicle-receivments/add">Make a receivment</Link>
              </li>
              {isAdmin ? (
                  <>
                     <li>
                      <Link to="/report/receivment/truck/equipment">Truck Equipment</Link>
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
                    <li>
                      <Link to="/trucks/add">Add Trucks</Link>
                    </li>
                    <li>
                      <Link to="/sami-trucks/">Samitrucks</Link>
                    </li>
                    <li>
                      <Link to="/sami-trucks/add">Samitrucks Add</Link>
                    </li>
                    <li>
                      <Link to="/faults">Faults</Link>
                    </li>
                     <li>
                      <Link to="/vehicle-receivments/all">Receivments Complain</Link>
                    </li>

                  </>
              ): null}
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/user" element={<User/>}/>
            {isAdmin &&<Route path="/trucks" element={<Trucks/>}/>}
            {isAdmin &&<Route path="/trucks/add" element={<SemiTruckAdd1/>}/>}
            {isAdmin &&<Route path="/truck/:pk" element={<TruckDetail/>}/>}
            {isAdmin &&<Route path="/sami-trucks/" element={<SamiTrucks/>}/>}
            {isAdmin &&<Route path="/sami-trucks/add" element={<TruckAdd1/>}/>}
            {isAdmin &&<Route path="/sami-truck/:pk" element={<SemituckDetail/>}/>}
            <Route path="/user/:pk" element={<UserDetail />} />
            {isAdmin && <Route path="/register" element={<Register/>}/>}
            {isAdmin && <Route path="/faults" element={<Faults/>}/>}
            {isAdmin && <Route path="/faults/:pk" element={<FaultsDetail/>}/>}
            <Route path="/vehicle-receivments" element={<VehicleReceivments/>}/>
            <Route path="/vehicle-receivments/:pk" element={<ReceivmentModify/>}/>
            <Route path="/vehicle-receivments/add" element={<VehicleReceivment/>}/>
            <Route path="/report/receivment" element={<TruckPhotoReceivment/>}/>
            <Route path="/report/receivment/semitrailer" element={<SemiTrailerPhotoReceivment/>}/>
            <Route path="/report/receivment/truck/equipment" element={<EquipmentTruckReport/>}/>
            <Route path="/report/receivment/semitruck/equipment" element={<EquipmentSemitruckReport/>}/>
            <Route path="/report/fault" element={<FaultReport/>}/>
            <Route path="/report/fault/:pk" element={<FaultsDetail/>}/>
            <Route path="/vehicle-receivments/all" element={<AllVehicleReceivments/>}/>
            <Route path="/vehicle-receivments/complain/:pk" element={<VehicleReceivmentComplainDetail/>}/>
            {isAdmin && <Route path="/users" element={<Users/>}/>}
          </Routes>
      </div>
  );
}

export default App;
