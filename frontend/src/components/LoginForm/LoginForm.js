import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BtnInput, FormBox, InputBox, LoginInput, UpperInfo } from "./LoginFormElements";
import { useNavigate } from 'react-router-dom';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});

client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [session, setSessionId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        client.get('api/cookie')
            .then(response => {
                setSessionId(response.data.sessionid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('api/login', {
                email: email,
                password: password
            });
            console.log(response);
            if (response.status === 200) {
                setEmail("");
                setPassword("");
                client.get('api/cookie')
                    .then(response => {
                        setSessionId(response.data.sessionid);
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                setMessage("Podales zle haslo!");
            }
        } catch (err) {
            setMessage("Podales zle haslo!");
        }
    };

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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputBox>

                <InputBox>
                    <UpperInfo>Password</UpperInfo>
                    <LoginInput
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputBox>

                <BtnInput
                    type="submit"
                    id="submit"
                    value="Log in"
                />
            </form>
        </FormBox>
    );
}
