import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import {BtnInput, FormBox, InputBox, LoginInput, UpperInfo} from "./LoginFormElements";
import { useNavigate } from 'react-router-dom';
import {Navbar} from "react-bootstrap";
const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
const AppContext = React.createContext({});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
export default function LoginForm(){
    const [email, setEmial] = useState([]);
    const [password, setPassword] = useState([]);
    const [message, setMessage] = useState("");
    const [session, setSessionId] = useState("");
    const navigate = useNavigate();


    client.get('api/cookie')
        .then(response => {
            setSessionId(response.data.sessionid);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
        });

    let handleSubmit = async (e) => {

        try{
            let response = client.post('api/login',{
                    email:email,
                    password:password
                }
            )

            if (response.status == 200){

                setEmial("");
                setPassword("")
                setMessage("U are log in");

            }
            else{

                e.preventDefault();
                console.log("HTTP REsponse different than 200");
                console.log(email);
                console.log(password);
                navigate('/');
            }
        }catch (err){
            console.log(err);
        }

    }
    return (
        <FormBox>
            {message}
            <form onSubmit={handleSubmit} method="POST">

                <InputBox>
                    <UpperInfo>Email</UpperInfo>
                    <LoginInput
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmial(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <UpperInfo>Passwod</UpperInfo>
                    <LoginInput
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputBox>

                <BtnInput
                    type="submit"
                    id="sumbit"
                    value="Zaloguj sie!"
                />
            </form>
        </FormBox>

    );
}