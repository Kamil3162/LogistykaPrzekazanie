import React, {useState} from "react";
import axios from 'axios';


const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
export default function Login(){
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
                console.log(response);
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