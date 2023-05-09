import axios from 'axios';
import React, {useState, useEffect} from "react";

import {UserBox, UserContainer, UserInput} from "./UserElements";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function UserPage(){
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
      <UserBox>
          <UserContainer>
              <div>
                  <h1>Response Data</h1>
                  <div>
                      <UserInput>
                          <span>Imie</span>
                          <span>{currentUser.name}</span>
                      </UserInput>
                      <UserInput>
                          <span>Nazwisko</span>
                          <span>{currentUser.surname}</span>
                      </UserInput>
                      <UserInput>
                          <span>Miasto</span>
                          <span>{currentUser.city}</span>
                      </UserInput>
                      <UserInput>
                          <span>Username</span>
                          <span>{currentUser.username}</span>
                      </UserInput>
                      <UserInput>
                          <span>Email</span>
                          <span>{currentUser.email}</span>
                      </UserInput>
                      <UserInput>
                          <span>Region</span>
                          <span>{currentUser.region}</span>
                      </UserInput>
                      <UserInput>
                          <span>Truck</span>
                          <span>{currentUser.own_truck}</span>
                      </UserInput>
                  </div>
              </div>

          </UserContainer>
      </UserBox>

    )
}

export default UserPage;