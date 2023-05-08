import axios from 'axios';
import React, {useState, useEffect} from "react";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function User(){
  const [currentUser, setCurrentUser] = useState({});
  const fetchUser = () =>{
    client.get('/api/user', {
    })
    .then(response => {
      console.log("to jest data z usera")
      console.log(response.data.is_admin);
      setCurrentUser(response.data);
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
          <h1>Response Data</h1>
          <p>{currentUser.name}</p>
          <p>{currentUser.surname}</p>
          <p>{currentUser.city}</p>
          <p>{currentUser.username}</p>
          <p>{currentUser.email}</p>
          <p>{currentUser.region}</p>
          <p>{currentUser.own_truck}</p>
      </div>
    )
}

export default User;