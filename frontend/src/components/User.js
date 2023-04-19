import axios from 'axios';
import React, {useState, useEffect} from "react";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function User(){
  const [currentUser, setCurrentUser] = useState([]);
  const fetchUser = () =>{
    client.get('/api/user', {
    })
    .then(response => {
      console.log("to jest data z usera")
      console.log(response.data.user);
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
          {Object.entries(currentUser.user).map(([key, value]) => (
              <p>{key}: {value}</p>
          ))}
      </div>
    )
}

export default User;