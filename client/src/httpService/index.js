import axios from 'axios';

const httpService = route => {
    const token = sessionStorage.token || localStorage.token
    let headers= {}
    if (token) headers = { authorization: token }
    // console.log(token)
    return axios.create({
        baseURL: `http://localhost:2000${route}`,
        headers
    })
}

export default httpService;
