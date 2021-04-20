import api from '../httpService';


export const getHistory = async ({ id_user, id_order_status,page,perPage ,orderBy}, action) => {
    try {
        const { data } = await api('/history').get(`/get`,{params:{id_order_status,id_user,page,perPage,orderBy}})
        action(data)
    } catch (error) {
        console.log(error.response?.data||error)
    }
}

//?id_user=${id_user}&id_order_status=${id_order_status}