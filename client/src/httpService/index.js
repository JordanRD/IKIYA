import axios from 'axios';

const Api = route => {
    const token = sessionStorage.token || localStorage.token
    const customService = axios.create({
        baseURL: `http://localhost:2000/${route}`,
        headers: { Authorization: token }
    })
    return customService;
}
export default Api;