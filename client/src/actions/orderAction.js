import api from '../httpService';



export const checkoutCart = async (allData, action,errorAct) => {
    try {
        const { data } = await api('/order').post(`/checkout`, allData)
        action(data.id_order)
    } catch (error) {
        console.log(error.response?.data)
        errorAct(error?.response?.data||'something wrong in our server please try again later')
    }
}
export const getPayment = async (id_order, action) => {
    try {
        const { data } = await api('/order').get(`/getPayment/` + id_order)
        action(data)
    } catch (error) {
        console.log(error.response?.data)
        action()
    }
}

export const confirmPayment = async (formData,action) => {
    try {
        const { data } = await api('/order').post(`/confirmPayment`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(data)
    } catch (error) {
        console.log(error.response?.data)
    } finally {
        action()
    }
}

export const cancelOrder = async (alldata, action) => {
    try {

        const { data } = await api('/order').post(`/cancelOrder`, alldata)
        console.log(data)
        action()
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const completeOrder = async (id_order, action) => {
    try {
        await api('/order').post('/complete/' + id_order)
        action()
    } catch (error) {
        console.log(error.response?.data||error)
    }
}

export const confirmOrder = async (id_order, action) => {
    try {
        await api('/order').post('/confirmOrder/'+id_order)
        action()
    } catch (error) {
        console.log(error.response?.data || error)
    }
}