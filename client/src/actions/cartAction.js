import api from '../httpService';


export const addToCart = async (data, action) => {
    try {
        await api('/cart').post(`/add`, data)
        action()
    } catch (error) {
        console.log(error.response?.data)
    }
}

export const editCart = async(editedData, action) => {
    try {
        await api('/cart').patch(`/edit`, editedData)
        action()
    } catch (error) {
        console.log(error.response?.data)
        action()
    }
}


