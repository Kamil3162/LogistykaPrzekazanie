import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const baseURL = "http://127.0.0.1:8000/";

const client = axios.create({
    baseURL
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

function VehicleReceivmentList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.get('/api/users',{
      withCredentials:true
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    client.post(`api/user/delete/${id}`)
        .then(response =>{
          console.log(response)
        }).catch(error => {
          console.log(error)
    })
  };

  return (
    <div>
      {users.map(users => (
        <div key={users.id}>
          <p>Truck: {users.name}</p>
          <p>Semi-trailer: {users.surname}</p>
          <p>Complain: {users.city}</p>
          <p>Created: {users.region}</p>
          <p>Ended: {users.email}</p>
          <p>User: {users.zip_code}</p>
          <button name="delete" onClick={() => handleDelete(users.id)}>Delete</button>
          <Link to={`/user/${users.id}`}>
            <button name="modify">Modify</button>
          </Link>
          <h1>--------------</h1>
        </div>
      ))}
    </div>
  );
}

export default VehicleReceivmentList;