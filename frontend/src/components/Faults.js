import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;


const FaultsDisplay = () => {
    // url do kazdego faults display get of course
    // click to odsylacz do fault
    const [receivments, setReceivments] = useState([]);

    useEffect(() => {
        client.get('/api/faults',{
            withCredentials:true
        }).then(response =>{
            console.log(response.data);
            setReceivments(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, []);
    return (
        <div className="page">
            <div>
                {receivments.map(receivment => (
                <Link to={`/faults/${receivment.id}`} style={{textDecoration: "none", color: "#111"}}>
                    <div style={{padding: "20px"}}>
                        Wezwanie nr {receivment.id}
                    </div>
                </Link>

              ))}
            </div>
        </div>
    );
}
export default FaultsDisplay;