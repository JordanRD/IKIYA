import api from '../httpService';


export const getHistory = async (search, action) => {
    try {
        const { data } = await api('/history').get(`/get`,{params:search})
        action(data)
    } catch (error) {
        console.log(error.response?.data||error)
    }
}

//?id_user=${id_user}&id_order_status=${id_order_status}