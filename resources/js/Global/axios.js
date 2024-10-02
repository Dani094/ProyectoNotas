import axios from "axios";

const requestAxios = axios.create({


    baseURL: "http://127.0.0.1:8000/api"    
    //baseURL: "http://127.0.0.1:8000/api"    

})
export default requestAxios
