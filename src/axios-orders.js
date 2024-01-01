import axios from "axios";
const instance = axios.create({
    baseURL:'https://coffee-a83fe-default-rtdb.firebaseio.com/'
})
export default instance;