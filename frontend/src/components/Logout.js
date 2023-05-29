import axios from "axios";
import {useNavigate} from "react-router-dom";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"

})
client.defaults.xsrfCookieName = 'csrftoken';
client.defaults.xsrfHeaderName = 'X-CSRFToken';
client.defaults.withCredentials = true;
function Logout(){

    const navigate = useNavigate();
    client.post('/api/logout',{
        withCredentials:true
    })
    .then(response => {
        console.log(response.data);
        navigate("/");
    })
    .catch(error => {
        console.error(error);
    });
}

export default Logout;