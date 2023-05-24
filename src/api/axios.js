import axios from 'axios';
//Direccion Base (API) para las peticiones  
const BASE_URL = 'http://100.26.104.22/api';

//Crea la instancia 'axios' para solicitar peticiones  
export default axios.create({
    baseURL: BASE_URL
});



