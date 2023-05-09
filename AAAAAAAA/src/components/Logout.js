import axios from "axios";
import {useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import {useEffect} from "react";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"

})
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function Logout({ session, setSessionId }){

    const navigate = useNavigate();
    useEffect(() => {
        client.get('api/cookie')
            .then(response => {
                setSessionId(response.data.sessionid);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setSessionId]);

    client.post('/api/logout',{
        withCredentials:true
    })
    .then(response => {
        console.log(response.data);
        navigate('/');
    })
    .catch(error => {
        console.error(error);
    });
}

export default Logout;